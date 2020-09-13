import React, { useState } from "react";

import AppBar from "../Components/AppBar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Controller from "../Components/Controller";
import FilesDropzone from "../Components/FilesDropzone";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { ThemeProvider } from "@material-ui/core/styles";
import mainTheme from "../theme/mainTheme";
import zip from "../utils/zip";

const Home = () => {
  const [originalFiles, setOriginalFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [quality, setQuality] = useState(80);
  const [size, setSize] = useState(80);

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
      <ThemeProvider theme={mainTheme}>
        <AppBar title={"Offline Image Compressor"}></AppBar>
        <Container maxWidth="lg">
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
                      setQuality={setQuality}
                      setSize={setSize}
                    ></Controller>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Home;
