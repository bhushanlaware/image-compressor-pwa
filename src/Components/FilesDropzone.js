import "react-perfect-scrollbar/dist/css/styles.css";

import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  makeStyles,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import DownloadIcon from "@material-ui/icons/ArrowDownwardRounded";
import LoadingScreen from "./LoadingScreen";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import React from "react";
import bytesToSize from "../utils/bytesToSize";
import clsx from "clsx";
import resizeFiles from "../utils/fileResizer";
import { saveAs } from "file-saver";
import { useDropzone } from "react-dropzone";

const useStyles = makeStyles((theme) => ({
  fileDesc: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("md")]: {
      textAlign: "left",
    },
  },
  dropZone: {
    border: `1px dashed ${theme.palette.divider}`,
    padding: theme.spacing(2),
    outline: "none",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
      opacity: 0.5,
      cursor: "pointer",
    },
  },
  dragActive: {
    backgroundColor: theme.palette.action.active,
    opacity: 0.5,
  },
  selectImage: {
    height: 100,
  },
  image: {
    maxWidth: 80,
    maxHeight: 80,
  },
  info: {
    marginTop: theme.spacing(1),
  },
  list: {
    maxHeight: 300,
  },
  actions: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-end",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

// const getDimention = (file, max) => {
//   file
//   const dimention = { height: max, width: max };
//   if (height >= width) {
//     dimention.width = (max / height) * width;
//   } else {
//     dimention.height = (max / width) * height;
//   }
// };
// var fr = new FileReader();

// fr.onload = function() {
//   // file is loaded
//   var img = new Image();

//   img.onload = function() {
//     alert(img.width); // image is loaded; sizes are available
//   };

//   img.src = fr.result; // is the data URL because called with readAsDataURL
// };

//fr.readAsDataURL(this.files[0]);

function FilesDropzone({
  className,
  enableInstantUpload,
  files,
  setFiles,
  size,
  quality,
  loading,
  setLoading,
  originalFiles,
  setOriginalFiles,
  ...rest
}) {
  const classes = useStyles();
  const handleDrop = (acceptedFiles) => {
    setLoading(true);
    resizeFiles(acceptedFiles, size, quality).then((newFiles) => {
      setFiles((prevFiles) => [...prevFiles].concat(newFiles));
      setLoading(false);
    });
  };

  const handleRemoveAll = () => {
    setFiles([]);
  };
  const handleRemoveFile = (index) => {
    let newFiles = files;
    newFiles.splice(index, 1);
    setFiles([...newFiles]);
  };
  const handleDownloadImage = (index) => {
    debugger;
    saveAs(files[index].uri, "_compressed" + files[index].file.name);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
  });

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <div
        className={clsx({
          [classes.dropZone]: true,
          [classes.dragActive]: isDragActive,
        })}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div style={{ padding: "10px" }}>
          <img
            alt="Select file"
            className={classes.selectImage}
            src="/images/method-draw-image.svg"
          />
        </div>
        <div>
          <Typography gutterBottom variant="h5">
            Select Images
          </Typography>
          <Box mt={2}>
            <Typography color="textPrimary" variant="body1">
              Drop files here or click browse thorough your machine
            </Typography>
          </Box>
        </div>
      </div>
      {loading ? (
        <div>
          <LoadingScreen></LoadingScreen>
        </div>
      ) : (
        files.length > 0 && (
          <>
            <PerfectScrollbar options={{ suppressScrollX: true }}>
              <List className={classes.list}>
                {files.map((file, i) => {
                  return (
                    <ListItem divider={i < files.length - 1} key={i}>
                      <Grid container>
                        <Grid item md={5} xs={12}>
                          <Grid
                            container
                            spacing={1}
                            justify="center"
                            alignItems="center"
                          >
                            <Grid item>
                              <img
                                src={file.uri}
                                className={classes.image}
                                alt={<ListItemIcon />}
                                title="Original"
                              />
                              {/* <br />
                              <Typography variant="caption" align="center">
                                {bytesToSize(file.uri.length)}
                              </Typography> */}
                            </Grid>
                            <Grid item>
                              <Button
                                color="primary"
                                size="small"
                                variant="outlined"
                              >
                                Compare
                              </Button>
                            </Grid>
                            <Grid item>
                              <img
                                src={file.uri}
                                className={classes.image}
                                alt={<ListItemIcon />}
                                title="Compressed"
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item md={7} xs={12}>
                          <Grid
                            container
                            justify="center"
                            alignItems="center"
                            className={classes.fileDesc}
                          >
                            <Grid item md={10} xs={12}>
                              <ListItemText
                                style={{ marginLeft: "10px" }}
                                primary={file.file.path || Date.now()}
                                primaryTypographyProps={{
                                  variant: "subtitle1",
                                }}
                                secondary={
                                  file.file.size
                                    ? "Resized to " +
                                      bytesToSize(file.uri.length) +
                                      " from " +
                                      bytesToSize(file.file.size)
                                    : null
                                }
                              />
                            </Grid>
                            <Grid item md={2} xs={12}>
                              <div>
                                <Tooltip title="Download image">
                                  <IconButton
                                    edge="end"
                                    onClick={() => handleDownloadImage(i)}
                                  >
                                    <DownloadIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete image">
                                  <IconButton
                                    edge="end"
                                    onClick={() => handleRemoveFile(i)}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Tooltip>
                              </div>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </ListItem>
                  );
                })}
              </List>
            </PerfectScrollbar>
            <div className={classes.actions}>
              <Button onClick={handleRemoveAll} size="small">
                Remove all
              </Button>
              {enableInstantUpload ? (
                <Button color="secondary" size="small" variant="contained">
                  Upload files
                </Button>
              ) : null}
            </div>
          </>
        )
      )}
    </div>
  );
}

FilesDropzone.propTypes = {
  className: PropTypes.string,
};

export default FilesDropzone;
