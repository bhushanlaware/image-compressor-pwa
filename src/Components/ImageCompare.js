import { Grid, Typography, makeStyles } from "@material-ui/core";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

import Modal from "./Modal";
import React from "react";

const useStyles = makeStyles((theme) => ({
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

const ImageCompare = React.memo(({ original, compressed, ...rest }) => {
  const classes = useStyles();
  return (
    <Modal {...rest} title={"Compare Images"}>
      <Grid container spacing={2} className={classes.showTitle}>
        <Grid item xs={6}>
          <Typography variant="h4" className={classes.heading}>
            Original
          </Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Typography className={classes.heading} variant="h4">
            Compressed
          </Typography>
        </Grid>
      </Grid>
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src={URL.createObjectURL(original)}
            alt={"Original"}
            about="Original"
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={URL.createObjectURL(compressed)}
            alt={"Compressed"}
          />
        }
      />
    </Modal>
  );
}, []);

export default ImageCompare;
