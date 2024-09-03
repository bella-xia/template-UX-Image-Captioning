import React, { Component,useState } from "react";
import './taskEnd.css'

function TaskEndContainer() {

    return (
      <div className="container">
        <div className="title">
        <h1> End of the study. Please close this tab. </h1>
        <p style={{fontSize:"22px"}}> Please <b>return the study</b> on Prolific. We will reject your submission if you don't provide a code.</p>

      </div>
      </div>

      
      );

      
      
}

export default TaskEndContainer;