// Render Prop
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import OtpInput from "react-otp-input";
import Link from "next/link";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ReactDOM from "react-dom";
import Countdown from "react-countdown-now";
import deepEqual from "lodash.isequal";
import { withStyles } from "@material-ui/core/styles";
import { inject } from "mobx-react";
import * as Status from "http-status-codes";
import Router from "next/router";

const styles = theme => ({
  cssFocused: {},
  button: {
    color: "red !important",
    background: "white"
  },
  buttonDisabled: {
    color: "white !important"
  }
});

// Random component
const Completionist = () => (
  <span className="verification-link">Ulang Kirim OTP </span>
);

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <p>
        {" "}
        Mohon tunggu <span>{seconds} detik </span> untuk kirim ulang
      </p>
    );
  }
};

@inject("userStore")
class OTP extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      otp: "",
      identity: []
    };
    this.otpChange = this.otpChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getInitialState() {
    return { otp: "" };
  }

  async otpChange(event) {
    // console.warn("cek event terget", event);
    await this.setState({
      otp: event
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const localStorageCart = localStorage.getItem("identity");
    await this.setState({ identity: JSON.parse(localStorageCart) });
    const data = {
      email: this.state.identity.user.email,
      password: this.state.identity.user.password
    };

    if (this.state.otp == 1234) {
      const { authenticate } = this.props.userStore;
      const status = await authenticate(data);
      Router.push("/indexlogin");
      localStorage.removeItem("identity");
    } else {
      alert("Kode OTP anda salah, masukkan kembali kode OTP");
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="section section-signin">
        <div className="signup-background" />
        <div className="forgot-top" align="left">
          <Link prefetch href="/">
            <IconButton className="signup-back">
              <ArrowBack className="profile-back" />
            </IconButton>
          </Link>

          <h2> Masukkan Kode Verifikasi </h2>
          <h3>
            {" "}
            Supaya kami tahu ini benar-benar kamu, yuk masukkan 4 angka kode
            verifikasi yang kami kirimkan ke nomor 083456789120{" "}
          </h3>
        </div>
        <br />

        <Form
          className="signup-form verification-form"
          onSubmit={this.handleSubmit}
        >
          <Grid container>
            <Grid item xs>
              <OtpInput
                numInputs={4}
                containerStyle="verification-otp"
                separator={<span> </span>}
                id="otp"
                name="otp"
                value={this.state.otp}
                onChange={this.otpChange}
              />
            </Grid>
          </Grid>

          <div className="verification-bottom" align="center">
            <br />
            <p>Tidak menerima kode verifikasi?</p>
            <Countdown date={Date.now() + 30000} renderer={renderer} />
          </div>

          <div className="signup-button">
            <Button
              variant="contained"
              type="submit"
              disabled={!this.state.otp}
              className={classes.button}
              classes={{ disabled: classes.buttonDisabled }}
            >
              Selanjutnya
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default withStyles(styles)(OTP);
