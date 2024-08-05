import React, { Component } from "react";
import { HashRouter, Router, Switch, Route } from "react-router-dom";

import StartContainer from "./pages/start/start";
import IDContainer from "./pages/start/identify";
import InstructionsContainer from "./pages/instr/instructions";
import Main1Container from "./pages/main/main-task1";
import Main2Container from "./pages/main/main-task2";

import SurveyContainer from "./pages/survey/survey";
import PaymentSurveyContainer from "./pages/survey/payment_survey";
import EndContainer from "./pages/end/end";
import EyegazeStartContainer from "./pages/eyegazeStart/eyegazeStart";
import eyegazeEndContainer from "./pages/eyegazeEnd/eyegazeEnd";
import InterventionContainer from "./pages/instr/primer";

import AnnotateContainer from "./pages/annotate/annotate_main";
import AnnotateInstructionsContainer from "./pages/annotate/instructions";
import AnnotateStartContainer from "./pages/annotate/start";
import AnnotateEndContainer from "./pages/annotate/end";
import TaskEndContainer from "./pages/taskEnd/taskEnd"


export default class Routes extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/Study" exact component={StartContainer} />
          <Route path="/Check" component={IDContainer} />
          <Route path="/Instructions" component={InstructionsContainer} />
          <Route path="/Main1" component={Main1Container} />
          <Route path="/Main2" component={Main2Container} />
          <Route path="/Survey" component={SurveyContainer} />
          <Route path="/Mid" component={InterventionContainer} />
          <Route path="/Demo" component={PaymentSurveyContainer} />
          <Route path="/End" component={EndContainer} />
          <Route path="/Start" component={EyegazeStartContainer} />
          <Route path="/SurveyEnd" component={eyegazeEndContainer} />
          <Route path="/terminate" component={TaskEndContainer} />

          <Route path="/Assessment" exact component={AnnotateStartContainer} />
          <Route path="/InstrEval" exact component={AnnotateInstructionsContainer} />
          <Route path="/Eval" exact component={AnnotateContainer} />
          <Route path="/EndEval" component={AnnotateEndContainer} />


          
        </Switch>
      </HashRouter>
    );
  }
}
