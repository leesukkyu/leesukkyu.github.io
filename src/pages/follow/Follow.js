import React from "react";
import $ from "jquery";
import { CSSTransition } from "react-transition-group";

import "./follow.scss";

class Follow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false
    };
  }

  componentDidMount() {
    this.setState({
      isMounted: true
    });
  }

  render() {
    const { isMounted } = this.state;
    return (
      <div className="follow-comp">
        <CSSTransition in={isMounted} timeout={1000} classNames="fade">
          <h1>follow</h1>
        </CSSTransition>
      </div>
    );
  }
}

export default Follow;
