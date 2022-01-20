import React, { useState, useEffect } from "react";
import { getPosts } from "../api";
import { PostsInterface } from "../utility/interface";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const postsDetails = async () => {
    try {
      const posts: any = await getPosts();
      setPosts(posts.posts);
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

  return (
    <div>
      <h1>Post List</h1>
      <label>
        Search
        <br />
        <input
          type="text"
          name="search"
          value={searchInput || ""}
          onChange={handleChange}
        />
      </label>
      <ul>
        {posts.map((post: any) => {
          return <li key={post.id}>{post.from_name}</li>;
        })}
      </ul>
      ;
    </div>
  );
};

export default PostList;
