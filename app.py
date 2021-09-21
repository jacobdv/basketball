# Dependencies
from flask import Flask, render_template, jsonify
from flask_cors import CORS
import pymongo 
from flask_pymongo import PyMongo
import os

# Additional API tools.
import json
from bson import json_util
from bson.json_util import default, dumps

# App
app = Flask(__name__)
CORS(app)

# Local
# from config import mongoURI
# client = pymongo.MongoClient(mongoURI)
# app.config['MONGO_URI'] = mongoURI
# Heroku
client = pymongo.MongoClient(os.environ['MONGO_URI'])
app.config['MONGO_URI'] = os.environ['MONGO_URI']

# Connection to Database
db = client['twentyTwentyOne']
app.config['DEBUG'] = True
mongo = PyMongo(app)
regularSeason = db['regularSeason']

# Page Routes
@app.route('/')
def index():
    return render_template('index.html')
@app.route('/data/')
def data():
    return render_template('data.html')
@app.route('/background/')
def background():
    return render_template('background.html')
@app.route('/analysis/')
def analysis():
    return render_template('analysis.html')

# Data Routes
@app.route('/stats/')
def stats():
    listData = list(regularSeason.find({}, {'_id':0}))
    return json.dumps(listData, default=json_util.default)
@app.route('/stats/<school>/')
def schoolStats(school):
    schoolData = list(regularSeason.find({'school':school}, {'_id':0}))
    return json.dumps(schoolData, default=json_util.default)

# Debug
if __name__ == '__main__':
    app.run(debug=True)