from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from dotenv import load_dotenv
from flask_cors import CORS 
from cryptography.fernet import Fernet
import os
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
# print(crypt.encrypt('MeowMeowMeow')) # Encrypt
# print(crypt.decrypt("gAAAAABnTBxlk2jIAmNvAZGJdocRijS31i_hEFUmCf5jCZ--uF_AAceEjVLqoOuLrE2z2bwk5iCVr-SJYxTstSScK5o8up_efw=="))
 

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
    cur.execute("SELECT * FROM tours")
    rows = cur.fetchall()
    return jsonify(serialize_result(cur, rows)), 200
    
# Получить все записи
@app.route('/api/getAllTourTeams', methods=['GET'])
def get_all_tour_teams():
    id = request.args.get('id')
    cur = mysql.connection.cursor()

    # Используем параметризированный запрос
    cur.execute("SELECT * FROM tour_teams WHERE tour_id = %s", (id,))
    rows = cur.fetchall()

    return jsonify(serialize_result(cur, rows)), 200



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
    upload_folder = '/storage'
    data = request.json
    print(request.files)
    return jsonify(request.files)
    if 'image' not in request.files:
        return 'No file part', 400
    file = request.files['image']
    if file.filename == '':
        return 'No selected file', 400

    filepath = os.path.join(upload_folder, file.filename)
    file.save(filepath)

    name = request.json.get('name')
    date = request.json.get('date')
    url = request.json.get('url')
    description = request.json.get('description')
    grid_type = request.json.get('grid_type')
    price_place = request.json.get('price_place')
    image = filepath

    cur = mysql.connection.cursor()
    cur.execute(f"INSERT INTO tours (name, date, image, description, url, price_place, grid_type) VALUES ('{name}','{date}','{image}','{description}','{url}',{price_place},'{grid_type}')")
    mysql.connection.commit()
    cur.close()

    return 'File uploaded successfully', 200


# Запуск приложения
if __name__ == '__main__':
    app.run(debug=True)