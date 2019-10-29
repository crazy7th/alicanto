import React from "react";
import Paper from "@material-ui/core/Paper";

function index() {
  return (
    <div className="section-profile">
      <img src="/static/login/bg-profile.png" className="profile-background" />
      <div className="section">
        <Paper elevation={0} className="profile-base" align="center">
          <img className="profile-image" src="/static/login/profile.png" />
          <h1 className="profile-name"> John Doe </h1>
          <h2 className="profile-desc"> View and edit profile </h2>
        </Paper>
      </div>
    </div>
  );
}

export default index;
