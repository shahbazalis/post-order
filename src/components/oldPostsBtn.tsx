import React from "react";

interface OldPostsBtnProps {
    handleOldestPosts: () => void;
}

const OldPostsBtn = (props: OldPostsBtnProps ) => {
  return (
    <div>
      <button
        data-testid="sort-old-msg"
        onClick={() => props.handleOldestPosts()}
        className="ml15"
      >
         Old Posts
      </button>
    </div>
  );
};

export default OldPostsBtn;
