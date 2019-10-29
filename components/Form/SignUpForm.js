// Render Prop
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField } from "formik-material-ui";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import deepEqual from "lodash.isequal";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import yellow from "@material-ui/core/colors/yellow";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Password from "../Fields/Password";
import Phone from "../Fields/Phone";
// import Checkbox from "../Fields/CheckboxSignUp";
// import Checkbox from "@material-ui/core/Checkbox";

const { publicRuntimeConfig } = getConfig();

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
      color: yellow[500]
    }
  },
  cssFocused: {},
  cssUnderline: {
    "&:before": {
      borderBottomColor: "white !important"
    },
    "&:after": {
      borderBottomColor: yellow[500]
    }
  },
  button: {
    color: "red !important",
    background: "white"
  },
  buttonDisabled: {
    color: "white !important"
  }
});

const SignUp = props => {
  const {
    classes,
    values,
    handleChange,
    handleSubmit,
    initialValues,
    validate
  } = props;

  const [state, setState] = React.useState({
    checkedA: false
  });

  const handleChange2 = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };
  const hasChanged = !deepEqual(values, initialValues);
  return (
    <div className="section section-signup">
      <div className="signup-background" />
      <div className="signup-top">
        <Link prefetch href="/">
          <IconButton className="signup-back">
            <ArrowBack className="profile-back" />
          </IconButton>
        </Link>

        <p className="signup-toplink">
          Sudah punya akun?
          <Link prefetch href="/signin">
            <span>Masuk</span>
          </Link>
        </p>

        <h2> Halo, kenalan dulu yuk! </h2>
        <h3> Buat akun Sepulsa kamu dulu ya biar kita semakin dekat </h3>
      </div>

      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="signup-form">
            <Grid container>
              <Grid item xs>
                <p>Nama Lengkap</p>
                <img src="/static/login/icon-user.svg" />
                <Input
                  type="text"
                  autoFocus
                  fullWidth
                  name="user.full_name"
                  value={values.user.full_name}
                  onChange={handleChange}
                  classes={{
                    underline: classes.cssUnderline
                  }}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs>
                <p>Email </p>
                <img src="/static/login/icon-mail.svg" />
                <Input
                  type="email"
                  fullWidth
                  name="user.email"
                  value={values.user.email}
                  onChange={handleChange}
                  classes={{
                    underline: classes.cssUnderline
                  }}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs>
                <Phone
                  name="phone"
                  value={values.password}
                  handleChange={handleChange}
                />
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs>
                <Password
                  name="user[password]"
                  value={values.password}
                  handleChange={handleChange}
                />
              </Grid>
            </Grid>

            <div className="signup-formcheck">
              {/* <Checkbox /> */}
              {/* <Checkbox
                checked={state.checkedA}
                onChange={handleChange2("checkedA")}
                // value="checkedA"
                name="user[password]"
                value={values.password}
                handleChange={handleChange}
                className="signup-check"
                inputProps={{
                  "aria-label": "primary checkbox"
                }}
              /> */}
              <br className="signup-check" />
              <p>
                Dengan mencentang kotak di samping ini, Saya menyetujui
                Ketentuan Layanan dan Kebijakan Privasi yang berlaku.
              </p>
            </div>

            <div className="signup-button">
              <Button
                variant="contained"
                // color="primary"
                type="submit"
                disabled={!hasChanged}
                className={classes.button}
                classes={{ disabled: classes.buttonDisabled }}
              >
                Daftar
              </Button>
            </div>
          </Form>
        )}
      </Formik>

      <div align="center" className="signup-bot">
        <div className="signup-text">
          <p className="signup-line"> Atau Masuk Dengan </p>
        </div>
        <div className="signup-icon">
          <img src="/static/login/icon-fb.svg" />
          <img src="/static/login/icon-gmail.svg" />
        </div>
      </div>
    </div>
  );
};

// export default SignUp
export default withStyles(styles)(SignUp);
