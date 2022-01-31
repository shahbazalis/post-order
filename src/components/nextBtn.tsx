import React from "react";
import "../views/style.css";

interface NextBtnProps {
  handleNextBtn: () => void;
  page: number;
}

const NextBtn = (props: NextBtnProps) => {
  return (
    <div className="fleft">
      {props.page === 10 ? (
        <button data-testid="next-page-btn" className="ml15" disabled={true}>
          Next Page
        </button>
      ) : (
        <button
          data-testid="next-page-btn"
          className="ml15"
          onClick={props.handleNextBtn}
        >
          Next Page
        </button>
      )}
    </div>
  );
};

export default NextBtn;
