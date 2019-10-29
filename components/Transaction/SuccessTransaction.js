import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import Lottie from "react-lottie";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import grey from "@material-ui/core/colors/grey";
import red from "@material-ui/core/colors/red";
import animationData from "../../static/animation/success.json";

const styles = theme => ({
  root: {
    width: "100%"
  }
});

const bgwhite = {
  background: grey[50]
};
const bgred = {
  background: red[400],
  color: grey[50],
  border: "unset"
};

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

class SuccessTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.deleteLocalStorage = this.deleteLocalStorage.bind(this);
  }

  /**
   * Function to delete local storage
   * @return none
   */
  async deleteLocalStorage() {
    await localStorage.removeItem("cart");
    Router.push("/indexlogin");
  }
  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <div className="section section-success">
          <div className="success-animation">
            <Lottie options={defaultOptions} />
          </div>

          <div className="success-text">
            <p className="success-text1">
              {/* Hi Ekky Patria <br /> */}
              Terima kasih sudah bertransaksi di Sepulsa
            </p>
            <p className="success-text2">
              Pesanan kamu akan segera diproses sebentar lagi
            </p>
            <p className="success-text3">Kamu bisa melihat status pesanan di</p>
          </div>

          <Button
            variant="contained"
            elevation={0}
            fullWidth
            size="large"
            className="success-button"
          >
            Riwayat Transaksi
          </Button>

          <ExpansionPanel elevation={0} defaultExpanded className="success-pay">
            <ExpansionPanelSummary
              className="success-expand"
              expandIcon={<ExpandMoreIcon />}
            >
              <div>
                <h2>Detail Pembayaran</h2>
              </div>
            </ExpansionPanelSummary>

            {/* call detail order */}
            {this.props.displayDetailOrder()}
          </ExpansionPanel>

          {/* call total order */}
          {this.props.displayTotalOrder()}

          <div className="success-back">
            <Button
              variant="contained"
              elevation={0}
              style={bgred}
              fullWidth
              size="large"
              className="success-button2"
              onClick={this.deleteLocalStorage}
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
