import { Button, Grid } from "@material-ui/core";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PDFIcon from "@material-ui/icons/PictureAsPdf";
import React from "react";
import SaveIcon from "@material-ui/icons/Save";
import Slider from "@material-ui/core/Slider";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
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
  const { pdfFill, setPdfFill } = props;
  const handleSave = () => {
    if (props.isSaving) return;
    props.saveZip();
  };
  return (
    <div className={classes.root}>
      <Accordion elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Advance Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid item xs={12}>
              <Box>
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
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
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
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <Typography id="discrete-slider" gutterBottom>
                  PDF Image Fill
                </Typography>
                <div className={classes.toggleContainer}>
                  <ToggleButtonGroup
                    value={pdfFill}
                    exclusive
                    onChange={(e, v) => {
                      setPdfFill(v);
                    }}
                    size={"small"}
                    aria-label="text alignment"
                  >
                    <ToggleButton value="row" aria-label="Streched">
                      Streched
                    </ToggleButton>
                    <ToggleButton value="colomn" aria-label="Contained">
                      Contained
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </Box>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Divider />

      <Grid
        container
        spacing={1}
        justify="center"
        style={{ marginTop: "10px" }}
      >
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
