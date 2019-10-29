import React from "react";
import { withStyles } from "@material-ui/core/styles";

/* Appbar */
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SvgIcon from "@material-ui/core/SvgIcon";
import Router from "next/router";

/* End Appbar */
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

const linkStyle = {
  marginRight: 15
};

class ButtonAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.changeRouter = this.changeRouter.bind(this);
  }

  changeRouter() {
    const routeUrl = this.props.routerBack;
    if (routeUrl === undefined) {
      Router.back();
    } else {
      Router.push(routeUrl);
    }
  }
  render() {
    return (
      <div className="headertrans">
        <AppBar position="static" className="headertrans-bg" elevation={0}>
          <Toolbar className="">
            <div className={this.props.disable}>
              <IconButton className="header-icon" onClick={this.changeRouter}>
                <img src="/static/transaction/icon-back.svg" />
              </IconButton>
            </div>
            <div style={styles.grow}>
              <h1>{this.props.header}</h1>
            </div>
            <IconButton className="header-icon">
              <img src="/static/transaction/icon-help.svg" />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(ButtonAppBar);
