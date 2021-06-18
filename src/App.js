import React from "react";
import "./App.less";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import CreateSchedule from "./components/createSchedule";
import UpdateSchedule from "./components/updateSchedule";
import Homepage from "./components/homepage";
import CreateUser from "./components/createUser";

const App = () => {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={Homepage} />
        <Route path="/edit/:id" component={UpdateSchedule} />
        <Route path="/create" exact component={CreateSchedule} />
        <Route path="/createUser" exact component={CreateUser} />
      </div>
    </Router>
  );
};
export default App;
