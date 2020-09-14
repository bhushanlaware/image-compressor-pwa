import { Button, Grid } from "@material-ui/core";
import React, { useState } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import PDFIcon from "@material-ui/icons/PictureAsPdf";
import SaveIcon from "@material-ui/icons/Save";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({});

function valuetext(value) {
  return `${value}%`;
}

export default function DiscreteSlider(props) {
  const classes = useStyles();
  const { size, setSize } = props;
  const { quality, setQuality } = props;
  const handleSave = () => {
    if (props.isSaving) return;
    props.saveZip();
  };
  return (
    <div className={classes.root}>
      <Typography id="discrete-slider" gutterBottom>
        Max Interations :{quality}
      </Typography>
      <Slider
        getAriaValueText={valuetext}
        color="secondary"
        aria-labelledby="discrete-slider"
        step={1}
        min={5}
        max={30}
        onChange={(e, v) => {
          setQuality(v);
        }}
        value={quality}
        valueLabelDisplay="auto"
      />
      <Typography id="discrete-slider" gutterBottom>
        Max Size :{size} px
      </Typography>
      <Slider
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        step={32}
        min={32}
        max={1024}
        onChange={(e, v) => {
          setSize(v);
        }}
        color="secondary"
        value={size}
        valueLabelDisplay="auto"
      />
      <Grid container spacing={1} justify="center">
        <Grid item md={6} xs={12} style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            disabled={!props.completed}
            startIcon={
              props.isSaving ? (
                <CircularProgress
                  style={{ width: "20px", height: "20px", color: "white" }}
                />
              ) : (
                <SaveIcon />
              )
            }
            onClick={handleSave}
          >
            Download Zip
          </Button>
        </Grid>
        <Grid item md={6} xs={12} style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            disabled={!props.completed}
            startIcon={<PDFIcon />}
            onClick={() => {
              props.showPdf(true);
            }}
          >
            Want PDF ?
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
