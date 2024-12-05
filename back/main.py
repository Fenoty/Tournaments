from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from dotenv import load_dotenv
from flask_cors import CORS 
from cryptography.fernet import Fernet
import os

import random


load_dotenv()


SECRET_KEY = os.getenv("SECRET_KEY")
assert SECRET_KEY
FERNET = Fernet(SECRET_KEY)


app = Flask(__name__)

CORS(app)

# Конфигурация базы данных
app.config['MYSQL_HOST'] = os.getenv("DB_HOST")
app.config['MYSQL_USER'] = os.getenv("DB_USERNAME")
app.config['MYSQL_PASSWORD'] = os.getenv("DB_PASSWORD")
app.config['MYSQL_DB'] = os.getenv("DB_NAME")

mysql = MySQL(app)


class MD5:
   def encrypt(self, data):
       return FERNET.encrypt(data.encode()).decode()

   def decrypt(self, data):
       return FERNET.decrypt(data).decode()

crypt = MD5()


def serialize_result(cursor, rows):
    # Получаем названия колонок из курсора
    columns = [desc[0] for desc in cursor.description]
    # Создаем список словарей, где ключами будут названия колонок
    return [dict(zip(columns, row)) for row in rows]

# Получить все записи
@app.route('/api/auth', methods=['POST'])
def auth():
    username = request.json.get('username')
    password = request.json.get('password')

    cur = mysql.connection.cursor()
    cur.execute(f"SELECT * FROM users WHERE username = '{username}'")
    row = cur.fetchone()
    cur.close()
    if row is None:
        return jsonify({"message": "User not found", "status": False}), 404  # Пользователь не найден

    if crypt.decrypt(row[2]) == password:
        return jsonify({"message": "Authentication successful", "status": True}), 200
    else:
        return jsonify({"message": "Invalid password", "status": False}), 401  # Неверный пароль
     
# Получить все записи
@app.route('/api/getAllTour', methods=['GET'])
def get_all_tour():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM tours ORDER BY id DESC")
    rows = cur.fetchall()

    response = jsonify(serialize_result(cur, rows))
    cur.close()

    return response, 200
    
# Получить все записи
@app.route('/api/getAllTourTeams', methods=['GET'])
def get_all_tour_teams():
    id = request.args.get('id')
    cur = mysql.connection.cursor()

    # Используем параметризированный запрос
    cur.execute("SELECT * FROM tour_teams WHERE tour_id = %s ORDER BY iteration DESC", (id,))
    rows = cur.fetchall()

    response = jsonify(serialize_result(cur, rows))
    cur.close()

    return response, 200



# Получить все записи
@app.route('/api/saveEditTour', methods=['POST'])
def save_edit_tour():
    id = request.json.get('id')
    name = request.json.get('name')
    date = request.json.get('date')
    url = request.json.get('url')
    description = request.json.get('description')

    cur = mysql.connection.cursor()
    cur.execute(f"UPDATE tours SET name='{name}', date='{date}',description='{description}',url='{url}' WHERE id = {id}")
    mysql.connection.commit()
 
    cur.close()

    return get_all_tour()
 
# Получить все записи
@app.route('/api/deleteTour', methods=['POST'])
def delete_tour():
    id = request.json.get('id')

    cur = mysql.connection.cursor()
    cur.execute(f"DELETE FROM tours WHERE id ='{id}'")
    mysql.connection.commit()
    cur.close()

    return jsonify({"status":True}), 200 
 

@app.route('/api/createTour', methods=['POST'])
def create_tour():
    upload_folder = './storage'

    data = request.form
    if 'image' not in request.files:
        return 'No file part', 400

    file = request.files['image']
    
    if file.filename == '':
        return 'No selected file', 400

        
    filepath = os.path.join(upload_folder, file.filename)
    filepath_to_db = os.path.join(upload_folder.replace('.', ''), file.filename)
    file.save(filepath)


    name = data.get('name')
    date = data.get('date')
    url = data.get('url')
    description = data.get('description')
    grid_type = data.get('grid_type')
    price_place = data.get('price_place')
    image = filepath_to_db

    random_check = data.get('random')
    teams = data.get('teams')
 

    cur = mysql.connection.cursor()
    cur.execute(f"INSERT INTO tours (name, date, image, description, url, price_place, grid_type) VALUES ('{name}','{date}','{image}','{description}','{url}',{price_place},'{grid_type}')")
    mysql.connection.commit()

    tour_id = cur.lastrowid


    if teams:
        teams = teams.split(',')
        if random_check == 'true': 
            random.shuffle(teams)

        data_to_insert = [(tour_id, team) for team in teams]
        sql = "INSERT INTO tour_teams (tour_id, team) VALUES (%s, %s)"
        cur.executemany(sql, data_to_insert)
        mysql.connection.commit()
    


    cur.execute(f"SELECT * FROM tours WHERE id = {tour_id}")
    rows = cur.fetchall()
    
    response = jsonify(serialize_result(cur, rows))

    cur.close()

    return response, 200



# Получить все записи
@app.route('/api/editTeamScore', methods=['POST'])
def edit_team_score():
    team_id = request.json.get('teamId')
    score = request.json.get('score')

    cur = mysql.connection.cursor()
    cur.execute(f"UPDATE tour_teams SET points={score} WHERE id = {team_id}")
    mysql.connection.commit()
    cur.close()

    return jsonify({"status":True}), 200 


@app.route('/api/setWinnerRound', methods=['POST'])
def set_winner_round():
    iteration = int(request.json.get('iter')) + 1
    tour_id = request.json.get('tourId')
    winner = request.json.get('winner')
    looser = request.json.get('looser')
    type_bracket = True if request.json.get('type') else False

    grid_type = request.json.get('gridType')



    winner_team_id = winner["team_id"]
    winner_team_name = winner["name"]

    looser_team_id = looser["team_id"]
    looser_team_name = looser["name"]


    cur = mysql.connection.cursor() 
    cur.execute(f"UPDATE tour_teams SET win = 1 WHERE id = {winner_team_id}")

    looser_response = None
    if looser["id"]: 
        cur.execute(f"UPDATE tour_teams SET win = 2 WHERE id = {looser_team_id}")
        if grid_type == 'lower':
            cur.execute(f"INSERT INTO tour_teams (tour_id, team, lower) VALUES ({tour_id}, '{looser_team_name}', 1)")
            mysql.connection.commit()
            looser_lower_row_id = cur.lastrowid

            cur.execute(f"SELECT * FROM tour_teams WHERE id = {looser_lower_row_id}")
            looser_rows = cur.fetchall()
            looser_response = serialize_result(cur, looser_rows)

    # Условие на тип сетки, для выставления победителя
    if type_bracket:
        cur.execute(f"INSERT INTO tour_teams (tour_id, iteration, team) VALUES ({tour_id}, {iteration}, '{winner_team_name}')")
    else:
        cur.execute(f"INSERT INTO tour_teams (tour_id, iteration, team, lower) VALUES ({tour_id}, {iteration}, '{winner_team_name}', 1)")
    
    mysql.connection.commit()
    tour_last_row_id = cur.lastrowid

    cur.execute(f"SELECT * FROM tour_teams WHERE id = {tour_last_row_id}")
    rows = cur.fetchall()
    
    default = serialize_result(cur, rows)

    response = {
        'lower': looser_response,
        'normal': default
    }

    response = jsonify(response)
    cur.close()
    

    return response, 200 

 



# Запуск приложения
if __name__ == '__main__':
    app.run(debug=True)