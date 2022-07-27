import React, { useState, useEffect } from "react";
import "./CointsList.scss";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { changeDialogStatus } from "../../store/dialogSlice";
import Dialog from "../Dialog/Dialog";
import { addBid } from "../../store/bidsSlice";

function CointsList() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [dialogStatus, setDialogStatus] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [visible, setVisible] = useState(4);
  const dispatch = useDispatch();
  const status = useSelector((state) => {
    return state.dialog.dialogStatus;
  });

  const openDialog = (item) => {
    dispatch(changeDialogStatus());
    dispatch(addBid(item));
  };

  useEffect(() => {
    setDialogStatus(status);
  }, [status]);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://api2.binance.com/api/v3/ticker/24hr"
      );
      setPosts(response.data);
      setLoading(false);
    };

    loadPosts();
  }, []);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };
  return (
    <div className="section">
      <div className="search">
        <h3>Search Filter</h3>
        <input
          style={{ width: "400px", height: "25px" }}
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchTitle(e.target.value)}
        />
      </div>
      <div className="list">
        <h3>Name</h3>
        <h3>Price</h3>
        <h3>Volume</h3>
        <h3>Change(24h)</h3>
        <h3>Action</h3>
      </div>
      {dialogStatus ? <Dialog /> : null}

      {loading ? (
        <h4>Loading ...</h4>
      ) : (
        posts
          .filter((value) => {
            if (searchTitle === "") {
              return value;
            } else if (
              value.symbol.toLowerCase().includes(searchTitle.toLowerCase())
            ) {
              return value;
            }
          })
          .slice(0, visible)
          .map((item) => (
            <div className="coints-div">
              <div className="coints">
                <h5 key={item.id}>{item.symbol}</h5>
                <p>{item.lastPrice}$</p>

                <p>{item.volume}</p>
                <p>{item.priceChangePercent}%</p>
                <button
                  className="trade-button"
                  onClick={() => openDialog(item)}
                >
                  Trade
                </button>
              </div>
            </div>
          ))
      )}
      <button onClick={showMoreItems}>load more</button>
    </div>
  );
}

export default CointsList;
