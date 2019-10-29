// Render Prop
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Link from 'next/link'

import PropTypes from "prop-types"
import { withStyles } from '@material-ui/core/styles'
import getConfig from 'next/config'
import yellow from '@material-ui/core/colors/yellow'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'

const { publicRuntimeConfig } = getConfig()

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  cssLabel: {
    '&$cssFocused': {
      color: yellow[500],
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:before': {
      borderBottomColor: 'white !important',
    },
    '&:after': {
      borderBottomColor: yellow[500],
    },
  }
}
);


class SignHalf extends React.Component{
  state = {
    password: '',
    showPassword: false,
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
  const { classes } = this.props;
  return (

<div className="section-signin">
  <div className="signup-background"></div>
    <div className="signup-top">
      <div className="signup-register">
      <img src="/static/login/icon-close.svg" />
      
        <p className="signup-toplink"> 
          Belum punya akun?
          <Link prefetch  href="/signup">
            <span>
              Daftar
            </span>
          </Link>
        </p>
      </div>
      
      <h2> Halo, kami merindukanmu! </h2>
        <h3> Yuk login dengan e-mail dan nomor HP mu untuk tetap 
        terhubung dengan kami :) </h3>
    </div>

    <Formik
      initialValues={{ username: '', password: '' }}
      validate={values => {
        let errors = {}
        return errors
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          setSubmitting(false)
        }, 400)
      }}
    >
      {({ isSubmitting }) => (
        <Form className="signup-form">
          <Grid container>
            <Grid item xs>
              <p>Nomor Handphone / Email </p>
              <img src="/static/login/icon-user.svg" />
              <Input type="phone" name="phone" autoFocus fullWidth 
              classes={{
                underline: classes.cssUnderline,
              }}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs>
            <p>Password</p>
              <img src="/static/login/icon-password.svg" />
              <Input
              fullWidth
              classes={{
                underline: classes.cssUnderline,
              }}
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.password}
              onChange={this.handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton className="signup-pass" >
                    <img 
                        src={this.state.showPassword ? '/static/login/icon-eye2.svg' : ' /static/login/icon-eye.svg'}
                        onClick={this.handleClickShowPassword}
                      />
                    </IconButton>
                </InputAdornment>
              }
            />
            </Grid>
          </Grid>
          <div className="signup-button">
            <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
              Masuk
            </Button>
          </div>
        </Form>
      )}
    </Formik>

    <div align="center" className="signup-bot">
      <span> Atau masuk dengan</span>
      <div className="signup-icon">
        <img src="/static/login/icon-fb.svg" />
        <img src="/static/login/icon-gmail.svg" />
      </div>
    </div>

    <div className="signup-bar">
      <Link prefetch  href="/">
        <p>
          Masuk sebagai 
            <span>
                Guest
            </span>
        </p>
      </Link>
      <Link prefetch  href="/forgot"> 
        <p>
          Kamu
            <span>
              Lupa Password?
            </span>
        </p>
      </Link>
    </div>
  </div>
  );
}
}


SignHalf.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignHalf);
