import React, { useState } from "react";

import AppBar from "../Components/AppBar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Controller from "../Components/Controller";
import FilesDropzone from "../Components/FilesDropzone";
import Grid from "@material-ui/core/Grid";
import PDFRender from "../Components/PDFRender";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import zip from "../utils/zip";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const [originalFiles, setOriginalFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [quality, setQuality] = useState(10);
  const [size, setSize] = useState(1024);
  const [showPdf, setShowPdf] = useState(false);
  const [pdfFill, setPdfFill] = useState("row");
  const saveZip = () => {
    setIsSaving(true);
    zip(files)
      .then(() => {
        setIsSaving(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <AppBar title={"Offline Image Compressor"} {...props}></AppBar>
      <Container maxWidth="lg" className={classes.root}>
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item md={8} xs={12}>
              <Paper>
                <FilesDropzone
                  files={files}
                  setFiles={setFiles}
                  originalFiles={originalFiles}
                  setOriginalFiles={setOriginalFiles}
                  loading={loading}
                  setLoading={setLoading}
                  size={size}
                  quality={quality}
                />
              </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
              <Paper>
                <Box p={4}>
                  <Controller
                    completed={!loading && files.length > 0}
                    saveZip={saveZip}
                    isSaving={isSaving}
                    size={size}
                    quality={quality}
                    pdfFill={pdfFill}
                    setQuality={setQuality}
                    setSize={setSize}
                    showPdf={setShowPdf}
                    setPdfFill={setPdfFill}
                  ></Controller>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {showPdf ? (
        <PDFRender
          open={showPdf}
          setOpen={setShowPdf}
          images={files}
          fill={pdfFill}
        ></PDFRender>
      ) : null}
    </>
  );
};

export default Home;
