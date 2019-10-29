// Render Prop
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import { withStyles } from "@material-ui/core/styles";
import yellow from "@material-ui/core/colors/yellow";
import Input from "@material-ui/core/Input";
import deepEqual from "lodash.isequal";

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

const ForgotPass = props => {
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
        <img src="/static/login/icon-lock.svg" />
        <h2> Lupa Password? </h2>
        <p>
          {" "}
          Tenang, jangan panik..kamu bisa buat password baru lagi kok. Kami
          bantu ya :)
        </p>
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
                <p>Nomor Handphone / Email </p>
                <img src="/static/login/icon-user.svg" />
                <Input
                  type="text"
                  autoFocus
                  fullWidth
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  classes={{
                    underline: classes.cssUnderline
                  }}
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
        <Link prefetch href="/signup">
          <span> Register </span>
        </Link>
      </div>
    </div>
  );
};

export default withStyles(styles)(ForgotPass);
