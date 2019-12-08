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
        <CSSTransition in={isMounted} timeout={200} classNames="fade">
          <div>follow</div>
        </CSSTransition>
      </div>
    );
  }
}

export default Follow;
