from crypt import methods
from sre_constants import SUCCESS
from flask_pymongo import PyMongo
import json
from bson import json_util
import flask
from flask_cors import CORS, cross_origin
import os
from dotenv import load_dotenv

load_dotenv('.env')

app = flask.Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

db_password = os.environ.get('pwd')
db_username = os.environ.get('username')
app.config["MONGO_URI"] = "mongodb+srv://"+db_username+":"+db_password+"@cluster0.ofcrc.mongodb.net/ResourceManagement?retryWrites=true&w=majority"
mongodb_client = PyMongo(app)
db = mongodb_client.db

def customEncrypt(text,d): #text is the input string, n is the number of places you want to shift, d is the direction you want to shift in
    n=3
    encrypted_string=""
    shift_position = n*d
    revString = text[::-1] #reverse the string
    for char in revString:
        char_value = ord(char)-33
        mod_value = (char_value + shift_position)%93
        if mod_value == 0:
            mod_value = 93
        encrypted_value = mod_value + 33
        encrypted_string = encrypted_string + chr(encrypted_value)
    return encrypted_string

# Add users
@app.route("/add_user", methods=['POST'])
@cross_origin()
def add_user():
    __req_body = flask.request.get_json()
    if (__req_body['pwd'] == ""):
        return flask.jsonify(message="Please enter a password!", success=False)
    encrypted_pwd = customEncrypt(__req_body['pwd'],1)
    __user = db.Users.find_one({"username":__req_body["username"]})
    
    if __user is None:
        db.Users.insert_one({'username': __req_body['username'], 'pwd': encrypted_pwd, 'projects':[]})
        return flask.jsonify(message="success", success=True)
    else:
        return flask.jsonify(message="Failed: User already exists!", success=False)

# Get list of all users
@app.route("/get_users", methods=['GET'])
@cross_origin()
def get_users():
    __user = db.Users.find({})
    json_docs = []
    for document in __user:
        document.pop('pwd', None)
        document.pop('_id', None)
        
        json_docs.append(document['username'])
        
    response = {"username":json_docs}
    return json.dumps(response)

# Add project
@app.route("/add_project", methods=['POST'])
@cross_origin()
def add_project():
    __req_body = flask.request.get_json()
    __project = db.Project.find_one({"projectid":__req_body["projectid"]})
    if __project is None:
        __req_body['users'] = list(set(__req_body['users'])) # remove duplicates
        db.Project.insert_one({'projectid': __req_body['projectid'], 'projectdesc': __req_body['projectdesc'], 'users':__req_body['users'], 'res_utilized':{}})
        for user in __req_body['users']:
            __user = db.Users.find_one({"username":user})
            print(__user)
            if __user is not None:
                if "projects" not in __user.keys():
                    __user["projects"] = []
                __user["projects"].append(__req_body["projectid"])
                __user["projects"] = list(set(__user["projects"])) # remove duplicates
                print(__user)
                db.Users.find_one_and_update({"_id": __user["_id"]}, 
                            {"$set": {"username":__user["username"], "pwd":__user["pwd"],"projects":__user["projects"]}})

        return flask.jsonify(message="Project created successfully", success=True)
        
        
    else:
        return flask.jsonify(message="Project ID: " + __req_body['projectid'] + " already exists!", success=False)

# Get list of all users
@app.route("/get_allprojects", methods=['GET'])
@cross_origin()
def get_allprojects():
    __project = db.Project.find({})
    json_docs = []
    for document in __project:
        document.pop('projectdesc', None)
        document.pop('users', None)
        document.pop('res_utilized', None)
        document.pop('_id', None)
        
        json_docs.append(document['projectid'])
        
    response = {"projects":json_docs}
    return json.dumps(response)

# Get list of all projects
@app.route("/get_hardwareset", methods=['GET'])
@cross_origin()
def get_hardwareset():
    __hardwareSet = db.HardwareSet.find({})
    json_docs = []
    for document in __hardwareSet:
        document.pop('_id', None)
        
        json_docs.append(document)
        
    return json.dumps(json_docs, default=json_util.default)

# Get project details. Checks projectid passed
@app.route("/get_project", methods=['POST'])
@cross_origin()
def get_project():
    __req_body = flask.request.get_json()
    __project = db.Project.find_one({"projectid":__req_body["projectid"]})
    if __project is not None:
        __project.pop('_id', None)
        return flask.jsonify(message="Success", content=__project, success=True)
    else:
        return flask.jsonify(message="Failed: No such projectid", success=False)


# Join an existing project with projectid
@app.route("/join_project", methods=['POST'])
@cross_origin()
def join_project():
    __req_body = flask.request.get_json()
    __project = db.Project.find_one({"projectid":__req_body["projectid"]})
    if __project is not None:
        if __req_body["username"] not in __project["users"]:
            __project["users"].append(__req_body["username"])
            __project["users"] = list(set(__project["users"])) # remove duplicates
            db.Project.find_one_and_update({"_id": __project["_id"]}, 
                    {"$set": {"projectid":__project["projectid"], "projectdesc":__project["projectdesc"],"users":__project["users"],"res_utilized":__project["res_utilized"]}})
            
        __user = db.Users.find_one({"username":__req_body["username"]})
        print(__user)
        if __user is not None:
            if "projects" not in __user.keys():
                __user["projects"] = []
            __user["projects"].append(__req_body["projectid"])
            __user["projects"] = list(set(__user["projects"])) # remove duplicates
            print(__user)
            db.Users.find_one_and_update({"_id": __user["_id"]}, 
                        {"$set": {"username":__user["username"], "pwd":__user["pwd"],"projects":__user["projects"]}})

            return flask.jsonify(message="Successfully added " + __req_body["username"] + " to "+ __req_body["projectid"], success=True)
        
        return flask.jsonify(message="User already have access to the project", success=False)
    else:
        return flask.jsonify(message="Failed: No such projectid", success=False)


# Verify login. Checks username and password entered
@app.route("/verify_user", methods=['POST'])
@cross_origin()
def verify_user():
    __req_body = flask.request.get_json()
    encrypted_pwd = customEncrypt(__req_body['pwd'],1)
    __user = db.Users.find_one({"username":__req_body["username"],"pwd":encrypted_pwd})
    if __user is not None:
        if "projects" not in __user.keys():
            projects = []
        else:
            projects = __user['projects'] if len(__user["projects"])>0 else []

        response={"message":"success","projects":projects}
        return json.dumps(response)
    else:
        return flask.jsonify(message="Failed: User/password doesn't match!", success=False)



# Check-in or check-oot operation
@app.route("/resource_management", methods=['POST'])
@cross_origin()
def resource_management():
    __req_body = flask.request.get_json()
    __project = db.Project.find_one({"projectid":__req_body["projectid"]})
    if __project is not None:
        HWSET_update = []
        Project_update = []
        for HWSet in __req_body["requestvalue"]:
            # Update availability in HardwareSets collection
            __hardwareSet = db.HardwareSet.find_one({"resourceid":HWSet["resourceid"]})
            if(__req_body["operation"]=="check-in"):
                __availability = __hardwareSet["availability"] + HWSet["value"]
            else:
                if (HWSet["value"] > __hardwareSet["availability"]):
                    return flask.jsonify(message="Failed: Check-out value is greater than the resource available", success=False)
                __availability = __hardwareSet["availability"] - HWSet["value"]

            HWSET_update.append({"_id":__hardwareSet["_id"], "set":{"resourceid": __hardwareSet["resourceid"],"capacity": __hardwareSet["capacity"], "availability":__availability}})

            # Update utilized in Projects collection
            __res_utilized = __project["res_utilized"]
            if __hardwareSet["resourceid"] not in __res_utilized.keys():
                __res_utilized.update({__hardwareSet["resourceid"]:0})
            if(__req_body["operation"]=="check-in"):
                if (HWSet["value"] > __res_utilized[__hardwareSet["resourceid"]]):
                    return flask.jsonify(message="Failed: Check-in value is greater than the resource utilized", success=False)
                __updatedUtilized = __res_utilized[__hardwareSet["resourceid"]] - HWSet["value"]
            else:
                __updatedUtilized = __res_utilized[__hardwareSet["resourceid"]] + HWSet["value"]
            __res_utilized.update({__hardwareSet["resourceid"]:__updatedUtilized})

            Project_update.append({"_id": __project["_id"], "set":{"projectid":__project["projectid"], "projectdesc":__project["projectdesc"],"users":__project["users"],"res_utilized":__res_utilized}})

        # Update both Hardware and Projects collection
        for docs in HWSET_update:
            db.HardwareSet.find_one_and_update({"_id": docs["_id"]}, 
                {"$set": docs["set"]})
        for docs in Project_update: 
            db.Project.find_one_and_update({"_id": docs["_id"]}, 
                {"$set": docs["set"]})


        return flask.jsonify(message="Successfully updated", success=True)
    else:
        return flask.jsonify(message="Failed to update, Project ID:" + __req_body["projectid"] + " doesn't exist", success=False)

if __name__ == '__main__':
    app.run()
