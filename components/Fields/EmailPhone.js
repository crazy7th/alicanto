import React, { Component } from "react";
import Input from "@material-ui/core/Input";
import { withStyles } from "@material-ui/core/styles";
import yellow from "@material-ui/core/colors/yellow";

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

class EmailPhone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: ""
    };
    this.changeInput = this.changeInput.bind(this);
  }

  changeInput(e) {
    this.setState({ email_err: false });
    let state = {};
    const allowed = e.target.value.replace(/[^\w\@\+\.]+/g, "");
    // found on 1st letter
    let converted = '';
    if (allowed && allowed.indexOf('+') == 0) {
      converted = allowed.replace(/^(\+62)/, "0").trim();
    } else {
      converted = allowed.replace(/^(62)/, "0").trim();
    }
    state[e.target.name] = converted;
    this.setState(state);
  }

  render() {
    const { classes, handleChange, value, handleBlur, name } = this.props;

    return (
      <span>
        <p>Nomor Handphone / Email </p>
        <img src="/static/login/icon-user.svg" />

        <Input
          type="phone"
          fullWidth
          value={value}
          // onChange={handleChange}
          onChange={e => {
            handleChange(e);
            this.changeInput(e);
          }}
          value={this.state.email}
          // onChange = {(e) => { this.changeInput(e) }}
          name={name}
          id={name}
          onBlur={handleBlur}
          classes={{
            underline: classes.cssUnderline
          }}
        />
      </span>
    );
  }
}

// export default Password
export default withStyles(styles)(EmailPhone);
