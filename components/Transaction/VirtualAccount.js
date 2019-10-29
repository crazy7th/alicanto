import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import grey from "@material-ui/core/colors/grey";
import red from "@material-ui/core/colors/red";
import Countdown from "react-countdown-now";

const styles = theme => ({
  root: {
    width: "100%"
  }
});

const bgred = {
  background: red[400],
  color: grey[50],
  border: "unset"
};

// Random component
const Completionist = () => <span className="verification-link">resend </span>;

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <div className="va-desc">
        <div>
          <p> {hours} </p>
          <p className="va-desctime"> Jam </p>
        </div>
        <span> : </span>
        <div>
          <p> {minutes} </p>
          <p className="va-desctime">Menit </p>
        </div>
        <span> : </span>
        <div>
          <p> {seconds} </p>
          <p className="va-desctime">Detik </p>
        </div>
      </div>
    );
  }
};

class SuccessTransaction extends React.Component {
  render() {
    return (
      <div>
        <div className="section section-va">
          <p className="va-status">Pending</p>
          <div className="va-detail">
            <div>
              <p>Tanggal:</p>
              <p> 15/03/2019 11:35 </p>
            </div>
            <div>
              <p> Order ID: </p>
              <p> 8063635 </p>
            </div>
            <div>
              <p> Metode Pembayaran: </p>
              <p> Virtual Account Semua Bank </p>
            </div>
          </div>
          <div className="va-card">
            <div className="va-circle" />
            <p> Mohon lakukan pembayaran dalam waktu </p>
            <div className="va-time">
              <Countdown date={Date.now() + 13330000} renderer={renderer} />
            </div>
            <p>
              Sebelum <b>pukul 13.00 WIB</b>
            </p>
          </div>
          <div className="va-desccard">
            <p className="va-transaksi">
              Transaksi Pembayaran ke nomor Rekening
            </p>
            <p className="va-an">A.N: PT Sepulsa Teknologi Indonesia</p>
            <div className="va-info">
              <div className="info-left">
                <img src="/static/transaction/logo-bca.svg" />
                <p> 1027 3362 3044 111 </p>
              </div>
              <div className="info-right">
                <p> Salin </p>
              </div>
            </div>
          </div>
        </div>

        <div className="section section-vacard">
          <ExpansionPanel elevation={0} className="success-pay">
            <ExpansionPanelSummary
              className="va-expand va-pink"
              expandIcon={<ExpandMoreIcon />}
            >
              <div>
                <h2>Detail Pembayaran</h2>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="va-desc">
              <div className="va-item">
                <p className="va-left">Nama Produk </p>
                <p className="va-right">aaaa</p>
              </div>
              <div className="va-item">
                <p className="va-left">Nomor Handphone </p>
                <p className="va-right">021039123</p>
              </div>
              <div className="va-item">
                <p className="va-left">Harga </p>
                <p className="va-right">Rp12312312321</p>
              </div>
              <div className="va-item">
                <p className="va-left">Biaya Admin </p>
                <p className="va-right">0</p>
              </div>
              <div className="va-item">
                <p className="va-left">Total Harga </p>
                <p className="va-right">Rp13123123123</p>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanelDetails className="va-desc">
            <div className="va-left">
              <p className="va-sisa"> Sisa yang harus dibayar </p>
              <p className="va-denom"> Rp45.000 </p>
            </div>
            <div className="va-right">
              <p>Salin</p>
            </div>
          </ExpansionPanelDetails>
        </div>

        <div className="section section-vacard">
          <ExpansionPanel elevation={0} className="success-pay">
            <ExpansionPanelSummary
              className="va-expand"
              expandIcon={<ExpandMoreIcon />}
            >
              <div>
                <h2>
                  Pembayaran Melalui <span> ATM BCA </span>
                </h2>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="va-desc">
              <div className="va-left">
                <p className="va-sisa"> Sisa yang harus dibayar </p>
                <p className="va-denom"> Rp45.000 </p>
              </div>
              <div className="va-right">
                <p>Salin</p>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>

        <div className="section section-vacard">
          <ExpansionPanel elevation={0} className="success-pay">
            <ExpansionPanelSummary
              className="va-expand"
              expandIcon={<ExpandMoreIcon />}
            >
              <div>
                <h2>
                  Pembayaran Melalui <span> Klik BCA </span>
                </h2>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="va-desc">
              <div className="va-left">
                <p className="va-sisa"> Sisa yang harus dibayar </p>
                <p className="va-denom"> Rp45.000 </p>
              </div>
              <div className="va-right">
                <p>Salin</p>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>

        <div className="section section-vacard">
          <ExpansionPanel elevation={0} className="success-pay">
            <ExpansionPanelSummary
              className="va-expand"
              expandIcon={<ExpandMoreIcon />}
            >
              <div>
                <h2>
                  Pembayaran Melalui <span> m-BCA </span>
                </h2>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="va-desc">
              <div className="va-left">
                <p className="va-sisa"> Sisa yang harus dibayar </p>
                <p className="va-denom"> Rp45.000 </p>
              </div>
              <div className="va-right">
                <p>Salin</p>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>

        <div className="section section-vacard">
          <div className="va-back">
            <Button
              variant="contained"
              elevation={0}
              style={bgred}
              fullWidth
              size="large"
              className="success-button2"
            >
              Kembali ke Beranda
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

SuccessTransaction.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SuccessTransaction);
