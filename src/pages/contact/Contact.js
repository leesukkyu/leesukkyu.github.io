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
        <CSSTransition in={isMounted} timeout={1000} classNames="fade">
          <div>
            <div className="line">
              <div className="clearfix">
                <div className="col-6 pull-left">그림</div>
                <div className="col-6 pull-left">
                  <div className="line pa-5">gogwe@gmail.com</div>
                  <div className="line pa-5">gogwe@instagram</div>
                </div>
              </div>
            </div>

            <div>
              <div className="col-6 pull-left">
                <div className="pr-5">
                  <div className="pa-5 line">위치</div>
                </div>
              </div>
              <div className="col-6 pull-left">
              <div className="pr-5">
                  <div className="pa-5 line">위치</div>
                </div>
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    );
  }
}

export default Contact;
