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
        <CSSTransition in={isMounted} timeout={1000} classNames="fade">
          <div>
            <h1 className="title line">
              atelier de création graphique<br></br>
              Arnaud Jarsaillon + Rémy Poncet + Loris Pernoux<br></br>
              (Crest — Paris)
            </h1>
            <p className="sub-title line font-size-3 text-center">
              Bonjour, nous présentons sur ce site une sélection non-exhaustive
              de nos travaux. Vous pouvez aussi suivre nos dernières
              réalisations sur Instagram. Bonne visite. Hello, we present on
              this site a non-exhaustive selection of our work. You may also
              follow our latest projects on Instagram. Have a pleasant visit.
            </p>
            <div className="line">
              <div className="clearfix">
                <div className="pull-left col-6 pa-4">안녕하세요</div>
                <div className="pull-left col-6 pa-4">반갑습니다</div>
              </div>
            </div>
            <div className="footer text-center font-size-3">
              © 2019 Brest Brest Brest. All rights reserved.
            </div>
          </div>
        </CSSTransition>
      </div>
    );
  }
}

export default Infos;
