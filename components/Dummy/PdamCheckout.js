import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Alert from "../../components/Transaction/PlnAlert";
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

    return (
      <>
        <Alert
          content="Sepulsa Mate, Pembayaran PDAM tidak dapat dilakukan 
          pada jam <span>23.00 - 00.30</span> WIB setiap harinya sesuai dengan 
          ketentuan dari PDAM"
        />
        <div className="section section-plntab">
          <div className="section plntab-content">
            <div className="section section-info">
              <Paper spacing={15} elevation={0} className="info-content">
                <div className="mb10">
                  <h2> Informasi Tagihan </h2>
                  <Button type="submit">Edit</Button>
                </div>
                <div>
                  <p>Nomor Pelanggan:</p>
                  <p>18471091</p>
                </div>
                <div>
                  <p>Wilayah: </p>
                  <p>PDAM Kota Bogor</p>
                </div>
                <div>
                  <p>Periode:</p>
                  <p>NOV 2019 - DES 2019 (2 Bulan)</p>
                </div>
                <div>
                  <p>Jumlah Tagihan:</p>
                  <p>Rp48.500</p>
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
