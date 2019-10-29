import React, { useContext } from "react";
import { Formik, Form, withFormik } from "formik";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import yellow from "@material-ui/core/colors/yellow";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";
import EmailPhone from "../Fields/EmailPhone";
import Password from "../Fields/Password";
import { withStyles } from "@material-ui/core/styles";
import deepEqual from "lodash.isequal";
import * as Yup from "yup";
// import { inject, MobXProviderContext } from 'mobx-react'

const styles = theme => ({
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

// React Component
const SignIn = props => {
  const {
    classes,
    values,
    handleChange,
    handleSubmit,
    initialValues,
    validate
  } = props;
  const hasChanged = !deepEqual(values, initialValues);
  return (
    <div className="section section-signin">
      <div className="signup-background"></div>
      <div className="signup-top">
        <Link prefetch href="/">
          <IconButton className="signup-back">
            <ArrowBack className="profile-back" />
          </IconButton>
        </Link>
        <p className="signup-toplink">
          Belum punya akun?
          <Link prefetch href="/signup">
            <span>Daftar</span>
          </Link>
        </p>
        <h2> Halo, kami merindukanmu! </h2>
        <h3>
          {" "}
          Yuk login dengan e-mail dan nomor HP mu untuk tetap terhubung dengan
          kami :){" "}
        </h3>
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
                <EmailPhone
                  value={values.email}
                  handleChange={handleChange}
                  name="email"
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs>
                <Password
                  value={values.password}
                  handleChange={handleChange}
                  name="password"
                />
              </Grid>
            </Grid>
            <div className="signup-button">
              <Button
                variant="contained"
                type="submit"
                disabled={!hasChanged}
                className={classes.button}
                classes={{ disabled: classes.buttonDisabled }}
              >
                Masuk
              </Button>
            </div>
          </Form>
        )}
      </Formik>

      <div align="center" className="signup-bot">
        <div className="signup-icon">
          <img src="/static/login/icon-fb.svg" />
          <img src="/static/login/icon-gmail.svg" />
        </div>
      </div>

      <div className="signup-bar">
        <Link prefetch href="/">
          <p>
            Masuk sebagai
            <span>Guest</span>
          </p>
        </Link>
        <Link prefetch href="/forgot">
          <p>
            Kamu
            <span>Lupa Password?</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default withStyles(styles)(SignIn);
