import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import Slide from "@material-ui/core/Slide";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  heading: {
    color: "#fbfbfb",
    padding: "10px",
  },
  showTitle: {
    position: "absolute",
    padding: "10px",
    zIndex: "11",
    [theme.breakpoints.down("sm")]: {
      top: "30px",
    },
    [theme.breakpoints.up("sm")]: {
      top: "80px",
    },
    [theme.breakpoints.up("md")]: {
      top: "80px",
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ImageCompare(props) {
  const classes = useStyles();
  console.log(props);
  const { open, setOpen } = props;
  debugger;
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {props.title}
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            Close
          </Button>
          {props.action ? (
            <Button autoFocus color="inherit" onClick={props.onActionClick}>
              {props.action}
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>

      {props.children}
    </Dialog>
  );
}
