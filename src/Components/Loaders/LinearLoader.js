import { Box, LinearProgress, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";

import NProgress from "nprogress";

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center",
    backgroundColor: theme.palette.background.default,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    minHeight: "100%",
    padding: theme.spacing(3),
  },
}));

function LoadingScreen(props) {
  const classes = useStyles();

  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <div className={classes.root}>
      <Box width={400}>
        <LinearProgress {...props} />
      </Box>
    </div>
  );
}

export default LoadingScreen;
