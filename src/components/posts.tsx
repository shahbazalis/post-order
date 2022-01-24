import React, { useState, useEffect } from "react";
import { getPosts } from "../api";
import {
  PostInterface,
  SelectedPostsInterface,
  SortedPosts,
  PostDataMap,
} from "../utility/interface";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { removeStorageData, setStorageData } from "../utility/sessionStorage";
import moment from "moment";

const Posts = () => {
  const [posts, setPosts] = useState<SortedPosts[]>([]);
  const [senderName, setSenderName] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [msgSearchInput, setMsgSearchInput] = useState("");
  const [selectUserPosts, setSelectUserPosts] = useState<
    SelectedPostsInterface[]
  >([]);
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();

  const postsDetails = async () => {
    try {
      setStorageData("page", page);
      const posts = await getPosts(page);

      const sortedSenderList = posts.sort(
        (a: PostInterface, b: PostInterface) =>
          a.from_name.localeCompare(b.from_name)
      );

      const occurrences = await sortedSenderList.reduce(
        (acc: PostDataMap, post: PostInterface) => {
          if (post.from_id in acc) {
            acc[post.from_id].post.push({
              message: post.message,
              created_time: post.created_time,
            });
          } else {
            acc[post.from_id] = {
              from_name: post.from_name,
              post: [
                { message: post.message, created_time: post.created_time },
              ],
            };
          }
          return acc;
        },
        []
      );

      const occurencesArr: SortedPosts[] = Object.keys(occurrences).map(
        (key, index) => occurrences[key]
      );
      setPosts(occurencesArr);

      if (occurencesArr.length) {
        setSelectUserPosts(occurencesArr[0].post);
        setSenderName(occurencesArr[0].from_name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    postsDetails();
  }, [page]);

  const handleNameSearch = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // *event.persist(), which will remove the synthetic event from the pool and allow references to the event to be retained by user code.
    event.persist();
    setSearchInput(event.target.value);
  };

  const handleMessageSearch = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // *event.persist(), which will remove the synthetic event from the pool and allow references to the event to be retained by user code.
    event.persist();
    setMsgSearchInput(event.target.value);
  };

  const handlePostList = (
    posts: SelectedPostsInterface[],
    senderName: string
  ) => {
    setSelectUserPosts(posts);
    setSenderName(senderName);
  };

  const handleLogOut = () => {
    navigate("/");
    removeStorageData("accessToken");
    removeStorageData("userInfo");
    removeStorageData("page");
  };

  const date = (time: string) => {
    return new Date(time);
  };

  const handleRecentPosts = () => {
    const rececntPostsArr = [...selectUserPosts].sort(
      (x: SelectedPostsInterface, y: SelectedPostsInterface) => {
        let postOne: Date = date(y.created_time);
        let postTwo: Date = date(x.created_time);
        let result = postOne.valueOf() - postTwo.valueOf();

        return result;
      }
    );
    setSelectUserPosts(rececntPostsArr);
  };

  const handleOldestPosts = () => {
    const oldPostsArr = [...selectUserPosts].sort(
      (x: SelectedPostsInterface, y: SelectedPostsInterface) => {
        let postOne: Date = date(x.created_time);
        let postTwo: Date = date(y.created_time);

        let result = postOne.valueOf() - postTwo.valueOf();

        return result;
      }
    );
    setSelectUserPosts(oldPostsArr);
  };

  return (
    <div>
      <div>
        <h1 className="heading-1">Post List</h1>
        <button
          data-testid="logout-btn"
          className="button"
          onClick={handleLogOut}
        >
          Log Out
        </button>
      </div>
      <div className="grid-container">
        <div>
          <input
            data-testid="search-name"
            className="search-input"
            placeholder="Search"
            type="text"
            name="search"
            value={searchInput || ""}
            onChange={handleNameSearch}
          />
        </div>
        <div>
          {page === 1 ? (
            <button
              data-testid="prv-page-btn"
              className=" ml15"
              disabled={true}
            >
              Previous Page
            </button>
          ) : (
            <button
              data-testid="prv-page-btn"
              className="ml15"
              onClick={() => setPage(page - 1)}
            >
              Previous Page
            </button>
          )}
          {page === 10 ? (
            <button
              data-testid="next-page-btn"
              className="ml15 "
              disabled={true}
            >
              Next Page
            </button>
          ) : (
            <button
              data-testid="next-page-btn"
              className="ml15"
              onClick={() => setPage(page + 1)}
            >
              Next Page
            </button>
          )}
        </div>
        <div>
          <button
            data-testid="sort-recent-msg"
            onClick={() => handleRecentPosts()}
            className="ml15"
          >
            Recent Posts
          </button>
          <button
            data-testid="sort-old-msg"
            onClick={() => handleOldestPosts()}
            className="ml15"
          >
            Old Posts
          </button>
        </div>
        <div>
          <input
            data-testid="search-message"
            type="text"
            className="msg-search-input"
            placeholder="Search"
            name="search"
            value={msgSearchInput || ""}
            onChange={handleMessageSearch}
          />
        </div>
      </div>

      <div>
        <ul className="first-list">
          {posts
            .filter((post: SortedPosts) => {
              if (searchInput === "") return post.from_name;
              else {
                return post.from_name
                  .toLowerCase()
                  .includes(searchInput.toLowerCase());
              }
            })
            .map((post: SortedPosts) => {
              return senderName === post.from_name ? (
                <li
                  className="list-item active-list-item"
                  key={post.from_name}
                  onClick={() => handlePostList(post.post, post.from_name)}
                >
                  {post.from_name}{" "}
                  <span className="avatar">{post.post.length}</span>
                </li>
              ) : (
                <li
                  className="list-item"
                  key={post.from_name}
                  onClick={() => handlePostList(post.post, post.from_name)}
                >
                  {post.from_name}{" "}
                  <span className="avatar">{post.post.length}</span>
                </li>
              );
            })}
        </ul>
      </div>
      <div>
        <ul className="second-list">
          {selectUserPosts
            .filter((post: SelectedPostsInterface) => {
              if (msgSearchInput === "") return post;
              else {
                return post.message
                  .toLowerCase()
                  .includes(msgSearchInput.toLowerCase());
              }
            })
            .map((post: SelectedPostsInterface, index) => {
              return (
                <li className="list-item list_item_post_border" key={index}>
                  {moment(post.created_time).format("MMMM Do YYYY, h:mm:ss a")}{" "}
                  <ul>
                    <li className="no-style-list-item">{post.message}</li>
                  </ul>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Posts;
