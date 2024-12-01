from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

# Конфигурация базы данных
app.config['MYSQL_HOST'] = os.getenv("DB_HOST")
app.config['MYSQL_USER'] = os.getenv("DB_USERNAME")
app.config['MYSQL_PASSWORD'] = os.getenv("DB_PASSWORD")
app.config['MYSQL_DB'] = os.getenv("DB_NAME")

mysql = MySQL(app)

# Получить все записи
@app.route('/api/getAllTour', methods=['GET'])
def test():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM tours")
    rows = cur.fetchall()
    return jsonify(rows)

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