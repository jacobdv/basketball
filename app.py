# Dependencies for Flask App / Data
from flask import Flask, render_template
from flask_cors import CORS
from flask_pymongo import PyMongo
from config import atlasPassword

# Additional Resource Dependencies
import datetime as dt
import json
from bson import json_util
from bson.json_util import dumps

# App
app = Flask(__name__)
CORS(app)

# Connection to MongoDB Atlas
app.config['DEBUG'] = True
app.config['MONGO_URI'] = f'mongodb+srv://dbUser:{atlasPassword}@cluster0.nm6nb.mongodb.net/twentyTwentyOne'
mongo = PyMongo(app)
collection = mongo.db['regularSeason']

# Routes - Home
@app.route('/')
def index():
    return render_template('index.html')
# Background
@app.route('/background/')
def background():
    return render_template('background.html')
# Analysis
@app.route('/analysis/')
def analysis():
    return render_template('analysis.html')
# Data
@app.route('/data/')
def data():
    return render_template('data.html')

# API Endpoints - All Data
@app.route('/api/', methods=['GET'])
def allData():
    data = list(collection.find({},{'_id':0}))
    return json.dumps(data, default=json_util.default)

# Team Endpoints
@app.route('/api/<school>/', methods=['GET','POST'])
def teamData(school):
    school = school.title()
    data = list(collection.find({'school':school}))
    return json.dumps(data, default=json_util.default)

# Debug Clause
if __name__ == '__main__':
    app.run(debug=True)