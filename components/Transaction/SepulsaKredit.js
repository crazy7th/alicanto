import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";

const title = {
  marginBottom: "10px",
  fontWeight: "bold"
};

const styles = theme => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1)
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#52d869",
        opacity: 1,
        border: "none"
      }
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff"
    }
  },
  thumb: {
    width: 26,
    height: 23
  },
  track: {
    height: 24,
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"])
  },
  colorPrimary: {
    backgroundColor: "red"
  },
  colorSecondary: {
    backgroundColor: "blue"
  },
  checked: {},
  focusVisible: {}
});

class Method extends React.Component {
  state = {
    checkedA: true,
    checkedB: true
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className="section">
        <h2 style={title}>Pilih Metode Pembayaran</h2>
        <div className=" section-method">
          <Paper elevation={0} className="method-base">
            <Grid container wrap="nowrap" spacing={2} alignItems="center">
              <Grid item className="method-left">
                <img src="/static/homepage/wallet.svg" />
              </Grid>
              <Grid item className="method-center">
                <p className="method-top">Sepulsa Kredit (Rp0)</p>
                <p className="method-bot">
                  Kamu boleh pilih,mau bayar pakai ini atau nggak
                </p>
              </Grid>
              <Grid item className="method-right">
                <Switch
                  focusVisibleClassName={classes.focusVisible}
                  disableRipple
                  classes={{
                    root: classes.root,
                    switchBase: classes.switchBase,
                    thumb: classes.thumb,
                    track: classes.track,
                    checked: classes.checked
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </div>
      </div>
    );
  }
}

Method.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Method);
