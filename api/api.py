import os
import time
import random
import pandas as pd
from urllib import response
from datetime import datetime

from flask import Flask, jsonify, json, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

import pyrebase

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tmp/test.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

csv_file_path = 'captions_evaluator.csv' 
number_evaluators = 1

# db = SQLAlchemy(app)
firebaseConfig = {
  "apiKey": "AIzaSyD5-rkzlf29hAmfG-39JrY69SelgU3p0Q0",
  "authDomain": "gaze-engage.firebaseapp.com",
  "databaseURL": "https://gaze-engage-default-rtdb.firebaseio.com",
  "projectId": "gaze-engage",
  "storageBucket": "gaze-engage.appspot.com",
  "messagingSenderId": "612082376120",
  "appId": "1:612082376120:web:cb8effd926a5966d9ec34d",
  "measurementId": "G-DWMQ4EBNL2"
}
firebase = pyrebase.initialize_app(firebaseConfig)
db = firebase.database()

with open('captions_gpt.json') as f:
    all_captions = json.load(f)

# check that the backend is connected
@app.route('/time')
def get_current_time():
    return jsonify({'time': time.strftime("%I:%M:%S %p", time.localtime())})


@app.route('/setup', methods=['GET'])
def setup():
    # assign a random task to the current user
    now = datetime.now() 
    user_id = now.strftime("%Y%m%d%H%M%S")
    response = {'user_id': user_id}
    return jsonify(response)

@app.route('/captionInfo', methods=['GET'])
def getImageInfo():
    # define the order of the images to be loaded
    response_body = {'captions': all_captions}
    return jsonify(response_body)


# send data from frontend to backend
@app.route('/surveyData', methods=['POST'])
def surveyData():
    print("receiving data from frontend")
    request_data = json.loads(request.data)
    data = request_data['content']
    print(data)
    user_id = data['userID']
    db.child(request_data['group']).child(request_data['folder']).child(user_id).push(data)
    response_body = {'user_id': user_id}
    return jsonify(response_body) 


@app.route('/emailData', methods=['POST'])
def emailData():
    print("receiving data from frontend")
    request_data = json.loads(request.data)
    data = request_data['content']
    user_id = data['userID']
    response_body = {'date': user_id // (10 ** 6)}
    response_body.update(data['survey_data'])
    print(data)
    db.child(request_data['group']).child(request_data['folder']).push(response_body) 
    return jsonify(response_body) 

@app.route("/setEvals", methods=["GET"])
def setEvals():
    # randomly select a combination from the list
    df = pd.read_csv(csv_file_path)
    combinations = get_possible_users()  # ["D1E1", "D2E2", "D3E3", "D4E4", "D1E5"]
    unmatched = "E5"
    print("combinations", combinations)
    eval_combinations = db.child("one").get()

    if eval_combinations.val():
        # for the existing entries in the database
        for comb in eval_combinations.each():
            comb_str = comb.key()
            print('found str:', comb_str)
            number_of_children = len(comb.val())
            print('number of elements', number_of_children)
            # check that there are still evaluations to try
            if len(combinations) > 0:
                try: 
                    # remove the combination when there are at most 3 responses
                    if number_of_children > number_evaluators - 1: 
                        combinations.remove(comb_str)
                        print('evaluator removed')
                        print(combinations)

                    selected_combination = random.choice(combinations)
                    print("selected combination", selected_combination)
                    # get captions and image IDs based on the selected combination
                    captions_info = get_captions_info(selected_combination)
                except:
                    print('nothing removed')
                    selected_combination = 'NA'
                    captions_info = []
            else:
                print('All the evaluations have been completed')
                selected_combination = 'NA'
                captions_info = []

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
    now = datetime.now()
    user_id = now.strftime("%Y%m%d%H%M%S")

    response = {
        "user_id": user_id,
        "selected_combination": selected_combination,
        "captions_info": captions_info,
    }
    return jsonify(response)


def get_possible_users():
    try:
        df = pd.read_csv(csv_file_path)
        users = list(df["evaluator"].unique()) # replace userID 
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
        rows = df[df["evaluator"] == int(combination[1])] # userID

        captions_info = []
        for index, row in rows.iterrows():
            caption_info = {
                "userID": row["userID"],
                "image_id": row["image_name"],
                "caption": row["caption"],
                "group": row["group"],
                "tag": row["tag"]
            }
            captions_info.append(caption_info)
        print("backend check")
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
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))

