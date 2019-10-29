import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";

import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import FavoriteIcon from "@material-ui/icons/FavoriteBorder";
import HistoryIcon from "@material-ui/icons/HistoryOutlined";
import PersonOutlineIcon from "@material-ui/icons/PersonOutlined";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Link from "next/link";
import { NEXT_PATH } from "../../next.path";

const styles = {
  root: {
    color: "grey",
    fill: "grey",
    "&$selected": {
      color: "red",
      fill: "red"
    }
  },
  selected: {}
};

class LabelBottomNavigation extends React.Component {
  state = {
    value: "home",
    isDrawerOpen: false,
    isAuthenticated: false,
    signhalf: false
  };

  handleChange = (_, value) => {
    this.setState({ value });
  };

  render() {
    const { bottomNav } = this.props;
    let { value } = this.state;
    value = bottomNav && bottomNav.length > 0 ? bottomNav : value;
    const actionClasses = this.props.classes;

    const list = path => {
      return (
        <Link href={NEXT_PATH[path].path} key={NEXT_PATH[path].label}>
          <ListItem button key={NEXT_PATH[path].label}>
            <ListItemText primary={NEXT_PATH[path].label} />
          </ListItem>
        </Link>
      );
    };

    return (
      <div>
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          showLabels
          className="bottomBar"
        >
          <BottomNavigationAction
            label="Beranda"
            value="home"
            icon={<HomeIcon />}
            id="home"
            classes={actionClasses}
          />
          <BottomNavigationAction
            href="/empty/favorite"
            classes={actionClasses}
            label="Favorit"
            value="favorite"
            id="favorite"
            icon={<FavoriteIcon />}
          />
          <BottomNavigationAction
            href="/empty/history"
            label="Riwayat"
            value="history"
            id="history"
            classes={actionClasses}
            icon={<HistoryIcon />}
          />
          <BottomNavigationAction
            href="/profile"
            label="Profile"
            value="profile"
            id="profile"
            classes={actionClasses}
            icon={<PersonOutlineIcon />}
          />
        </BottomNavigation>
      </div>
    );
  }
}

LabelBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LabelBottomNavigation);
