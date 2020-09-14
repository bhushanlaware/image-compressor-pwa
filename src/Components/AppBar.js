import AppBar from "@material-ui/core/AppBar";
import DarkIcon from "@material-ui/icons/Brightness2";
import IconButton from "@material-ui/core/IconButton";
import LightIcon from "@material-ui/icons/WbSunny";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import { Tooltip } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logoimg: {
    // backgroundColor: theme.palette.background.default,
    // borderRadius:'1'
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <img
              src="./android-chrome-512x512.png"
              alt="logo"
              height="38"
              className={classes.logoimg}
            ></img>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {props.title}
          </Typography>
          <Tooltip title="Change Theme">
            <IconButton color="inherit" onClick={props.changeTheme}>
              {!props.isDark ? (
                <DarkIcon></DarkIcon>
              ) : (
                <LightIcon style={{ color: "yellow" }}></LightIcon>
              )}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
}
