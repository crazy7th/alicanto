import Layout from "../components/Layouts/Layout";
import React from "react";
import ListProduct from "../components/Homepage/SectionListProduct";
import Promotion from "../components/Homepage/SectionPromotion";
import BlogSepulsa from "../components/Homepage/SectionBlogSepulsa";
import LoginMode from "../components/Homepage/SectionLoginMode";
import Instruction from "../components/Homepage/SectionInstruction";
import Header from "../components/Layouts/Header";
import LabelBottomNavigation from "../components/Layouts/LabelBottomNavigation";
import Snackbar from "../components/Homepage/Snackbar";
import "../static/css/style.sass";

const load = (
  <div>
    <Header />

    <img src="/static/homepage/background.png" className="background" />

    <Snackbar />

    <LoginMode />

    <ListProduct />

    <Promotion />

    <Instruction />

    <BlogSepulsa />

    <LabelBottomNavigation />
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
