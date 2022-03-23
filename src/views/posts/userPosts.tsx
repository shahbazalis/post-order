import React from "react";
import { SelectedPosts } from "../../interfaces/SelectedPosts";
import "../style.css";
import moment from "moment";

interface UserPostsProps {
  selectUserPosts: SelectedPosts[];
  msgSearchInput: String;
}

const UserPosts = (props: UserPostsProps) => {
  const filterMessage = (post: SelectedPosts) => {
    if (props.msgSearchInput === "") return post;
    else {
      return post.message
        .toLowerCase()
        .includes(props.msgSearchInput.toLowerCase());
    }
  };

  return (
    <div>
      <ul className="second-list">
        {props.selectUserPosts
          .filter((post: SelectedPosts) => filterMessage(post))
          .map((post: SelectedPosts, index) => {
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
  );
};

export default UserPosts;
