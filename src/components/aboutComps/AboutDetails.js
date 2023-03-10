import React from "react";
import "../../styles/About.css";

const AboutDetails = (props) => {
  return (
    <div className="aboutDivComponent">
      <div className="aboutHeaderProp">{props.header}</div>
      <div className="aboutMainProp">{props.main}</div>
      <div className="aboutParaProp">{props.para}</div>
    </div>
  );
};

export default AboutDetails;
