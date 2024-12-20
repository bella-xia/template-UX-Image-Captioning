import os
import time
import random
import pandas as pd

# from urllib import response
from datetime import datetime

from flask import Flask, jsonify, json, request
from flask_cors import CORS, cross_origin

# from flask_sqlalchemy import SQLAlchemy

import pyrebase

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///tmp/test.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# exp_groups = ["default_online", "effort_online"]
exp_groups = {"default": "default_b2", "effort": "effort_b2"}
max_users = 55

# for human-based caption evaluation
csv_file_path = "captions_evaluator_effort_sub_df2.csv"
number_evaluators = 3
number_images = 14
eval_folder = "annotations_effort_sub2"


# db = SQLAlchemy(app)
firebaseConfig = {
    "apiKey": "AIzaSyD5-rkzlf29hAmfG-39JrY69SelgU3p0Q0",
    "authDomain": "gaze-engage.firebaseapp.com",
    "databaseURL": "https://gaze-engage-default-rtdb.firebaseio.com",
    "projectId": "gaze-engage",
    "storageBucket": "gaze-engage.appspot.com",
    "messagingSenderId": "612082376120",
    "appId": "1:612082376120:web:cb8effd926a5966d9ec34d",
    "measurementId": "G-DWMQ4EBNL2",
}
firebase = pyrebase.initialize_app(firebaseConfig)
db = firebase.database()

with open("captions_gpt.json") as f:
    all_captions = json.load(f)

# @app.route("/data")
# @cross_origin(origin='gaze-engage.web.app')
# def get_data():
#     return {"msg": "Hello from Flask with CORS!"}


# check that the backend is connected
@app.route("/time")
def get_current_time():
    return jsonify({"time": time.strftime("%I:%M:%S %p", time.localtime())})


@app.route("/setup", methods=["GET"])
def setup():
    # assign a random task to the current user
    now = datetime.now()
    user_id = now.strftime("%Y%m%d%H%M%S")
    group_idx = random.randint(0,1)
    # 0: effort, 1: default
    response = {"user_id": user_id, "group_idx": group_idx}

    return jsonify(response)


@app.route("/checkusers", methods=["GET"])
def checkusers():
    field = "demo"
    # TODO: verify number of users
    # count number of entries in default/effort-emails field
    # redirect if no more users are needed
    field_g1 = list(exp_groups.values())[0]
    field_g2 = list(exp_groups.values())[1]
    cond_group1 = (db.child(field_g1).get().val() is not None)
    cond_group2 = (db.child(field_g2).get().val() is not None)
    count_participants = 0
    if cond_group1 and cond_group2:
        print('if any of the fields exists')
        for group in exp_groups.values():
            if db.child(group).child(field).get().val() is not None: 
                count_participants += len(db.child(group).child(field).get().val())
        # print('Current number of valid participants', count_participants)
        warning_continue = count_participants >= max_users
    elif cond_group1: 
        if db.child(field_g1).child(field).get().val() is not None: 
            count_participants += len(db.child(field_g1).child(field).get().val())
        warning_continue = count_participants >= max_users 
    elif cond_group2: 
        if db.child(field_g2).child(field).get().val() is not None: 
            count_participants += len(db.child(field_g2).child(field).get().val())
        warning_continue = count_participants >= max_users 
    else:
        print('No data saved yet')
        warning_continue = False

    response_body = {'warning': warning_continue}
    print('number of users validated')
    return jsonify(response_body)


    count_participants = 0
    for group in exp_groups:
        count_participants += len(db.child(group).child("emails").get().val())
        print(count_participants)

    warning_continue = count_participants >= max_users
    response_body = {"warning": warning_continue}
    print("number of users validated")
    return jsonify(response_body)


@app.route("/captionInfo", methods=["GET"])
def getImageInfo():
    # define the order of the images to be loaded
    response_body = {"captions": all_captions}
    return jsonify(response_body)


def check_repeated_responses(responses, x=12):
    """
    Check for repeated responses every x cases.

    Args:
        responses (list): A list of responses from consecutive questions.
        x (int): The size of each segment to check for repeated responses.

    Returns:
        bool: True if repeated responses are found in any segment, False otherwise.
    """
    for i in range(0, len(responses) - x + 1):
        segment = responses[i:i+x]
        # Check if all responses in the segment are the same
        if len(set(segment)) == 1:
            return True  # Found repeated responses
        
    return False 

@app.route("/validateRatings", methods=["POST"])
def validateRatings():
    request_data = json.loads(request.data)
    user_id = request_data["userID"]
    warning_attention = request_data["attention"]

    user_entries = db.child(eval_folder).child(request_data["comb"]).child(user_id).get()
    list_accuracies = []
    list_details = []
    for row in user_entries.each():
        list_accuracies.append(row.val()["accuracyLevel"])
        list_details.append(row.val()["detailLevel"])

    warning_continue = check_repeated_responses(list_accuracies) | check_repeated_responses(list_details)
    if not warning_continue and warning_attention!=2:
        db.child(eval_folder).child("success").push(user_id)

    response_body = {"warning": warning_continue}
    return jsonify(response_body)

@app.route("/recordCheck", methods=["POST"])
def recordCheck():
    request_data = json.loads(request.data)
    group = request_data["group"]
    user_id = request_data["userID"]
    attempts = request_data["attempts"]
    # save each user who attempted the comprehension check with a unique key
    db.child(exp_groups[group]).child("checked").push(user_id)
    response_body = {"user_id": user_id}
    return jsonify(response_body)


@app.route("/validateResponses", methods=["POST"])
def validateResponses():
    # receive userID, group from local storage
    # connect with the database: in group-captions-userID
    # iterate in all entries: read deltaEditTime
    request_data = json.loads(request.data)
    group = request_data["group"]
    user_id = request_data["userID"]
    user_entries = db.child(exp_groups[group]).child("captions").child(user_id).get()
    list_edits = []
    for row in user_entries.each():
        # print(row.val())
        list_edits.append(row.val()["deltaEditTime"])
    print(list_edits)
    # depending on the edit times, define the path to continue the study
    # TODO: or percetange to account for additional entries created when moving back and forth
    warning_continue = list_edits.count(0) / len(list_edits) >= 0.58
    response_body = {"warning": warning_continue}
    print("user responses validated")
    return jsonify(response_body)


# send data from frontend to backend
@app.route("/surveyData", methods=["POST"])
def surveyData():
    # print("receiving data from frontend")
    request_data = json.loads(request.data)
    data = request_data["content"]
    # print(data)
    user_id = request_data["userID"]
    group = request_data["group"]
    db.child(exp_groups[group]).child(request_data["folder"]).child(user_id).push(
        data
    )
    response_body = {"user_id": user_id}
    return jsonify(response_body)

@app.route("/annotateID", methods=["POST"])
def annotateID():
    # print("receiving data from frontend")
    request_data = json.loads(request.data)
    data = request_data["content"]
    print('data checking ID', data)
    # new potential entry
    user_id = data["userID"]
    given_id = data["id_value"]

    # for IDs recorded so far in the annotation folder
    id_lists = []
    entries = db.child(eval_folder).child("IDs").get() 
    if entries.val() is not None:
        for user in entries.each():
            user_dict = user.val()
            list_obj = list(user_dict.values())
            first_dict = list_obj[0]
            id_value = first_dict['id']
            id_lists.append(id_value)

    if given_id['id'] not in id_lists:
        db.child(eval_folder).child("IDs").child(user_id).push(
            given_id
        )
        print('recording new ID')
        warning_continue = False 
    else:
        print('failed to record')
        warning_continue = True
    response_body = {"warning": warning_continue}
    return jsonify(response_body)

@app.route("/validateID", methods=["POST"])
def validateID():
    # print("receiving data from frontend")
    request_data = json.loads(request.data)
    data = request_data["content"]
    assigned_group = request_data["group"]
    print(data)
    user_id = data["userID"]
    # group = request_data["group"]
    given_id = data["id_value"]
    print('Retrieved new id', given_id)

    # for IDs recorded so far in both groups
    id_lists = []
    for group in exp_groups.values():
        print(group)
        entries = db.child(group).child("IDs").get()
        if entries.val() is not None:
            for user in entries.each():
                user_dict = user.val()
                list_obj = list(user_dict.values())
                first_dict = list_obj[0]
                id_value = first_dict['id']
                id_lists.append(id_value)
    print('list of users', id_lists)
    if given_id['id'] not in id_lists:
        db.child(exp_groups[assigned_group]).child(request_data["folder"]).child(user_id).push(
            given_id
        )
        print('recording new ID')
        warning_continue = False 
    else:
        print('failed to record')
        warning_continue = True
    response_body = {"warning": warning_continue}
    return jsonify(response_body)


@app.route("/emailData", methods=["POST"])
def emailData():
    print("receiving data from frontend")
    request_data = json.loads(request.data)
    data = request_data["content"]
    user_id = data["userID"]
    response_body = {"date": user_id // (10**6)}
    response_body.update(data["survey_data"])
    print(data)
    group = request_data["group"]
    # main study
    # db.child(exp_groups[group]).child(request_data["folder"]).push(response_body)
    # human annotations
    db.child(group).child(request_data["folder"]).push(response_body)
    return jsonify(response_body)


@app.route("/setEvals", methods=["GET"])
def setEvals():
    # randomly select a combination from the list
    df = pd.read_csv(csv_file_path)
    combinations = get_possible_users()  # ["D1E1", "D2E2", "D3E3", "D4E4", "D1E5"]
    unmatched = "E5"
    print("combinations", combinations)
    eval_combinations = db.child(eval_folder).get()

    if eval_combinations.val():
        exists = any(item.key().startswith('E') for item in eval_combinations.each())
        # if there has been data saved in the E folders
        if exists:
            # only if there are any E entries, there could be a successful participant
            success_data = db.child(eval_folder).child("success").get()
            success_set = {item.val() for item in success_data.each()} if success_data.each() else set()
            print('successful participants here', success_set)
 
            # for the existing entries in the database
            for comb in eval_combinations.each():
                comb_str = comb.key()
                print("found str:", comb_str)
                number_of_children = len(comb.val())
                print("number of elements", number_of_children)

                # iterate over the evaluators saved and check that valid evaluators include 12 entries
                for each_eval in db.child(eval_folder).child(comb_str).get().each():
                    n_entries = len(each_eval.val())
                    # check if the 12 entries were valid as well
                    participant_key = each_eval.key()
                    if n_entries < number_images or participant_key not in success_set:
                        number_of_children -= 1
                # check that there are still evaluations to try
                if len(combinations) > 0:
                    try:
                        # remove the combination when there are at most 3 responses
                        if number_of_children > number_evaluators - 1:
                            combinations.remove(comb_str)
                            print("evaluator removed")
                            print(combinations)

                        selected_combination = random.choice(combinations)
                        print("selected combination", selected_combination)
                        # get captions and image IDs based on the selected combination
                        captions_info = get_captions_info(selected_combination)
                    except:
                        print("nothing removed")
                        selected_combination = "NA"
                        captions_info = []
                else:
                    print("All the evaluations have been completed")
                    selected_combination = "NA"
                    captions_info = []
        else:
            selected_combination = random.choice(combinations)
            print("selected combination", selected_combination)
            # get captions and image IDs based on the selected combination
            captions_info = get_captions_info(selected_combination)

    # TODO: make sure not to repeat one evaluator
    else:
        selected_combination = random.choice(combinations)
        print("selected combination", selected_combination)
        # get captions and image IDs based on the selected combination
        captions_info = get_captions_info(selected_combination)

    # only if eval_comb is not empty
    # iterate over pyrebase objects
    """
    if eval_combinations.val():
        for comb in eval_combinations.each():
            comb_str = comb.key()
            if len(combinations) > 1:
                combinations.remove(comb_str)
            else:

                comb_extra = df[df["userID"].str.contains(unmatched)]
                result_df = (
                    comb_extra.groupby("image_name")
                    .apply(lambda x: x.sample(1))
                    .reset_index(drop=True)
                )

            print("comb list", combinations)
    else:
        print("no combinations have been recorded")
    """

    # assign a random task to the current user
    # now = datetime.now()
    # user_id = now.strftime("%Y%m%d%H%M%S")
    # "user_id": user_id,

    response = {
        "eval_folder": eval_folder,
        "selected_combination": selected_combination,
        "captions_info": captions_info,
    }
    return jsonify(response)


def get_possible_users():
    try:
        df = pd.read_csv(csv_file_path)
        users = list(df["evaluator"].unique())  # replace userID
        str_users = []
        for u in users:
            # str_users.append(str(u))
            str_users.append("E{}".format(str(u)))
        return str_users
    except Exception as e:
        return {"error": str(e)}


def get_captions_info(combination):
    # read the CSV file and get captions and image IDs for the specified combination
    try:
        df = pd.read_csv(csv_file_path)
        evaluator_number = "".join([char for char in combination if char.isdigit()])
        rows = df[df["evaluator"] == int(evaluator_number)]  # userID

        captions_info = []
        for index, row in rows.iterrows():
            caption_info = {
                "userID": row["userID"],
                "image_id": row["image_name"],
                "caption": row["caption"],
                "group": row["group"],
                "tag": row["tag"],
            }
            captions_info.append(caption_info)

        # append attention check images 
        attn_acc_info = {
            "userID": 2024,
            "image_id": "Image_14.png",
            "caption": "One girl is helping another to take a picture with a digital camera.",
            "group": "None",
            "tag": "attention_accuracy",
        }
        captions_info.append(attn_acc_info)
        attn_det_info = {
            "userID": 2024,
            "image_id": "Image_20.png",
            "caption": "A man holds onto ropes and is pulled through the water on his ski.",
            "group": "None",
            "tag": "attention_detail",
        }
        print("backend check")
        captions_info.append(attn_det_info)
        # print(captions_info)
        return captions_info

    except Exception as e:
        return {"error": str(e)}


@app.route("/annotationData", methods=["POST"])
def annotationData():
    print("receiving data from frontend")
    request_data = json.loads(request.data)
    data = request_data["content"]
    print(data)
    user_id = request_data["userID"]
    db.child(request_data["folder"]).child(request_data["comb"]).child(user_id).push(
        data
    )
    response_body = {"user_id": user_id}
    return jsonify(response_body)


if __name__ == "__main__":
    # db.create_all()
    app.run(debug=True, ssl_context='adhoc', host="0.0.0.0", port=8080)  # int(os.environ.get("PORT", 8080))) ssl_context='adhoc',
