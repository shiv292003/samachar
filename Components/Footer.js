import React from "react";

const Footer = () => {
  return (
    <div
      className="fixed-bottom"
      style={{
        backgroundColor: "blue",
        color: "white",
        padding: "1rem",
        textAlign: "center",
        borderTop: "1px solid #6c757d",
      }}
    >
      <h6
        className="m-0"
        style={{
          fontSize: "0.8rem",
        }}
      >
        &copy; <a href="https://twitter.com/imss_sharma"  target =  "_blank">My twitter</a>.
         All rights reserved.
      </h6>
    </div>
  );
};

export default Footer;


