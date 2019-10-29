import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import green from "@material-ui/core/colors/green";

const suggestions = [
  { label: "Zona 1 - Jakarta" },
  { label: "Zona 2 - Jakarta " },
  { label: "Zona 3 - Jakarta" },
  { label: "Zona 4 - Jakarta" },
  { label: "Zona 5 - Jakarta " },
  { label: "Zona 6 - Jakarta" },
  { label: "Zona 7 - Jakarta" },
  { label: "Zona 8 - Jakarta" }
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label
}));

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  input: {
    display: "flex",
    padding: 0,
    height: "auto"
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden"
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
  }
}));

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

NoOptionsMessage.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  /**
   * Props to be passed on to the wrapper.
   */
  innerProps: PropTypes.object.isRequired,
  selectProps: PropTypes.object.isRequired
};

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
    >
      {props.children}
    </MenuItem>
  );
}

Option.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  /**
   * props passed to the wrapping element for the group.
   */
  innerProps: PropTypes.shape({
    id: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    onMouseMove: PropTypes.func.isRequired,
    onMouseOver: PropTypes.func.isRequired,
    tabIndex: PropTypes.number.isRequired
  }).isRequired,
  /**
   * Inner ref to DOM Node
   */
  innerRef: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any.isRequired
    })
  ]).isRequired,
  /**
   * Whether the option is focused.
   */
  isFocused: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired
};

function Placeholder(props) {
  const { selectProps, innerProps = {}, children } = props;
  return (
    <Typography
      color="textSecondary"
      className="inputnum-placeholder"
      {...innerProps}
    >
      {children}
    </Typography>
  );
}

Placeholder.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  /**
   * props passed to the wrapping element for the group.
   */
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired
};

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

SingleValue.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.any.isRequired,
  selectProps: PropTypes.object.isRequired
};

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

ValueContainer.propTypes = {
  children: PropTypes.node,
  selectProps: PropTypes.object.isRequired
};

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

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
};

export default function IntegrationReactSelect() {
  const classes = useStyles();
  const theme = useTheme();
  const [single, setSingle] = React.useState(null);

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChangeSingle = value => {
    setSingle(value);
  };

  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      "& input": {
        font: "inherit"
      }
    })
  };

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
              <p className="inputnum-title2"> Pilih Kota / Wilayah Kamu </p>
              <img
                src="/static/transaction/icon-alert-red.svg"
                className="inputnum-alert"
                onClick={handleDrawerOpen}
              />
              <form className={classes.root} autoComplete="off">
                <FormControl className="inputnum-select">
                  <Select
                    classes={classes}
                    styles={selectStyles}
                    inputId="react-select-single"
                    placeholder="Pilih kota"
                    options={suggestions}
                    components={components}
                    value={single}
                    onChange={handleChangeSingle}
                    className={classes.cssUnderline}
                  />
                </FormControl>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Drawer
        anchor="bottom"
        open={open}
        onClick={handleDrawerClose}
        className="prod-info"
        elevation={0}
      >
        <div tabIndex={0} role="button">
          <div className="prod-info__content">
            <img
              className="prod-info__close"
              src="/static/transaction/icon-close.svg"
              onClick={handleDrawerClose}
            />
            <img src="/static/transaction/icon-maps.svg" />
            <p className="prod-info__content-title"> Info </p>
            <p className="prod-info__content-middle">
              Terhitung Desember 2016 Telkomsel menerapkan tarif paket data
              berdasarkan zona wilayah
            </p>
            <p className="prod-info__content-bottom">
              Jika zona wilayah Kamu tidak tertera, silakan pilih zona yang
              terdekat dengan wilayah Kamu
            </p>
          </div>
          <div className="prod-info__bottom">
            <Button variant="contained" fullWidth>
              <p className="MuiButton-label" style={{ color: "white" }}>
                Mengerti
              </p>
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
