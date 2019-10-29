import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import shortid from "shortid";
import Link from "next/link";

import * as Path from "../../util/Path";
import * as Constants from "../../util/Constants";
import * as ConstantsImg from "../../util/ConstantsImg";

const menus = [
  {
    link: "/transaction/pulsa",
    image: "/static/homepage/icon-pulsa.svg",
    title: "Pulsa"
  },
  {
    link: "/transaction/paket-data",
    image: "/static/homepage/icon-paket.svg",
    title: "Paket Data"
  },
  {
    link: "/transaction/pln",
    image: "/static/homepage/icon-listrik.svg",
    title: "Listrik PLN"
  },
  {
    link: "transaction/bpjs-kesehatan",
    image: "/static/homepage/icon-bpjs.svg",
    title: "Bayar BPJS Kesehatan"
  },
  // {
  //   link: "/transaction/telkom",
  //   image: "/static/homepage/icon-telkom.svg",
  //   title: "Tagihan Telkom"
  // },
  {
    link: Path.VOUCHER_GAME,
    image: ConstantsImg.PRODUCT_VOUCHER_GAME,
    title: Constants.VOUCHER_GAME
  },
  {
    link: "/transaction/pdam",
    image: "/static/homepage/icon-pdam.svg",
    title: "Listrik PDAM"
  },
  {
    link: "/transaction/multifinance",
    image: "/static/homepage/icon-cicilan.svg",
    title: "Bayar Cicilan"
  },
  {
    link: "/menu",
    image: "/static/homepage/icon-more.svg",
    title: "More"
  }
];
const generateKey = pre => {
  return `${pre}_${new Date().getTime()}`;
};

const index = props => {
  return (
    <div className="section section-product">
      <Paper spacing={6} elevation={0} className="product-base">
        <h2> Daftar Produk </h2>
        <Grid container wrap="nowrap" spacing={3} className="product-grid">
          {menus.map(menu => (
            <Link href={menu.link} key={shortid.generate()}>
              <Grid item xs={3} align="center" className="product-item">
                <div className="product-icon">
                  <img src={menu.image} />
                </div>
                <p className="product-name"> {menu.title} </p>
              </Grid>
            </Link>
          ))}
        </Grid>
      </Paper>
    </div>
  );
};

export default index;
