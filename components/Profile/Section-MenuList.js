import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Link from "next/link";
import shortid from "shortid";
import ChevronRight from "@material-ui/icons/ChevronRight";

const list1 = [
  {
    icon: "/static/homepage/icon-card.svg",
    text: "Informasi Kartu Kredit",
    link: "/"
  },
  {
    icon: "/static/homepage/icon-card.svg",
    text: "Konfirmasi Pembayaran",
    link: "/"
  },
  { icon: "/static/homepage/icon-card.svg", text: "Auto Pay", link: "/" },
  {
    icon: "/static/homepage/icon-card.svg",
    text: "Rate Sepulsa App",
    link: "/"
  }
];

const list2 = [
  { icon: "/static/homepage/icon-card.svg", text: "Tentang Kami", link: "/" },
  { icon: "/static/homepage/icon-card.svg", text: "Pertanyaan", link: "/" },
  {
    icon: "/static/homepage/icon-card.svg",
    text: "Syarat & Ketentuan",
    link: "/"
  },
  { icon: "/static/homepage/icon-card.svg", text: "Sign Out", link: "/signout" }
];

function index() {
  return (
    <div className="section section-profile">
      <h2> Menu </h2>
      <Paper elevation={0} className="credit-base">
        <List>
          {list1.map(menu => (
            <Link href={menu.link} key={shortid.generate()}>
              <ListItem>
                <img src={menu.icon} />
                <p>{menu.text} </p>
                <ChevronRight />
              </ListItem>
            </Link>
          ))}
        </List>
      </Paper>

      <h2> Info </h2>
      <Paper elevation={0} className="credit-base">
        <List>
          {list2.map(menu => (
            <Link href={menu.link} key={shortid.generate()}>
              <ListItem>
                <img src={menu.icon} />
                <p>{menu.text} </p>
                <ChevronRight />
              </ListItem>
            </Link>
          ))}
        </List>
      </Paper>

      <div align="center" className="profile-version">
        <p> © 2019 Sepulsa </p>
      </div>
    </div>
  );
}

export default index;
