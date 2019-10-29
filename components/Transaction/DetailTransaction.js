import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  root: {
    width: "100%"
  }
});

class DetailTransaction extends React.Component {
  render() {
    return (
      <div className="section section-detailtrans">
        <ExpansionPanel
          className="detailtrans-expand"
          elevation={0}
          defaultExpanded
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className="">
              <h2>Detail Pembayaran</h2>
            </div>
          </ExpansionPanelSummary>
          {/* call cart detail */}
          {this.props.cartDetail !== "" ? this.props.displayCart() : ""}
        </ExpansionPanel>

        <ExpansionPanelDetails className="detailtrans-bot">
          <div className="detailtrans-left">
            <p> Total Pembayaran </p>
          </div>
          <div className="detailtrans-right">
            <p>
              Rp
              {this.props.totalPriceOrder
                .toString()
                .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.")}
            </p>
          </div>
        </ExpansionPanelDetails>
        <ExpansionPanelDetails className="detailtrans-promo">
          <p>Apakah kamu punya kode promosi?</p>
          <div className="detailtrans-input">
            <TextField
              type="email"
              name="user.email"
              className="detailtrans-input2"
              variant="outlined"
              placeholder="Kode Promo"
            />
            <Button
              variant="contained"
              size="medium"
              className="detailtrans-button"
            >
              Gunakan
            </Button>
          </div>
        </ExpansionPanelDetails>
      </div>
    );
  }
}

DetailTransaction.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DetailTransaction);
