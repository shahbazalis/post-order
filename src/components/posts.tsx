import React, { useState, useEffect } from "react";
import { getPosts } from "../api";
import { PostsInterface } from "../utility/interface";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { removeStorageData, setStorageData } from "../utility/sessionStorage";
import moment from "moment";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [msgSearchInput, setMsgSearchInput] = useState("");
  const [selectUserPosts, setSelectUserPosts] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();

  const postsDetails = async () => {
    try {
      setStorageData("page", page);
      const posts: any = await getPosts(page);

      const sortedSenderList = posts.sort((a: any, b: any) =>
        a.from_name.localeCompare(b.from_name)
      );

      const occurrences = await sortedSenderList.reduce(
        (acc: any, post: any) => {
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

      const occurencesArr: any = Object.keys(occurrences).map(
        (key, index) => occurrences[key]
      );

      setPosts(occurencesArr);
      if (occurencesArr.length > 0)
        setSelectUserPosts(occurencesArr[0]["post"]);
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

  const handleMessageList = (posts: string[]) => {
    setSelectUserPosts(posts);
  };

  const handleLogOut = () => {
    navigate("/");
    removeStorageData("accessToken");
    removeStorageData("userInfo");
    removeStorageData("page");
  };

  const handleRecentPosts = () => {
    const sorted = selectUserPosts.sort((x: any, y: any)=> 
      y.created_time.localeCompare(x.created_time)
    );
    setSelectUserPosts(sorted);
  };

  const handleOldestPosts = () => {
    const sorted = selectUserPosts.sort((x: any, y: any)=> 
    x.created_time.localeCompare(y.created_time)
  );
    setSelectUserPosts(sorted);
  };

  return (
    <div>
      <div>
        <h1 className="heading-1">Post List</h1>
        <button className="button" onClick={handleLogOut}>
          Log Out
        </button>
      </div>
      <div>
        <input
          className="search-input"
          placeholder="Search"
          type="text"
          name="search"
          value={searchInput || ""}
          onChange={handleNameSearch}
        />
      </div>
      <div>
        <ul className="first-list">
          {posts
            .filter((post: any) => {
              if (searchInput === "") return post.from_name;
              else {
                return post.from_name
                  .toLowerCase()
                  .includes(searchInput.toLowerCase());
              }
            })
            .map((post: any) => {
              return (
                <li className="list-item" key={post.from_name}>
                  {post.from_name} {post.post.length}
                  <button
                    className="detail-button"
                    onClick={() => handleMessageList(post.post)}
                  >
                    Check Posts
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
      <div>
        <input
          type="text"
          className="msg-search-input"
          placeholder="Search"
          name="search"
          value={msgSearchInput || ""}
          onChange={handleMessageSearch}
        />
        <ul className="second-list">
          <button onClick={() => handleRecentPosts()}>Recent Posts</button>
          <button onClick={() => handleOldestPosts()}>Old Posts</button>
          {selectUserPosts
            .filter((post: any) => {
              if (msgSearchInput === "") return post;
              else {
                return post.message
                  .toLowerCase()
                  .includes(msgSearchInput.toLowerCase());
              }
            })
            .map((post: any) => {
              return (
                <li className="list-item">
                  {moment(post.created_time).format("MMMM Do YYYY, h:mm:ss a")}{" "}
                  <ul>
                    <li className="no-style-list-item">{post.message}</li>
                  </ul>
                </li>
              );
            })}
        </ul>
      </div>
      <div>
        {page === 1 ? (
          <button className="footer" disabled={true}>
            Previous Page
          </button>
        ) : (
          <button className="footer" onClick={() => setPage(page - 1)}>
            Previous Page
          </button>
        )}
        {page === 10 ? (
          <button className="footer" disabled={true}>
            Next Page
          </button>
        ) : (
          <button className="footer" onClick={() => setPage(page + 1)}>
            Next Page
          </button>
        )}
      </div>
    </div>
  );
};

export default Posts;
