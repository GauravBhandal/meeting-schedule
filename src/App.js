import React from "react";
import './App.less';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Navbar from './components/navbar';
import CreateSchedule from './components/createSchedule';
import UpdateSchedule from './components/updateSchedule';
import Homepage from './components/homepage';

const App = () => {
  return (
    <Router>
    <div className="container">
      <Navbar/>
      <br/>
      <Route path="/" exact component={Homepage}/>
      <Route path="/edit/:id" component={UpdateSchedule}/>
      <Route path="/create" exact component={CreateSchedule}/>
      </div>
    </Router>
  )
};
export default App;
