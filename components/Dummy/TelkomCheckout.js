import React from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "./TelkomAlert";

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

export default function TelkomCheckout() {
  const classes = useStyles();
  return (
    <>
      <Alert />
      <div className="section section-plntab">
        <div className="section plntab-content">
          <div className="section section-info">
            <Paper spacing={15} elevation={0} className="info-content">
              <div className="mb5">
                <h2> Informasi Tagihan </h2>
                <Button type="submit">Edit</Button>
              </div>
              <div>
                <p>Nama Pelanggan:</p>
                <p>Ghifari Pohan</p>
              </div>
              <div>
                <p>Nomor Telkom:</p>
                <p>02517556111</p>
              </div>
              <div>
                <p>Periode:</p>
                <p>SEPT 2019</p>
              </div>
              <div>
                <p>Jumlah Tagihan:</p>
                <p>Rp35.000</p>
              </div>
              <div>
                <p>Biaya Admin:</p>
                <p>RP1.500</p>
              </div>
              <div>
                <p>Total:</p>
                <p>Rp36.500</p>
              </div>
            </Paper>
          </div>
          <Button variant="contained" type="submit" className="button-red">
            Lanjut ke Pembayaran
          </Button>
        </div>
      </div>
    </>
  );
}
