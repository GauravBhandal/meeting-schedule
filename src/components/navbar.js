import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class navbar extends Component {
  render() {
    return (
      <nav>
        <div className="">
          <ul>
            <li>
              <Link to="/">Schedule List</Link>
            </li>
            <li>
              <Link to="/create">Create schedule of meeting</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
