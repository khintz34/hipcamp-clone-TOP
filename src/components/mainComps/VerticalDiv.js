import React from "react";
import "../../styles/VerticalDiv.css";
import tent from "../../images/tent.jpeg";
import butterfly from "../../images/butterfly.jpeg";
import cabin from "../../images/cabin.jpeg";
import { Link } from "react-router-dom";

const VerticalDiv = (props) => {
  const tentColor = {
    backgroundColor: "var(--tent)",
  };
  const butterflyColor = {
    backgroundColor: "var(--butterfly)",
  };
  const cabinColor = {
    backgroundColor: "var(--cabin)",
  };

  const verticalDivArray = [
    {
      to: "/siteList/hidden/0/null/null/null/null/special",
      image: tent,
      style: tentColor,
      title: "Hidden gems",
      comment: "Sites on the rise",
      special: "hidden",
    },
    {
      to: "/siteList/monarchs/0/null/null/null/null/special",
      image: butterfly,
      style: butterflyColor,
      title: "Project Monarch",
      comment: "Hosts protecting Monarch Butterflies",
      special: "monarchs",
    },
    {
      to: "/siteList/cottage/0/null/null/null/null/special",
      image: cabin,
      style: cabinColor,
      title: "Cottage Stays",
      comment: "Our top picks",
      special: "cottage",
    },
  ];

  return (
    <div id="verticalDivsContainer">
      {verticalDivArray.map((value) => {
        return (
          <Link to={value.to}>
            <div className="vertDivContainer">
              <img src={value.image} alt="" className="vertImage" />
              <div className="vertDivBottom" style={value.style}>
                <div className="vertDivWriting">
                  <div style={{ fontSize: "2vw" }}>{value.title}</div>
                  <div style={{ fontSize: "1.5vw" }}>{value.comment}</div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default VerticalDiv;