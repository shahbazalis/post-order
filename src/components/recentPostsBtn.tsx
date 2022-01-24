import React from "react";
interface ChckPostsProps {
  handleRecentPosts: () => void;
}

const RecentPostsBtn = (props: ChckPostsProps) => {
  return (
    <div className="div1">
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
