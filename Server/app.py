from crypt import methods
from flask_pymongo import PyMongo
import json
from bson import json_util
import flask

app = flask.Flask(__name__)

app.config["MONGO_URI"] = "mongodb+srv://admin2022:scrumbledore2022@cluster0.ofcrc.mongodb.net/ResourceManagement?retryWrites=true&w=majority"
mongodb_client = PyMongo(app)
db = mongodb_client.db

@app.route("/add_user")
def add_one():
    db.Users.insert_one({'title': "todo title", 'body': "todo body"})
    return flask.jsonify(message="success")

@app.route("/fetch_users", methods=['GET'])
def get_users():
    __user = db.Users.find({})
    json_docs = []
    for document in __user:
        json_doc = json.dumps(document, default=json_util.default)
        json_docs.append(json_doc)
    return flask.Response(json_docs, mimetype="application/json", status=200)

@app.route("/verify_user", methods=['POST'])
def verify_user():
    __req_body = flask.request.get_json()
    __user = db.Users.find({})
    for document in __user:
        if (__req_body['username'] == document['username']) and (__req_body['pwd'] == document['pwd']):
            return flask.jsonify(message="success")
    return flask.jsonify(message="failed")



if __name__ == '__main__':
    app.run()
