import React from "react";
import "./Dialog.scss";
import { AiFillCloseCircle } from "react-icons/ai";
import { changeDialogStatus } from "../../store/dialogSlice";
import { useDispatch } from "react-redux";
import CointsList from "../CointsList/CointsList";
import { useSelector } from "react-redux";

const Dialog = () => {
  const dispatch = useDispatch();
  const bids = useSelector(function (state) {
    return state.bids.bids;
  });
  console.log(bids);
  const changeStatus = () => {
    dispatch(changeDialogStatus());
  };

  return (
    <div className="dialog">
      <div className="dialog-content">
        <AiFillCloseCircle className="close-icon" onClick={changeStatus} />
        {bids.map((bid, index) => {
          return (
            <div className="dialog-coint" key={index}>
              <h5>{bid.symbol} </h5>
              <p>{bid.lastPrice}$</p>
              <p>{bid.priceChangePercent}%</p>
            </div>
          );
        })}
        <div className="submit-div">
          <input type="text" placeholder="0.0$"></input>
          <button>Buy</button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
