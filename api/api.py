import os
import time
import random
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




# send data from frontend to backend
@app.route('/responsesData', methods=['POST'])
def responsesData():
    request_data = json.loads(request.data)
    q_id = request_data['q_id']
    user_id = request_data['user_id']
    ans = request_data['ans']
    time = request_data['time']
    print('saving data')
    new_entry = Responses(q_id, user_id, ans, time)
    db.session.add(new_entry)
    db.session.commit()
    msg = "Record successfully added"
    print(msg)
    response_body = {'user_id': user_id}
    return jsonify(response_body)


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



if __name__ == "__main__":
    # db.create_all()
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))

