from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from dotenv import load_dotenv
from flask_cors import CORS 
from cryptography.fernet import Fernet
import os
load_dotenv()


SECRET_KEY = os.getenv("SECRET_KEY")
assert SECRET_KEY
print(SECRET_KEY)
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
print(crypt.encrypt('MeowMeowMeow')) # Encrypt
print(crypt.decrypt("gAAAAABnS_f3cGMHcmH1KlAmbO9B1Sh4Ug1R4A-o9ZzeQ_oocF-Xx_nzWqO3GVsRuK7NpFKldlek9t3FzzP6lbdIAgzX8DHG1A=="))




def serialize_result(cursor, rows):
    # Получаем названия колонок из курсора
    columns = [desc[0] for desc in cursor.description]
    # Создаем список словарей, где ключами будут названия колонок
    return [dict(zip(columns, row)) for row in rows]

# Получить все записи
@app.route('/api/getAllTour', methods=['GET'])
def get_all_tour():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM tours")
    rows = cur.fetchall()
    return jsonify(serialize_result(cur, rows))
    
# Получить все записи
@app.route('/api/getAllTourTeams', methods=['GET'])
def get_all_tour_teams():
    id = request.args.get('id')
    cur = mysql.connection.cursor()

    # Используем параметризированный запрос
    cur.execute("SELECT * FROM tour_teams WHERE tour_id = %s", (id,))
    rows = cur.fetchall()

    return jsonify(serialize_result(cur, rows))


# Получить все записи
@app.route('/api/getAllTourTeams', methods=['GET'])
def get_all_tour_teams():
    id = request.args.get('id')
    cur = mysql.connection.cursor()

    # Используем параметризированный запрос
    cur.execute("SELECT * FROM tour_teams WHERE tour_id = %s", (id,))
    rows = cur.fetchall()

    return jsonify(serialize_result(cur, rows))


@app.route('/api/items', methods=['GET'])
def get_items():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM items")
    rows = cur.fetchall()
    return jsonify(rows)

# Добавить новую запись
@app.route('/api/items', methods=['POST'])
def add_item():
    new_item = request.json['name']
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO items(name) VALUES(%s)", (new_item,))
    mysql.connection.commit()
    return jsonify({'message': 'Item added successfully'}), 201

# Запуск приложения
if __name__ == '__main__':
    app.run(debug=True)