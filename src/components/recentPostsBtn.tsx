import React from "react";

interface RecentPostsBtnProps {
  handleRecentPosts: () => void;
}

const RecentPostsBtn = (props: RecentPostsBtnProps) => {
  return (
    <div className="fleft">
      <button
        data-testid="sort-recent-msg"
        onClick={() => props.handleRecentPosts()}
        className="ml15"
      >
        Recent Posts
      </button>
    </div>
  );
};

export default RecentPostsBtn;
