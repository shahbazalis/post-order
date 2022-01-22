import React, { useState, useEffect } from "react";
import { getPosts } from "../api";
import { PostsInterface } from "../utility/interface";
import Popup from "./senderPosts";
import "./style.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [senderPosts, ssetSenderPosts] = useState([]);

  const postsDetails = async () => {
    try {
      const posts: any = await getPosts();
      const sortedSenderList = posts.sort((a: any, b: any) =>
        a.from_name.localeCompare(b.from_name)
      );
      setPosts(sortedSenderList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    postsDetails();
  }, []);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // *event.persist(), which will remove the synthetic event from the pool and allow references to the event to be retained by user code.
    event.persist();
    setSearchInput(event.target.value);
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handlePopup = (userId: string) => {
    const filteredSenderPosts = posts.filter((post: any) => {
      if (userId === post.from_id) return post;
    });
    ssetSenderPosts(filteredSenderPosts);
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <h1 className="heading-1">Post List</h1>
      <input
        className="search-input"
        placeholder="Search"
        type="text"
        name="search"
        value={searchInput || ""}
        onChange={handleChange}
      />
      <ul className="ul">
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
              <li className="li" key={post.id} onClick={() => handlePopup(post.from_id)}>
                {post.from_name}
              </li>
            );
          })}
      </ul>
      <div>
        {isOpen && (
          <Popup senderPosts={senderPosts} handleClose={togglePopup} />
        )}
      </div>
    </div>
  );
};

export default Posts;
