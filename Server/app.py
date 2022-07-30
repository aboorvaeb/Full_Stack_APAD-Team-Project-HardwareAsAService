from crypt import methods
from flask_pymongo import PyMongo
import json
from bson import json_util
import flask
from flask_cors import CORS, cross_origin

app = flask.Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.config["MONGO_URI"] = "mongodb+srv://admin2022:scrumbledore2022@cluster0.ofcrc.mongodb.net/ResourceManagement?retryWrites=true&w=majority"
mongodb_client = PyMongo(app)
db = mongodb_client.db

# Add users
@app.route("/add_user", methods=['POST'])
@cross_origin()
def add_user():
    __req_body = flask.request.get_json()
    db.Users.insert_one({'username': __req_body['username'], 'pwd': __req_body['pwd']})
    return flask.jsonify(message="success")

# Get list of all users
@app.route("/fetch_users", methods=['GET'])
@cross_origin()
def get_users():
    __user = db.Users.find({})
    json_docs = []
    for document in __user:
        json_doc = json.dumps(document, default=json_util.default)
        json_docs.append(json_doc)
    return flask.Response(json_docs, mimetype="application/json", status=200)

# Verify login. Checks username and password entered
@app.route("/verify_user", methods=['POST'])
@cross_origin()
def verify_user():
    __req_body = flask.request.get_json()
    __user = db.Users.find({})
    for document in __user:
        if (__req_body['username'] == document['username']) and (__req_body['pwd'] == document['pwd']):
            return flask.jsonify(message="success")
    return flask.jsonify(message="failed")



if __name__ == '__main__':
    app.run()
