import React from "react";
import axios from "axios";
import $ from "jquery";
import NProgress from "nprogress";

import { CSSTransition } from "react-transition-group";

import "./infos.scss";

class Infos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      renderHtmlMap: {}
    };
  }

  componentDidMount() {
    NProgress.start({ easing: "ease", speed: 500, trickleSpeed: 300 });
    NProgress.set(0.7);
    axios
      .get("https://gwerichang.com/gogwe/?rest_route=/wp/v2/pages/17")
      .then(rs => {
        this.setRenderData(rs.data.content.rendered);
        NProgress.done();
      });
  }

  setRenderData(html) {
    const $content = $(`<div>${html}</div>`);
    let renderHtmlMap = {};
    $content.find("figure").each(function(index, item) {
      const $item = $(item);
      const key = $item.find("p").html();
      const value = $item.find("cite").html();
      renderHtmlMap[key] = value;
    });
    this.setState({
      ...this.state,
      isMounted: true,
      renderHtmlMap: renderHtmlMap
    });
  }

  render() {
    const { isMounted, renderHtmlMap } = this.state;
    console.log(renderHtmlMap);
    return (
      <div className="infos-comp">
        <CSSTransition in={isMounted} unmountOnExit={true} timeout={1000} classNames="fade">
          <div>
            <h1 className="title line">{renderHtmlMap["#section1"]}</h1>
            <p className="sub-title line font-size-3 text-center">
              {renderHtmlMap["#section2"]}
            </p>
            <div className="line">
              <div className="clearfix">
                <div className="pull-left sm-col-12 col-6 pa-6 pl-0">
                  <div className="pa-4 line pt-0">
                    <div className="mb-4 font-size-6">
                      {renderHtmlMap["#section3"]}
                    </div>
                    <div className="font-size-2 text-italic">
                      {renderHtmlMap["#section4"]}
                    </div>
                  </div>
                  <div className="pa-4">
                    <div className="font-size-6 mb-3 text-italic">
                      Exhibitions
                    </div>
                    <div>
                      <ul className="list-box">
                        {renderHtmlMap["#exhibitions"]
                          ? renderHtmlMap["#exhibitions"]
                              .split("<br>")
                              .map((item, index) => {
                                return (
                                  <li className="mb-1" key={index}>
                                    - {item}
                                  </li>
                                );
                              })
                          : null}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="pull-left col-6 pa-6">
                  <div className="font-size-6 mb-4 text-italic">References</div>
                  <ul className="list-box">
                    {renderHtmlMap["#references"]
                      ? renderHtmlMap["#references"]
                          .split("<br>")
                          .map((item, index) => {
                            return (
                              <li className="mb-1" key={index}>
                                - {item}
                              </li>
                            );
                          })
                      : null}
                  </ul>
                </div>
              </div>
            </div>
            <div className="footer text-center font-size-3">
              {renderHtmlMap["#footer"]}
            </div>
          </div>
        </CSSTransition>
      </div>
    );
  }
}

export default Infos;
