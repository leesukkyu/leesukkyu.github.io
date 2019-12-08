import React from "react";
import $ from "jquery";
import Masonry from "react-masonry-css";
import { CSSTransition } from "react-transition-group";

import "./work.scss";

window.$ = $;

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
        <CSSTransition in={isPostListLoad} timeout={200} classNames="fade">
          <Masonry
            breakpointCols={4}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {postList.map((item, index) => {
              return <PostLink item={item} key={index}></PostLink>;
            })}
          </Masonry>
        </CSSTransition>
      </div>
    );
  }
}

function PostLink(props) {
  const item = props.item;
  console.log(item);
  // 대표 이미지가 있는 글
  if (item.jetpack_featured_media_url) {
    return (
      <div className="post-link-box">
        <div className="post-link-content">
          <img
            className="post-image"
            src={item.jetpack_featured_media_url}
          ></img>
        </div>
      </div>
    );
  }
  // 없는 글
  else {
    const $item = $(item.content.rendered);
    return (
      <div className="post-link-box">
        <div className="post-link-content">
          <div>{item.title.rendered}</div>{" "}
          <div>{$item ? $item.html() : ""}</div>
        </div>
      </div>
    );
  }
}

export default Home;
