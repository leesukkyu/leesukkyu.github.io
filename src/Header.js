import React from "react";
import "./header.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="comp-header">
      <div className="title-box">
        <Link className="nav-link" to="/">
          gogwe
        </Link>
      </div>
      <nav className="nav-box">
        <ul>
          <li className="nav-link-box">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-link-box">
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
          <li className="nav-link-box">
            <Link className="nav-link" to="/users">
              Users
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
