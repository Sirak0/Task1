import React, { useState, useEffect } from "react";
import "./BidList.scss";
import { useDispatch, useSelector } from "react-redux";

function BidList() {
  const [bidsState, setBidsState] = useState([]);
  const bids = useSelector(function (state) {
    return state.bids.bids;
  });
  console.log(bids);

  return (
    <div className="bids-div">
      {" "}
      {bids.map((bid, index) => {
        return (
          <div className="bids" key={index}>
            <h5>{bid.symbol} </h5>
            <p>{bid.lastPrice}$</p>
            <p>{bid.priceChangePercent}%</p>
            <button>Cancle</button>
          </div>
        );
      })}
    </div>
  );
}

export default BidList;
