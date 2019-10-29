import React from "react";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Link from "next/link";
import Layout from "../components/Layouts/Layout";
import LoginMode from "../components/Homepage/SectionLoginMode";
import Profile from "../components/Profile/Section-Profile";
import MenuList from "../components/Profile/Section-MenuList";
import "../static/css/style.sass";

const load = (
  <div className="section-profile">
    <Link href="/">
      <ArrowBack className="profile-back" />
    </Link>

    <Profile />

    <LoginMode />

    <MenuList />
  </div>
);

function Index() {
  return (
    <div>
      <Layout content={load} />
    </div>
  );
}

export default Index;
