import React from "react";
import $ from "jquery";
import { CSSTransition } from "react-transition-group";

import "./home.scss";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postList: [],
      isPostListLoad: false
    };
  }

  componentDidMount() {
    $.ajax({
      method: "get",
      url: `https://gwerichang.com/gogwe/?rest_route=/wp/v2/posts`
    }).then(rs => {
      this.setState({
        postList: rs,
        isPostListLoad: true
      });
    });
  }

  render() {
    const { postList, isPostListLoad } = this.state;
    return (
      <div className="home-comp">
        <CSSTransition in={isPostListLoad} timeout={200} classNames="my-node">
          <div>
            {postList.map((item, index) => {
              return <PostLink item={item} key={index}></PostLink>;
            })}
          </div>
        </CSSTransition>
      </div>
    );
  }
}

function PostLink(props) {
  const item = props.item;
  console.log(item);
  if (item.jetpack_featured_media_url) {
    return (
      <div
        className="post-link-box"
        style={{
          backgroundImage: `url('${item.jetpack_featured_media_url}')`
        }}
      ></div>
    );
  } else {
    return <div className="post-link-box">{item.title.rendered}</div>;
  }
}

export default Home;
