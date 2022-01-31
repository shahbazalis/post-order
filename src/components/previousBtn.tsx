import React from "react";

interface PrvBtnProps {
  handlePrvBtn: () => void;
  page: number;
}

const PreviousBtn = (props: PrvBtnProps) => {
  return (
    <div className="fleft">
      {props.page === 1 ? (
        <button data-testid="prv-page-btn" className="ml15" disabled={true}>
          Previous Page
        </button>
      ) : (
        <button
          data-testid="prv-page-btn"
          className="ml15"
          onClick={props.handlePrvBtn}
        >
          Previous Page
        </button>
      )}
    </div>
  );
};

export default PreviousBtn;
