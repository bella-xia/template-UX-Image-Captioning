import React, { Component,useState } from "react";
import './taskEnd.css'

function TaskEndContainer() {
  const routeChange = () => {
    let path = "/#/PaymentSurvey";
    window.location.assign(path);
  };

  const routeChangeTask = () => {
    localStorage.setItem("lastImage", "false");
    let path = "/#/Main1";
    window.location.assign(path);
  };

    return (
      <div className="container">
        <div className="title">
        <h1> Are you sure you are finished with the tasks? </h1>
        <button
        className="button"
        onClick={routeChange}
        
        >
          
          Yes
          </button>
          <button
        className="button"
        onClick={routeChangeTask}
        >
          No
          </button>
      </div>
      </div>

      
      );

      
      
}

export default TaskEndContainer;