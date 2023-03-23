import React from "react";

const Header = () => {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        width: "100%",
        zIndex: 10,
      }}
    >
      <h1 className="bg-primary text-light text-center p-1"> News (समाचार) </h1>
    </div>
  );
};

export default Header;
