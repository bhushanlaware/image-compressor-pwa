import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import GitHubIcon from "@material-ui/icons/GitHub";
import IconButton from "@material-ui/core/IconButton";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        🚀 Image Compressor
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          The image compressor app can help you compress or resize images
          offline🔥. You can download them as individuals or as ZIP. You do You
          can also create a PDF on the way. You can check advance settings to
          compress and resize images as you like.
        </Typography>
        <Typography gutterBottom>
          he best thing about this is that never uploads images to the server.
          It is a progressive web app that will compress images in the browser
          using javascript.Hence it is fast ⚡, reliable, and secure. It works
          offline and can be installed in android, mac, iOS, Windows, or any
          platform that supports browsers 💪.
        </Typography>
        <Typography gutterBottom>
          If you like this application you can check source code at Github. You
          can follow me on Instagram and Linkedin.
        </Typography>
        <IconButton href="https://github.com/bhushanlaware">
          <GitHubIcon size="small"></GitHubIcon>
        </IconButton>
        <IconButton href="https://www.linkedin.com/in/bhushanlaware/">
          <LinkedInIcon></LinkedInIcon>
        </IconButton>
        <IconButton href="https://www.instagram.com/bhushanlaware">
          <InstagramIcon></InstagramIcon>
        </IconButton>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          ☕ Want to Support me?
        </Button>
      </DialogActions>
    </Dialog>
  );
}
