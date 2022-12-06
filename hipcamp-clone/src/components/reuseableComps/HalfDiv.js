import React, { useContext } from "react";
import { SiteContext } from "../../contexts/SiteContext";
import "../../styles/HalfDiv.css";

const HalfDiv = (props) => {
  const { currentSiteList, setCurrentSiteList } = useContext(SiteContext);
  const FullList = props.list;

  function createList() {
    let item;
    if (props.title === "Cozy Fall Stays") {
      item = "Minnesota";
    } else {
      item = "Montana";
    }

    let newArray = [];

    FullList.map((value, key) => {
      if (value.state === item) {
        newArray.push(value);
      }
    });
    setCurrentSiteList(newArray);
  }

  return (
    <div
      className="halfDivContainer"
      onClick={() => {
        createList();
      }}
    >
      <img src={props.image} alt="" className="halfImage" />
      <div className="halfDivBottom" style={props.style}>
        <div className="halfDivWriting">
          <div style={{ fontSize: "large" }}>{props.title}</div>
          <div style={{ fontSize: "22px" }}>{props.comment}</div>
        </div>
        <div className="halfButtonContainer">
          <button className="halfBtn" style={props.font}>
            Book now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HalfDiv;