import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import green from "@material-ui/core/colors/green";
import Input from "@material-ui/core/Input";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import HighlightOff from "@material-ui/icons/HighlightOff";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing.unit
  },
  cssLabel: {
    "&$cssFocused": {
      color: "#75C55C"
    }
  },
  cssFocused: {},
  cssUnderline: {
    "&:after": {
      borderBottomColor: "#75C55C"
    }
  }
});

class InputCustomerId extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className="section section-inputnum">
        <Paper elevation={0} className="inputnum-base">
          <Grid
            container
            wrap="nowrap"
            className="inputnum-grid"
            alignItems="center"
          >
            <Grid container>
              <Grid item xs>
                <p>{this.props.labelInput}</p>
                <Input
                  type="text"
                  fullWidth
                  name={this.props.name}
                  classes={{
                    underline: classes.cssUnderline
                  }}
                  placeholder={this.props.placeHolder}
                  value={this.props.inputNumber}
                  onChange={e => this.props.changeCustomerInput(e)}
                  error={this.props.errorValidation}
                  id={this.props.id}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility "
                        onClick={this.props.clearInput}
                        disableRipple
                        className="inputnum-clear"
                      >
                        {this.props.statusClear ? (
                          <HighlightOff
                            style={{
                              maxHeight: "18px",
                              color: "red",
                              float: "right !important",
                              padding: `${this.props.padding}`
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {this.props.textError ? this.props.textError() : ""}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

InputCustomerId.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InputCustomerId);
