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

class BpjsKesehatanEmpty extends Component {
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
              dilakukan pada jam <span> 23.00 - 00.30 WIB</span> setiap harinya
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
            <div className="plntab-image">
              <img src="/static/transaction/img-bpjs2.svg" />
              <p>Tagihan Anda sudah lunas atau belum tersedia</p>
            </div>

            <Button variant="contained" type="submit" className="button-red">
              Bayar yang lain
            </Button>
          </div>
        </div>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(BpjsKesehatanEmpty);
