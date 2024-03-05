import React, { Component } from "react";
import { HashRouter, Router, Switch, Route } from "react-router-dom";

import StartContainer from "./pages/start/start";
import InstructionsContainer from "./pages/instr/instructions";
import Main1Container from "./pages/main/main-task1";
import Main2Container from "./pages/main/main-task2";

import SurveyContainer from "./pages/survey/survey";
import PaymentSurveyContainer from "./pages/survey/payment_survey";
import EndContainer from "./pages/end/end";
import EyegazeStartContainer from "./pages/eyegazeStart/eyegazeStart";
import eyegazeEndContainer from "./pages/eyegazeEnd/eyegazeEnd";
import InterventionContainer from "./pages/instr/primer";

export default class Routes extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" exact component={StartContainer} />
          <Route path="/Instructions" component={InstructionsContainer} />
          <Route path="/Assessment" component={Main1Container} />
          <Route path="/Details" component={Main2Container} />
          <Route path="/Survey" component={SurveyContainer} />
          <Route path="/Mid" component={InterventionContainer} />
          <Route path="/Demo" component={PaymentSurveyContainer} />
          <Route path="/End" component={EndContainer} />
          <Route path="/SelectionStart" component={EyegazeStartContainer} />
          <Route path="/EyeGazeEnd" component={eyegazeEndContainer} />
        </Switch>
      </HashRouter>
    );
  }
}
