import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

import { getPosts } from "../api";
import { PostInfo } from "../interfaces/PostInfo";
import { SelectedPosts } from "../interfaces/SelectedPosts";
import { SortedPosts } from "../interfaces/SortedPosts";
import { PostDataMap } from "../interfaces/PostDataMap";

import { removeStorageData, setStorageData } from "../utils/sessionStorage";
import UserPosts from "./userPosts";
import PreviousBtn from "../components/previousBtn";
import NextBtn from "../components/nextBtn";
import RecentPostsBtn from "../components/recentPostsBtn";
import OldPostsBtn from "../components/oldPostsBtn";
import SearchNameInput from "../components/searchNameInput";
import SearchMsgInput from "../components/searchMsgInput";
import Spinner from "./spinner";

const Posts = () => {
  const [posts, setPosts] = useState<SortedPosts[]>([]);
  const [senderName, setSenderName] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [msgSearchInput, setMsgSearchInput] = useState("");
  const [selectUserPosts, setSelectUserPosts] = useState<SelectedPosts[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const postsDetails = async () => {
    try {
      setLoading(true);
      setStorageData("page", page);
      const posts = await getPosts(page);
      setLoading(false);
      const sortedSenderList = posts.sort((a: PostInfo, b: PostInfo) =>
        a.from_name.localeCompare(b.from_name)
      );

      const occurrences = await sortedSenderList.reduce(
        (acc: PostDataMap, post: PostInfo) => {
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
      setLoading(false);
    }
  };

  useEffect(() => {
    postsDetails();
  }, [page]);

  const handleNameSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    // *event.persist(), which will remove the synthetic event from the pool and allow references to the event to be retained by user code.
    event.persist();
    setSearchInput(event.target.value);
  };

  const handleMessageSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    // *event.persist(), which will remove the synthetic event from the pool and allow references to the event to be retained by user code.
    event.persist();
    setMsgSearchInput(event.target.value);
  };

  const handlePostList = (posts: SelectedPosts[], senderName: string) => {
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
      (x: SelectedPosts, y: SelectedPosts) => {
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
      (x: SelectedPosts, y: SelectedPosts) => {
        let postOne: Date = date(x.created_time);
        let postTwo: Date = date(y.created_time);

        let result = postOne.valueOf() - postTwo.valueOf();

        return result;
      }
    );
    setSelectUserPosts(oldPostsArr);
  };

  const handlePrvBtn = () => {
    setPage(page - 1);
  };

  const handleNextBtn = () => {
    setPage(page + 1);
  };

  return (
    <div>
       {loading && <Spinner />}
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
        <></>
        <div>
          <SearchNameInput
            handleNameSearch={handleNameSearch}
            searchInput={searchInput}
          />
        </div>
        <div>
          <PreviousBtn handlePrvBtn={handlePrvBtn} page={page} />
          <NextBtn handleNextBtn={handleNextBtn} page={page} />
        </div>
        <div>
          <RecentPostsBtn handleRecentPosts={handleRecentPosts} />
          <OldPostsBtn handleOldestPosts={handleOldestPosts} />
        </div>
        <div>
          <SearchMsgInput
            handleMessageSearch={handleMessageSearch}
            msgSearchInput={msgSearchInput}
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
        <UserPosts
          selectUserPosts={selectUserPosts}
          msgSearchInput={msgSearchInput}
        />
      </div>
    </div>
  );
};

export default Posts;
