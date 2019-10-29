import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  input: {
    display: "flex",
    padding: 0,
    height: "auto"
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
  },
  underline: {
    "&$error:after": {
      borderBottomColor: "#75C55C"
    },
    "&:after": {
      borderBottom: `2px solid #75C55C`
    }
  },
  placeholder: {
    color: "##f54281"
  }
});

function NoOptionsMessage(props) {
  return (
    <Typography color="textSecondary" {...props.innerProps}>
      Periode Bayar Tidak Ditemukan
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

inputComponent.propTypes = {
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any.isRequired
    })
  ])
};

function Control(props) {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { classes, TextFieldProps }
  } = props;
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        classes: { underline: classes.underline },
        inputProps: {
          className: classes.input,
          underline: classes.underline,
          ref: innerRef,
          children,
          ...innerProps
        }
      }}
      {...TextFieldProps}
    />
  );
}

Control.propTypes = {
  /**
   * Children to render.
   */
  children: PropTypes.node,
  /**
   * The mouse down event and the innerRef to pass down to the controller element.
   */
  innerProps: PropTypes.shape({
    onMouseDown: PropTypes.func.isRequired
  }).isRequired,
  innerRef: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any.isRequired
    })
  ]).isRequired,
  selectProps: PropTypes.object.isRequired
};

function Option(props) {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        color: props.isSelected ? "#707070" : "#919191"
      }}
      className={props.isSelected ? "inputnum-active" : "none"}
      {...props.innerProps}
      value={props.value}
    >
      {props.children}

      {/* <span className="inputnum-right"> {props.value} </span> */}
    </MenuItem>
  );
}

function Menu(props) {
  return (
    <Paper square className="inputnum-menu" {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

Menu.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.element.isRequired,
  /**
   * Props to be passed to the menu wrapper.
   */
  innerProps: PropTypes.object.isRequired,
  selectProps: PropTypes.object.isRequired
};

class SelectPeriodBpjs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone_number: ""
    };
    this.placeHolder = this.placeHolder.bind(this);
    this.selectedPeriod = this.selectedPeriod.bind(this);
  }

  placeHolder() {
    return (
      <Typography color="textSecondary" className="inputnum-placeholder">
        Pilih Periode Bayar
      </Typography>
    );
  }

  async selectedPeriod(e) {
    const value = e.periodValue;
    const indexMonth = value - 1;
    await this.props.updateSelectedPeriod(value, indexMonth);
  }
  render() {
    const { classes } = this.props;
    const Placeholder = this.placeHolder;
    const components = {
      Control,
      Menu,
      NoOptionsMessage,
      Option,
      Placeholder
    };
    const suggestions = this.props.listingPeriod.map(suggestion => ({
      value: suggestion.value,
      label: suggestion.value,
      periodValue: suggestion.periodValue
    }));

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
                <form className={classes.root} autoComplete="off">
                  <p> Periode Bayar </p>
                  <FormControl className="inputnum-select">
                    <Select
                      defaultValue={suggestions[this.props.indexMonthSelected]}
                      classes={classes}
                      inputId="react-select-single"
                      options={suggestions}
                      components={components}
                      onChange={e => this.selectedPeriod(e)}
                      className={classes.cssUnderline}
                    />
                  </FormControl>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(SelectPeriodBpjs);
