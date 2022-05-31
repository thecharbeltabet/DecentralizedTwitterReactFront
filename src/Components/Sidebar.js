import React from "react";
import "./Sidebar.css";
import TwitterIcon from "@material-ui/icons/Twitter";
import SidebarEntry from "./SidebarEntry";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { Button } from "@material-ui/core";

function Sidebar() {
  return (
    <div className="sidebar">
      <TwitterIcon className="sidebar__twitterIcon" />

      <SidebarEntry Icon={HomeIcon} text="EPITA" />
      <SidebarEntry Icon={SearchIcon} text="Explore The Blockchain" />
      <SidebarEntry
        Icon={NotificationsNoneIcon}
        text="Using Solidity and ReactJS"
      />
      <SidebarEntry Icon={MailOutlineIcon} text="Deploy Smart Contracts" />
      <SidebarEntry Icon={BookmarkBorderIcon} text="Be part of the Future" />

      {/* Button -> Tweet */}
      <Button variant="outlined" className="sidebar__tweet" fullWidth>
        Real developers only use dark mode !{" "}
      </Button>
    </div>
  );
}

export default Sidebar;
