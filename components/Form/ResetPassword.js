// Render Prop
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField } from "formik-material-ui";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import getConfig from "next/config";
import yellow from "@material-ui/core/colors/yellow";
import Input from "@material-ui/core/Input";
import deepEqual from "lodash.isequal";
import Password from "../Fields/PasswordReset";

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

const Reset = props => {
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
    <div className="section-signin section-forgot">
      <div className="signup-background"></div>
      <div className="forgot-top" align="center">
        <h2> Ganti Password </h2>
        <p>
          {" "}
          Kamu akan mengganti password kamu dengan yang baru. Buat yang beda
          dari password yang lama ya.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="signup-form forgot-form">
            <Grid container>
              <Grid item xs>
                <p>Password Baru </p>
                <Password
                  value={values.password}
                  handleChange={handleChange}
                  name="password"
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs>
                <p>Konfirmasi Password</p>
                <Password
                  classes={{
                    underline: classes.cssUnderline
                  }}
                  value={values.confirmPassword}
                  handleChange={handleChange}
                  name="confirmPassword"
                />
              </Grid>
            </Grid>
            <div className="signup-button">
              <Button
                variant="contained"
                // color="primary"
                type="submit"
                disabled={!hasChanged}
                className={classes.button}
                classes={{ disabled: classes.buttonDisabled }}
              >
                Lanjutkan
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="forgot-bottom" align="center">
        <p>Tidak punya Account?</p>
        <span> Register </span>
      </div>
    </div>
  );
};

export default withStyles(styles)(Reset);
