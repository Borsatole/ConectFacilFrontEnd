import "../assets/css/Loading.css";
// import Prototypes from "prop-types";
import * as React from "react";

interface LoadingProps {
  color?: string ;
}

function Loading({ color = "#ffffff" } : LoadingProps) {


  return (
    <div className="dot-spinner" style={{ "--uib-color": color }as React.CSSProperties}>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
    </div>
  );
}

export default Loading;
