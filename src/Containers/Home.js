import React, { Component, Suspense, lazy, useState } from "react";

import AppBar from "../Components/AppBar";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import ComponentLoader from "../Components/Loaders/ComponentLoader";
import Container from "@material-ui/core/Container";
import Controller from "../Components/Controller";
import Footer from "../Components/Footer";
import FullPageLoader from "../Components/Loaders/FullPageLoader";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import zip from "../utils/zip";

const FilesDropzone = lazy(() => import("../Components/FilesDropzone"));
const PDFRender = lazy(() => import("../Components/PDFRender"));
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
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
  const [pdfFill, setPdfFill] = useState("colomn");
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
      <AppBar title={"Image Compressor"} {...props}></AppBar>
      <div className={classes.root}>
        <Container maxWidth="lg" style={{ marginTop: "10px" }}>
          <Box mt={2} pb={2}>
            <Grid container spacing={2}>
              <Grid item md={8} xs={12}>
                <Paper>
                  <Suspense fallback={<ComponentLoader></ComponentLoader>}>
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
                  </Suspense>
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
          <Suspense fallback={<FullPageLoader></FullPageLoader>}>
            <PDFRender
              open={showPdf}
              setOpen={setShowPdf}
              images={files}
              fill={pdfFill}
            ></PDFRender>
          </Suspense>
        ) : null}
        <Footer></Footer>
      </div>
    </>
  );
};

export default Home;
