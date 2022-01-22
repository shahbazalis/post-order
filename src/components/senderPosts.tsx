import React from "react";
import moment from "moment";
import "./style.css";

const Popup = (props: any) => {
  return (
    <div className="popup-box">
      <div className="box">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          name="search"
          //value={searchInput || ""}
          //onChange={handleChange}
        />
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        <ul>
          {props.senderPosts.map((post: any) => {
            return (
              <li className="li" key={post.id}>
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

export default Popup;
