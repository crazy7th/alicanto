import React, { Component } from 'react'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import yellow from '@material-ui/core/colors/yellow'

const styles = theme => (
  {
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
)

class Password extends Component {
  state = { showPassword: false, }
  
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  }

  render() {
    const { classes, handleChange, value, name } = this.props;

    return (
      <span>
        {/* <p>Password</p> */}
        {/* <img src="/static/login/icon-password.svg" /> */}
        <Input
          fullWidth
          classes={{
            underline: classes.cssUnderline,
          }}
          type={this.state.showPassword ? 'text' : 'password'}
          value={value}
          onChange={handleChange}
          name={name}
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
      </span>
    )
  }
}

// export default Password
export default withStyles(styles)(Password);