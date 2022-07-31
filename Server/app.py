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
    db.Users.insert_one({'username': __req_body['username'], 'pwd': __req_body['pwd'], 'projects':[]})
    return flask.jsonify(message="success")

# Get list of all users
@app.route("/get_users", methods=['GET'])
@cross_origin()
def get_users():
    __user = db.Users.find({})
    json_docs = []
    for document in __user:
        document.pop('pwd', None)
        document.pop('_id', None)
        # json_doc = json.dumps(document, default=json_util.default)
        # print(document)
        json_docs.append(document['username'])
    # json_docs = json.dumps(json_docs, default=json_util.default)
    # print(json_docs)
    response = {"username":json_docs}
    return json.dumps(response)

# # Verify login. Checks username and password entered
# @app.route("/verify_user", methods=['POST'])
# @cross_origin()
# def verify_user():
#     __req_body = flask.request.get_json()
#     __user = db.Users.find({})
#     for document in __user:
#         if (__req_body['username'] == document['username']) and (__req_body['pwd'] == document['pwd']):
#             return flask.jsonify(message="success")
#     return flask.jsonify(message="failed")

# Verify login. Checks username and password entered
@app.route("/verify_user", methods=['POST'])
@cross_origin()
def verify_user():
    __req_body = flask.request.get_json()
    __user = db.Users.find({})
    for document in __user:
        if (__req_body['username'] == document['username']) and (__req_body['pwd'] == document['pwd']):
            if "projects" not in document.keys():
                projects = []
            else:
                projects = document['projects'] if len(document["projects"])>0 else []

            response={"message":"success","projects":projects}
            return json.dumps(response)
    return flask.jsonify(message="failed")

# Get list of all projects
@app.route("/get_allprojects", methods=['GET'])
@cross_origin()
def get_allprojects():
    __project = db.Project.find({})
    json_docs = []
    for document in __project:
        document.pop('_id', None)
        json_doc = json.dumps(document, default=json_util.default)
        # print(document)
        json_docs.append(json_doc)
    # json_docs = json.dumps(json_docs, default=json_util.default)
    # print(json_docs)
    # response = {"username":json_docs}
    return json.dumps(json_docs)


if __name__ == '__main__':
    app.run()
