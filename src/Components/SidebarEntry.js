import React from "react";
import "./SidebarEntry.css";

function SidebarEntry({ text, Icon }) {
  return (
    <div className="sidebarEntry">
      <Icon />
      <h2>{text}</h2>
    </div>
  );
}

export default SidebarEntry;
