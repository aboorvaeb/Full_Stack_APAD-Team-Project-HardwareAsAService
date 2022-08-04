from crypt import methods
from sre_constants import SUCCESS
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

# # Verify login. Checks username and password entered
# @app.route("/verify_user", methods=['POST'])
# @cross_origin()
# def verify_user():
#     __req_body = flask.request.get_json()
#     __user = db.Users.find({})
#     for document in __user:
#         if (__req_body['username'] == document['username']) and (__req_body['pwd'] == document['pwd']):
#             if "projects" not in document.keys():
#                 projects = []
#             else:
#                 projects = document['projects'] if len(document["projects"])>0 else []

#             response={"message":"success","projects":projects}
#             return json.dumps(response)
#     return flask.jsonify(message="failed")

# Add project
@app.route("/add_project", methods=['POST'])
@cross_origin()
def add_project():
    __req_body = flask.request.get_json()
    __project = db.Project.find_one({"projectid":__req_body["projectid"]})
    if __project is None:
        db.Project.insert_one({'projectid': __req_body['projectid'], 'projectdesc': __req_body['projectdesc'], 'users':__req_body['users'], 'res_utilized':{}})
        return flask.jsonify(message="Project created successfully", success=True)
    else:
        return flask.jsonify(message="Project ID: " + __req_body['projectid'] + " already exists!", success=False)

# # Get list of all projects
# @app.route("/get_allprojects", methods=['GET'])
# @cross_origin()
# def get_allprojects():
#     __project = db.Project.find({})
#     json_docs = []
#     for document in __project:
#         document.pop('_id', None)
#         json_doc = json.dumps(document, default=json_util.default)
#         # print(document)
#         json_docs.append(json_doc)
#     # json_docs = json.dumps(json_docs, default=json_util.default)
#     # print(json_docs)
#     # response = {"username":json_docs}
#     return json.dumps(json_docs)

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
        # json_doc = json.dumps(document, default=json_util.default)
        # print(document)
        json_docs.append(document['projectid'])
    # json_docs = json.dumps(json_docs, default=json_util.default)
    # print(json_docs)
    response = {"projects":json_docs}
    return json.dumps(response)

# # Get project details. Checks projectid passed
# @app.route("/get_project", methods=['POST'])
# @cross_origin()
# def get_project():
#     __req_body = flask.request.get_json()
#     __project = db.Project.find({})
#     for document in __project:
#         if (__req_body['projectid'] == document['projectid']):
#             document.pop('_id', None)
#             print(document)
#             return json.dumps(document, default=json_util.default)

#             # response={"message":"success","projects":projects}
#             # return json.dumps(response)
#     return flask.jsonify(message="Failed: No such projectid")

# Get list of all projects
@app.route("/get_hardwareset", methods=['GET'])
@cross_origin()
def get_hardwareset():
    __hardwareSet = db.HardwareSet.find({})
    json_docs = []
    for document in __hardwareSet:
        document.pop('_id', None)
        # json_doc = json.dumps(document, default=json_util.default)
        # print(document)
        json_docs.append(document)
    # json_docs = json.dumps(json_docs, default=json_util.default)
    # print(json_docs)
    # response = {"username":json_docs}
    return json.dumps(json_docs, default=json_util.default)

# # Check-in operation
# @app.route("/resource_management", methods=['POST'])
# @cross_origin()
# def resource_management():
#     print("resource_management")
#     __req_body = flask.request.get_json()
#     print(__req_body)
#     __hardwareSet = db.HardwareSet.find({})
#     __project = db.Project.find({})

#     for HWSet in __req_body["requestvalue"]:
#         print("-----------")
#         print(HWSet)
#         __HWSet_key = HWSet['resourceid']
#         print(__HWSet_key)
#         print("HARDWARE")
#         for document in __hardwareSet:
#             if (document['resourceid'] == __HWSet_key):
#                 if(__req_body["operation"]=="check-in"):
#                     __availability = document["availability"] + HWSet["value"]
#                 else:
#                     __availability = document["availability"] - HWSet["value"]
#                 db.HardwareSet.find_one_and_update({"_id": document["_id"]}, 
#                                 {"$set": {"resourceid": __HWSet_key,"capacity": document["capacity"], "availability":__availability}})

#         print("PROJECT")
#         for document in __project:
#             print(document)
#             if(__req_body["projectid"]==document["projectid"]):
#                 print(document)
#                 __res_utilized = document["res_utilized"]
#                 print(__res_utilized)
#                 if __HWSet_key not in __res_utilized.keys():
#                     print("if the key is not there")
#                     __res_utilized.update({__HWSet_key:0})
#                 if(__req_body["operation"]=="check-in"):
#                     print("check-in")
#                     __updatedUtilized = __res_utilized[__HWSet_key] - HWSet["value"]
#                 else:
#                     __updatedUtilized = __res_utilized[__HWSet_key] + HWSet["value"]
#                 __res_utilized.update({__HWSet_key:__updatedUtilized})

#                 print(__res_utilized)
#                 db.Project.find_one_and_update({"_id": document["_id"]}, 
#                                 {"$set": {"projectid":document["projectid"], "projectdesc":document["projectdesc"],"users":document["users"],"res_utilized":__res_utilized}})

#     return flask.jsonify(message="success")

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



# Verify login. Checks username and password entered
@app.route("/verify_user", methods=['POST'])
@cross_origin()
def verify_user():
    __req_body = flask.request.get_json()
    __user = db.Users.find_one({"username":__req_body["username"],"pwd":__req_body["pwd"]})
    if __user is not None:
        if "projects" not in __user.keys():
            projects = []
        else:
            projects = __user['projects'] if len(__user["projects"])>0 else []

        response={"message":"success","projects":projects}
        return json.dumps(response)
    else:
        return flask.jsonify(message="failed", success=False)



    # __user = db.Users.find({})
    # for document in __user:
    #     if (__req_body['username'] == document['username']) and (__req_body['pwd'] == document['pwd']):
    #         if "projects" not in document.keys():
    #             projects = []
    #         else:
    #             projects = document['projects'] if len(document["projects"])>0 else []

    #         response={"message":"success","projects":projects}
    #         return json.dumps(response)
    # return flask.jsonify(message="failed")



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
            # db.HardwareSet.find_one_and_update({"_id": __hardwareSet["_id"]}, 
            #                 {"$set": {"resourceid": __hardwareSet["resourceid"],"capacity": __hardwareSet["capacity"], "availability":__availability}})

            # db.Project.find_one_and_update({"_id": __project["_id"]}, 
            #                 {"$set": {"projectid":__project["projectid"], "projectdesc":__project["projectdesc"],"users":__project["users"],"res_utilized":__res_utilized}})

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
