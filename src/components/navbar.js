import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./styles.less";

export default class navbar extends Component {
  render() {
    return (
      <div className="header">
        <div className="inner_header">
          <div className="logo_container">
            <h1>
              <Link to="/">
                MY<span>SITE</span>
              </Link>
            </h1>
          </div>
          <ul className="navigation">
            <div className="inner_navigation">
              <li>
                <Link to="/">Schedule List</Link>
              </li>
            </div>
            <div className="inner_navigation">
              <li>
                <Link to="/create">Create Schedule</Link>
              </li>
            </div>
            <div className="inner_navigation">
              <li>
                <Link to="/createUser">Add participant</Link>
              </li>
            </div>
          </ul>
        </div>
      </div>
    );
  }
}
