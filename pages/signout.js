import React, { Component } from "react";
import { inject } from "mobx-react";

class SignOut extends React.Component {
  state = {
    isLoading: true,
    users: [],
    error: null
  };

  render() {
    const { logout } = this.props.userStore;
    let { token } = this.props.userStore;
    token = token.access ? token.access : this.props.token;
    logout(token);

    return <div>{/* token: { token } */}</div>;
  }
}

export default inject("userStore")(SignOut);
