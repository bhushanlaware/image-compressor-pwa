import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
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
        Quality
      </Typography>
      <Slider
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        step={10}
        min={10}
        max={100}
        onChange={(e, v) => {
          setQuality(v);
        }}
        value={quality}
        valueLabelDisplay="on"
      />
      <Typography id="discrete-slider" gutterBottom>
        Size
      </Typography>
      <Slider
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        step={10}
        min={10}
        max={100}
        onChange={(e, v) => {
          setSize(v);
        }}
        value={size}
        valueLabelDisplay="on"
      />
      <Button
        variant="contained"
        color="primary"
        style={{ float: "right" }}
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
      <div style={{ clear: "both" }}></div>
    </div>
  );
}
