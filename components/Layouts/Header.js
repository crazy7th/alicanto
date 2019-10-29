import Link from "next/link";
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

/* Appbar */
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import SvgIcon from "@material-ui/core/SvgIcon";

/* End Appbar */
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

// const theme = createMuiTheme({
//   background: red[600]
// });

const bgred = {
  background: "#ED494A"
};

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

function ButtonAppBar(props) {
  // const { classes } = props;
  return (
    <div className="headerNav">
      <AppBar position="static" className="headerNav-bg" elevation={0}>
        <Toolbar>
          <div style={styles.grow}>
            <img src="/static/homepage/logo.svg" />
          </div>
          <IconButton className="header-icon">
            <Badge badgeContent={4} color="secondary" className="header-badge">
              {/* <Notifications /> */}
              <img src="/static/header/icon-notif.svg" />
            </Badge>
          </IconButton>
          <IconButton className="header-icon">
            {/* <Helpicon /> */}
            <img src="/static/header/icon-help.svg" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(ButtonAppBar);
