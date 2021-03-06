import "react-perfect-scrollbar/dist/css/styles.css";

import {
  Box,
  Button,
  ButtonGroup,
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
import React, { Suspense, lazy, useEffect, useState } from "react";

import CropIcon from "@material-ui/icons/Crop";
import DeleteIcon from "@material-ui/icons/Delete";
import DownArrowIcon from "@material-ui/icons/ArrowDownwardRounded";
import FullPageLoader from "./Loaders/FullPageLoader";
import LoadingScreen from "./Loaders/LinearLoader";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import SaveIcon from "@material-ui/icons/Save";
import UpArrowIcon from "@material-ui/icons/ArrowUpwardRounded";
import bytesToSize from "../utils/bytesToSize";
import clsx from "clsx";
import { file } from "jszip";
import fileCompressor from "../utils/fileCompressor";
import { saveAs } from "file-saver";
import { useDropzone } from "react-dropzone";
import { useSnackbar } from "notistack";

const ImageCompare = lazy(() => import("./ImageCompare"));
const CropImage = lazy(() => import("./CropImage"));
const useStyles = makeStyles((theme) => ({
  fileDesc: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("md")]: {
      textAlign: "left",
    },
  },
  iconGroup: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("md")]: {
      textAlign: "right",
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

const FilesDropzone = React.memo(
  ({
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
  }) => {
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const [showCompare, setShowCompare] = useState(false);
    const [compareOriginal, setCompareOriginal] = useState(null);
    const [compareCompressed, setcompareCompressed] = useState(null);
    const [cropImageFileIndex, setCropImageFile] = useState(null);
    const [showCrop, setShowCrop] = useState(false);
    const handleDrop = (acceptedFiles, rejectedFiles) => {
      setLoading(true);
      if (rejectedFiles.length > 0) {
        console.log(rejectedFiles);
        // const files = rejectedFiles.reduce(
        //   (a, v) => (a += v.file.name + ",\n"),
        //   ""
        // );
        setLoading(false);
        enqueueSnackbar("Not valid image! 😎", {
          variant: "error",
        });
        return;
      }
      // resizeFiles(acceptedFiles, size, quality).then((newFiles) => {
      //   setFiles((prevFiles) => [...prevFiles].concat(newFiles));
      //   setOriginalFiles((prevFiles) => [...prevFiles].concat(acceptedFiles));
      //   setLoading(false);
      // });
      acceptedFiles.forEach((x) => {
        x.blobURL = URL.createObjectURL(x);
      });
      fileCompressor(acceptedFiles, size, quality).then((newFiles) => {
        setFiles((prevFiles) => [...prevFiles].concat(newFiles));
        setOriginalFiles((prevFiles) => [...prevFiles].concat(acceptedFiles));
        enqueueSnackbar(
          "✨Compressed!✨ You Can download images as zip or PDF😉",
          {
            variant: "Success",
          }
        );

        setLoading(false);
      });
    };
    useEffect(() => {
      resizeImage();
    }, [quality, size]);

    const resizeImage = () => {
      setLoading(true);
      // resizeFiles(originalFiles, size, quality).then((newFiles) => {
      //   setFiles(newFiles);
      //   setLoading(false);
      // });
      fileCompressor(originalFiles, size, quality).then((newFiles) => {
        setFiles(newFiles);
        setLoading(false);
      });
    };
    const resizeImageOfIndex = (croppedImage, i) => {
      // setLoading(true);
      // resizeFiles(originalFiles, size, quality).then((newFiles) => {
      //   setFiles(newFiles);
      //   setLoading(false);
      // });]

      fileCompressor([croppedImage], size, quality).then((newFiles) => {
        const files1 = [...files];
        files1[i] = newFiles[0];
        setFiles(files1);
        setLoading(false);
      });
    };
    const handleCrop = (i) => {
      setCropImageFile(i);
      setShowCrop(true);
    };
    const handleCropImage = (croppedImage) => {
      setShowCrop(false);
      //also upload in database
      console.log(croppedImage);
      if (!croppedImage) return;
      try {
        const newFiles = [...originalFiles];
        newFiles[cropImageFileIndex] = croppedImage;
        setOriginalFiles(newFiles);
        resizeImageOfIndex(croppedImage, cropImageFileIndex);
        setShowCrop(false);
        enqueueSnackbar("Image Cropped Successfully", { variant: "success" });
      } catch (error) {
        enqueueSnackbar("Something gone wrong", { variant: "error" });
        console.log(error);
      }
    };

    const handleCompare = (i) => {
      setCompareOriginal(originalFiles[i]);
      setcompareCompressed(files[i]);
      setShowCompare(true);
    };
    const handleRemoveAll = () => {
      setFiles([]);
      setOriginalFiles([]);
    };
    const handleRemoveFile = (index) => {
      let newFiles = files;
      newFiles.splice(index, 1);
      setFiles([...newFiles]);
      let newFilesOrignal = originalFiles;
      newFilesOrignal.splice(index, 1);
      setOriginalFiles([...newFilesOrignal]);
    };
    const handleDownloadImage = (index) => {
      saveAs(files[index], "_compressed" + files[index].name);
    };
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: handleDrop,
      accept: "image/x-png,image/gif,image/jpeg,image/png,image/jpg",
    });
    const goUp = (i) => {
      setFiles((prevFiles) => {
        const newArr = [...prevFiles];
        if (i - 1 >= 0) {
          const temp = newArr[i - 1];
          newArr[i - 1] = newArr[i];
          newArr[i] = temp;
        }
        return newArr;
      });
      setOriginalFiles((prevFiles) => {
        const newArr = [...prevFiles];
        if (i - 1 >= 0) {
          const temp = newArr[i - 1];
          newArr[i - 1] = newArr[i];
          newArr[i] = temp;
        }
        return newArr;
      });
    };
    const goDown = (i) => {
      setFiles((prevFiles) => {
        const newArr = [...prevFiles];
        if (i + 1 < originalFiles.length) {
          const temp = newArr[i + 1];
          newArr[i + 1] = newArr[i];
          newArr[i] = temp;
        }
        return newArr;
      });
      setOriginalFiles((prevFiles) => {
        const newArr = [...prevFiles];
        if (i + 1 < originalFiles.length) {
          const temp = newArr[i + 1];
          newArr[i + 1] = newArr[i];
          newArr[i] = temp;
        }
        return newArr;
      });
    };
    return (
      <>
        <div className={clsx(classes.root, className)} {...rest}>
          <div
            className={clsx({
              [classes.dropZone]: true,
              [classes.dragActive]: isDragActive,
            })}
            {...getRootProps()}
          >
            <input
              {...getInputProps()}
              type="file"
              accept="image/x-png,image/gif,image/jpeg"
            />
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
                                    src={originalFiles[i].blobURL}
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
                                  <ButtonGroup
                                    orientation="vertical"
                                    variant="outlined"
                                    color="primary"
                                  >
                                    <Button
                                      size="small"
                                      onClick={() => {
                                        handleCompare(i);
                                      }}
                                    >
                                      Compare
                                    </Button>
                                    <Button
                                      size="small"
                                      onClick={() => {
                                        handleCrop(i);
                                      }}
                                    >
                                      Crop
                                    </Button>
                                  </ButtonGroup>
                                </Grid>
                                <Grid item>
                                  <img
                                    src={file.blobURL}
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
                                <Grid item md={8} xs={12}>
                                  <ListItemText
                                    style={{ marginLeft: "10px" }}
                                    primary={
                                      originalFiles[i].name || Date.now()
                                    }
                                    primaryTypographyProps={{
                                      variant: "subtitle1",
                                    }}
                                    secondary={
                                      file.size && originalFiles[i].size
                                        ? "Resized to " +
                                          bytesToSize(file.size) +
                                          // "<i style='color:green'>" +
                                          // (1 -
                                          //   originalFiles[i].size /
                                          //     originalFiles[i].size) *
                                          //   100 +
                                          // "Smaller </i>" +
                                          " from " +
                                          bytesToSize(originalFiles[i].size)
                                        : null
                                    }
                                  />
                                </Grid>
                                <Grid
                                  item
                                  md={4}
                                  xs={12}
                                  className={classes.iconGroup}
                                >
                                  <div>
                                    {i > 0 ? (
                                      <Tooltip title="Move Up">
                                        <IconButton
                                          edge="end"
                                          onClick={() => goUp(i)}
                                        >
                                          <UpArrowIcon />
                                        </IconButton>
                                      </Tooltip>
                                    ) : null}
                                    {i + 1 < originalFiles.length ? (
                                      <Tooltip title="Move Down">
                                        <IconButton
                                          edge="end"
                                          onClick={() => goDown(i)}
                                        >
                                          <DownArrowIcon />
                                        </IconButton>
                                      </Tooltip>
                                    ) : null}
                                    {/* <Tooltip title="Crop Image">
                                    <IconButton
                                      edge="end"
                                      onClick={() => handleCrop(i)}
                                    >
                                      <CropIcon />
                                    </IconButton>
                                  </Tooltip> */}
                                    <Tooltip title="Download">
                                      <IconButton
                                        edge="end"
                                        onClick={() => handleDownloadImage(i)}
                                      >
                                        <SaveIcon />
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
        <div>
          {showCompare ? (
            <Suspense fallback={<FullPageLoader></FullPageLoader>}>
              <ImageCompare
                original={compareOriginal}
                compressed={compareCompressed}
                open={showCompare}
                setOpen={setShowCompare}
              ></ImageCompare>
            </Suspense>
          ) : null}
          {showCrop ? (
            <Suspense fallback={<FullPageLoader></FullPageLoader>}>
              <CropImage
                ruleOfThirds
                file={originalFiles[cropImageFileIndex]}
                onSubmit={handleCropImage}
                open={showCrop}
                setOpen={setShowCrop}
              ></CropImage>
            </Suspense>
          ) : null}
        </div>
      </>
    );
  }
);

FilesDropzone.propTypes = {
  className: PropTypes.string,
};

export default FilesDropzone;
