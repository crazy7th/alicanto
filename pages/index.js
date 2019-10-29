import Layout from "../components/Layouts/Layout";
import ListProduct from "../components/Homepage/SectionListProduct";
import Promotion from "../components/Homepage/SectionPromotion";
import BlogSepulsa from "../components/Homepage/SectionBlogSepulsa";
import GuestMode from "../components/Homepage/SectionGuestMode";
import Instruction from "../components/Homepage/SectionInstruction";
import Header from "../components/Layouts/Header";

import LabelBottomNavigation from "../components/Layouts/LabelBottomNavigation";
import "../static/css/style.sass";
import { inject } from "mobx-react";

const Home = props => (
  <div>
    <Header />
    <img src="/static/homepage/background.png" className="background" />
    <GuestMode />

    <ListProduct product={props.product} />

    <Promotion />

    <Instruction />

    <BlogSepulsa />

    <LabelBottomNavigation />
  </div>
);

const Index = props => {
  return <Layout content={<Home />} bottomNav="profile" />;
};

export default inject("productStore", "userStore")(Index);
