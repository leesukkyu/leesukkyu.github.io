import React from "react";
import $ from "jquery";
import { CSSTransition } from "react-transition-group";

import "./infos.scss";

class Infos extends React.Component {
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
      <div className="infos-comp">
        <CSSTransition in={isMounted} timeout={200} classNames="fade">
          <div>infos</div>
        </CSSTransition>
      </div>
    );
  }
}

export default Infos;
