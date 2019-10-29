import React from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  nopad: {
    padding: 0
  },
  buttonRed: {
    background: "#FF5959 !important"
  }
}));

export default function SimpleTabs() {
  const classes = useStyles();
  return (
    <div className="section section-plntab">
      <div className="section plntab-content">
        <div className="section section-info">
          <Paper spacing={15} elevation={0} className="info-content">
            <div className="mb5">
              <h2> Informasi Tagihan </h2>
              <Button type="submit">Edit</Button>
            </div>
            <div>
              <p>Jenis Layanan</p>
              <p>Bussan Auto Finance</p>
            </div>
            <div>
              <p>Nomor Pelanggan</p>
              <p>8047400010001</p>
            </div>
            <div>
              <p>Nama</p>
              <p>Suryani Nani</p>
            </div>
            <div>
              <p>Angsuran ke</p>
              <p>05 dari 36</p>
            </div>
            <div>
              <p>Total Tagihan</p>
              <p>Rp516.500</p>
            </div>
          </Paper>
        </div>
        <Link href="/transaction/multifinance/info">
          <Button variant="contained" type="submit" className="button-red">
            Lanjut ke Pembayaran
          </Button>
        </Link>
      </div>
    </div>
  );
}
