import React from "react";
import Masonry from "react-masonry-css";
import { CSSTransition } from "react-transition-group";
import NProgress from "nprogress";
import { Link } from "react-router-dom";

import $ from "jquery";

import "./work.scss";
import axios from "axios";

const breakpointColumnsObj = {
  default: 5,
  1400: 4,
  1100: 3,
  700: 2,
  500: 1
};

class Work extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      postList: [],
      isPostListLoad: false,
      isPostLoading: false,
      viewPostItem: null // 현재 보고 있는 포스트 아이템
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.match && this.props.match.params.id) {
      if (
        !prevProps.match ||
        prevProps.match.params.id !== this.props.match.params.id
      ) {
        this.$httpLoadPost(this.props.match.params.id);
      }
    } else if (!this.props.match && this.state.viewPostItem) {
      this.setState({
        ...this.state,
        viewPostItem: null
      });
    }
  }

  UNSAFE_componentWillReceiveProps() {
    console.log(this.props);
  }

  UNSAFE_componentWillUpdate() {
    console.log(this.props);
  }

  componentDidMount() {
    NProgress.start({ easing: "ease", speed: 500, trickleSpeed: 300 });
    NProgress.set(0.7);
    axios
      .get(`https://gwerichang.com/gogwe/?rest_route=/wp/v2/posts&per_page=100&page=1`)
      .then(rs => {
        this.setState(
          {
            ...this.state,
            postList: rs.data,
            isPostListLoad: true
          },
          () => {
            if (this.props.match && this.props.match.params.id) {
              this.$httpLoadPost(this.props.match.params.id);
            }
          }
        );
        NProgress.done();
      });
  }

  $httpLoadPost(id) {
    NProgress.start({ easing: "ease", speed: 500, trickleSpeed: 300 });
    NProgress.set(0.7);
    this.setState({
      ...this.state,
      isPostLoading: false
    });
    axios
      .get(`https://gwerichang.com/gogwe/?rest_route=/wp/v2/posts/${id}`)
      .then(rs => {
        this.setState(
          {
            ...this.state,
            isPostLoading: true,
            viewPostItem: rs.data
          },
          () => {
            window.scrollTo(0, 0);
          }
        );
        NProgress.done();
      });
  }

  render() {
    const {
      postList,
      isPostListLoad,
      viewPostItem,
      isPostLoading
    } = this.state;
    console.log(viewPostItem);
    return (
      <div className="work-comp">
        <CSSTransition in={isPostListLoad} timeout={1000} classNames="fade">
          <div>
            {viewPostItem ? (
              <WorkView
                viewPostItem={viewPostItem}
                isPostLoading={isPostLoading}
              ></WorkView>
            ) : null}
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {postList.map((item, index) => {
                return <PostLink item={item} key={index}></PostLink>;
              })}
            </Masonry>
          </div>
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
      <Link to={`/work/${item.id}`} className="post-link-box">
        <div className="post-link-content">
          <img
            alt="gogwe"
            className="post-image"
            src={item.jetpack_featured_media_url}
          ></img>
        </div>
      </Link>
    );
  }
  // 없는 글
  else {
    return (
      <Link
        onClick={() => {
          console.log("click");
        }}
        to={`/work/${item.id}`}
        className="post-link-box"
      >
        <div className="post-link-content">
          <div>{item.title.rendered}</div>
          <div
            dangerouslySetInnerHTML={{
              __html: removeImgTag(item.content.rendered)
            }}
          ></div>
        </div>
      </Link>
    );
  }
}

class WorkView extends React.Component {
  componentDidMount() {
    console.log("mount");
  }

  render() {
    const { viewPostItem, isPostLoading } = this.props;
    const imgList = getImgList(viewPostItem.content.rendered);
    console.log(viewPostItem.content.rendered);
    return (
      <CSSTransition in={isPostLoading} timeout={1000} classNames="fade2">
        <div
          className="work-view-comp clearfix"
          style={{ minHeight: `${window.innerHeight - 72}px` }}
        >
          <div className="work-text-wrap pull-left col-3 sm-col-12">
            <div className="work-text-box">
              <div className="pa-4 pl-5 font-size-6">
                {viewPostItem.title.rendered}
              </div>
              <div
                className="pa-4 pt-0 font-size-4"
                dangerouslySetInnerHTML={{
                  __html: viewPostItem.excerpt.rendered
                }}
              ></div>
            </div>
          </div>
          <div className="work-img-wrap pull-left col-9 sm-col-12 full-height">
            <div className="pa-5 full-height img-box">
              {imgList
                ? imgList.map((item, index) => {
                    console.log(item);
                    return (
                      <div className="mb-5">
                        <img src={item.src} alt="" className="full-width"></img>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </CSSTransition>
    );
  }
}

function removeImgTag(tag) {
  let $box = $(`<div>${tag}</div>`);
  $box.find("img").remove();
  $box.find(".wp-block-gallery").remove();
  return $box.html();
}

// 나중에 여기서 해상도별 이미지 분기해야 함
function getImgList(tag) {
  let list = [];
  let $box = $(`<div>${tag}</div>`);
  $box.find("img").each(function(index, item) {
    list.push(item);
  });
  return list;
}

export default Work;
