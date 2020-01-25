import React from "react";
import axios from "axios";
import $ from "jquery";
import NProgress from "nprogress";

import { CSSTransition } from "react-transition-group";

import "./contact.scss";

class Contact extends React.Component {
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
      .get("https://gwerichang.com/gogwe/?rest_route=/wp/v2/pages/31")
      .then(rs => {
        this.setState({
          isMounted: true
        });
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
      renderHtmlMap: renderHtmlMap
    });
  }

  render() {
    const { isMounted, renderHtmlMap } = this.state;
    console.log(renderHtmlMap);
    return (
      <div className="contact-comp">
        <CSSTransition in={isMounted} unmountOnExit timeout={1000} classNames="fade">
          <div>
            <div className="line">
              <div className="clearfix">
                <div className="col-6 pa-3 pull-left">
                  <img class="full-width" src={$(renderHtmlMap["#img"]).attr(
                        "src"
                      )} alt=""></img>
                </div>
                <div className="col-6 pull-left">
                  <div className="line pa-6 pl-0 font-size-6">
                    {renderHtmlMap["#section1"]}
                  </div>
                  <div className="line pa-5 pl-0 mb-2 font-size-6">
                    →{" "}
                    <a
                      className="link"
                      href={renderHtmlMap["#section2"]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>
                  </div>
                  <div className="pa-5 pl-0 font-size-3">
                    {renderHtmlMap["#section3"]}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="col-6 pull-left">
                <div className="pr-5">
                  <div className="pa-6 line font-size-6">gogwe Seoul</div>
                  <div className="pa-5">{renderHtmlMap["#section4"]}</div>
                </div>
              </div>
              <div className="col-6 pull-left">
                <div className="pr-5">
                  <div className="pa-6 line font-size-6">gogwe Japan</div>
                  <div className="pa-5">{renderHtmlMap["#section5"]}</div>
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
