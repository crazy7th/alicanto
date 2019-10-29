import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Link from "next/link";
import SignInHalf from "../Form/SignInHalf";

const styles = {
  root: {
    color: "grey",
    fill: "grey",
    "&$selected": {
      color: "red",
      fill: "red"
    }
  },
  selected: {}
};

class HistoryTransaction extends React.Component {
  render() {
    return (
      <div className="section section-post">
        <h2> Transaksi Sebelumnya </h2>
        <Paper elevation={0} className="post-base">
          <Grid container wrap="nowrap" spacing={2} alignItems="center">
            <Grid item>
              <img src={this.props.imageProduct} />
            </Grid>
            <Grid item xs>
              <p className="post-date">08/03//2019 13:41</p>
              <p className="post-number">08123456789</p>
              <p>Rp50.000</p>
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={0} className="post-base">
          <Grid container wrap="nowrap" spacing={2} alignItems="center">
            <Grid item>
              <img src={this.props.imageProduct} />
            </Grid>
            <Grid item xs>
              <p className="post-date"> 08/03//2019 13:41</p>
              <p className="post-number">08123456789</p>
              <p>Rp50.000</p>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

HistoryTransaction.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HistoryTransaction);
