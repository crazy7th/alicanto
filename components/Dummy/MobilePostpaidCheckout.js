import React from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
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
    background: "#FF5959"
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
              <p>Nomor:</p>
              <p>081220996699</p>
            </div>
            <div>
              <p>Nama:</p>
              <p>IR XXXXXXXXXXXXXXXXXXXX MM</p>
            </div>
            <div>
              <p>Periode:</p>
              <p>SEP 2019</p>
            </div>
            <div>
              <p>Jumlah Tagihan:</p>
              <p>Rp100.000</p>
            </div>
            <div>
              <p>Admin:</p>
              <p>Rp2.500</p>
            </div>
            <div>
              <p>Total Tagihan:</p>
              <p> Rp102.500 </p>
            </div>
          </Paper>
        </div>
        <Button variant="contained" type="submit" className={classes.buttonRed}>
          Lanjut ke Pembayaran
        </Button>
      </div>
    </div>
  );
}
