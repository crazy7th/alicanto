import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    color: "#FF5959 !important",
    background: "white"
  },
  buttonDisabled: {
    color: "white !important"
  },
  buttonRed: {
    background: "#FF5959 !important"
  }
});

class BpjsKesehatanCheckout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showFirst: true
    };
  }

  render() {
    const { classes } = this.props;
    const { showFirst } = this.state;
    return (
      <>
        {showFirst && (
          <div className="section section-plnwarning mt0">
            <p>
              Sepulsa Mate, Pembayaran Bayar BPJS Kesehatan tidak dapat
              dilakukan pada jam <span> 23.00 - 00.30</span> WIB setiap harinya
              sesuai dengan ketentuan dari BPJS Kesehatan
            </p>
            <img
              src="/static/transaction/icon-close-red.svg"
              onClick={() => this.setState({ showFirst: false })}
            />
          </div>
        )}

        <div className="section section-plntab">
          <div className="section plntab-content">
            <div className="section section-info">
              <Paper spacing={15} elevation={0} className="info-content">
                <div className="mb10">
                  <h2> Informasi Tagihan </h2>
                  <Button type="submit">Edit</Button>
                </div>
                <div>
                  <p>Nama Pelanggan:</p>
                  <p>Ramdhan Abdul (PST 2)</p>
                </div>
                <div>
                  <p>Nomor BPJS:</p>
                  <p>00000012345678910</p>
                </div>
                <div>
                  <p>Periode:</p>
                  <p>SEPT 19 - OKT 19 / 2 Bulan</p>
                </div>
                <div>
                  <p>Total Peserta:</p>
                  <p>2</p>
                </div>
                <div>
                  <p>Jumlah Tagihan:</p>
                  <p>Rp51.001</p>
                </div>
                <div>
                  <p>Biaya Admin:</p>
                  <p> Rp2.500</p>
                </div>
                <div>
                  <p>Total:</p>
                  <p>Rp53.501</p>
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
}

export default withStyles(styles, { withTheme: true })(BpjsKesehatanCheckout);
