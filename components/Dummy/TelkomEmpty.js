import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Alert from "./TelkomAlert";

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

class TelkomEmpty extends Component {
  render() {
    const { classes } = this.props;
    return (
      <>
        <Alert />

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

export default withStyles(styles, { withTheme: true })(TelkomEmpty);
