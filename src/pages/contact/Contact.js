import React from "react";
import $ from "jquery";
import { CSSTransition } from "react-transition-group";

import "./contact.scss";

class Contact extends React.Component {
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
      <div className="contact-comp">
        <CSSTransition in={isMounted} timeout={200} classNames="fade">
          <div>contact</div>
        </CSSTransition>
      </div>
    );
  }
}

export default Contact;
