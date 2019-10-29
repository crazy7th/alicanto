import React from "react";
import { Formik, Form } from "formik";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import yellow from "@material-ui/core/colors/yellow";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { observer } from "mobx-react";
import {
  MuiThemeProvider,
  withStyles,
  createMuiTheme
} from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";

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
  }
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[50]
    }
  }
});

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    // email: 'test1@testuser.com',password: 'password'
    this.state = { name: "", message: "", email: "" };
    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(key) {
    return function(e) {
      var state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  }

  render() {
    const { classes } = this.props;
    const { user } = this.props.store;

    return (
      <div className="section section-signin">
        <div className="signup-background" />
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
          enableReinitialize={true}
          initialValues={{
            email: this.state.email,
            password: this.state.password
          }}
          validate={values => {
            let errors = { user: {} };
            const userFields = ["full_name", "email", "password"];
            userFields.map(i => {
              if (!values.user[i]) errors.user[i] = "Required";
            });
            if (!values.phone) errors.phone = "Required";
            if (
              errors.user.email.length === 0 &&
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.user.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            const { user } = this.props.store;
            user.doLogin(values).then(() => {
              // alert('a name was subbed: ' + this.state.value);
              // event.preventDefault();
            });
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="signup-form">
              <Grid container>
                <Grid item xs>
                  <p>Nomor Handphone / Email </p>
                  <img src="/static/login/icon-user.svg" />
                  <Input
                    type="phone"
                    name="phone"
                    fullWidth
                    value={this.state.email}
                    onChange={this.handleChange("email")}
                    classes={{
                      underline: classes.cssUnderline
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs>
                  <p>Password</p>
                  <img src="/static/login/icon-password.svg" />
                  <Input
                    type="password"
                    name="password"
                    fullWidth
                    value={this.state.password}
                    onChange={this.handleChange("password")}
                    classes={{
                      underline: classes.cssUnderline
                    }}
                  />
                </Grid>
              </Grid>
              <div className="signup-button">
                <MuiThemeProvider theme={theme}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={(!this.state.email, !this.state.password)}
                  >
                    Masuk
                  </Button>
                </MuiThemeProvider>
              </div>
            </Form>
          )}
        </Formik>

        <div align="center" className="signup-bot">
          <div className="signup-icon">
            <span>{`Atau masuk dengan token: ${user.access_token}`}</span>
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
  }
}

export default withStyles(styles)(observer(SignInForm));
