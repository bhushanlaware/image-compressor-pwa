import "react-image-crop/dist/ReactCrop.css";

import { Avatar, Box, Button, Grid } from "@material-ui/core";
import React, { PureComponent } from "react";

import Modal from "./Modal";
import ReactCrop from "react-image-crop";

class CropImage extends PureComponent {
  state = {
    src: null,
    crop: {
      unit: "%",
      width: 50,
      height: 50,
      x: 25,
      y: 25,
    },
  };
  componentDidMount = () => {
    this.setState({ src: URL.createObjectURL(this.props.file) });
  };
  //   onSelectFile = (e) => {
  //     if (e.target.files && e.target.files.length > 0) {
  //       const reader = new FileReader();
  //       reader.addEventListener("load", () =>
  //         this.setState({ src: reader.result })
  //       );
  //       reader.readAsDataURL(e.target.files[0]);
  //     }
  //   };

  //   // If you setState the crop in here you should return false.
  //   onImageLoaded = (image) => {
  //     this.imageRef = image;
  //   };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };
  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropChange = (crop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      this.getCroppedImg(this.imageRef, crop);
    }
  }

  getCroppedImg(image, crop) {
    console.log(image);
    debugger;
    const canvas = document.createElement("canvas");
    let scaleX = 1;
    let scaleY = 1;

    // const clientHeight = document.documentElement.clientHeight * 0.99;

    scaleX = image.naturalHeight / image.offsetHeight;
    scaleY = image.naturalWidth / image.offsetWidth;
    if (scaleX > 1) {
      canvas.width = crop.width * 1.5;
      canvas.height = crop.height * 1.5;
    } else {
      canvas.width = crop.width;
      canvas.height = crop.height;
    }

    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );
    canvas.toBlob((blob) => {
      blob.name = this.props.file.name;
      this.setState({ blob });
    });
    // return new Promise((resolve, reject) => {
    //   canvas.toDataURL(uri => {
    //     if (!uri) {
    //       //reject(new Error('Canvas is empty'));
    //       console.error("Canvas is empty");
    //       return;
    //     }
    //     uri.name = fileName;
    //     window.URL.revokeObjectURL(this.fileUrl);
    //     this.fileUrl = window.URL.createObjectURL(uri);

    //     resolve(this.fileUrl);
    //   }, "image/jpeg");
    // });
  }

  handleCancel = () => {
    //parent component functionality here
    this.props.setOpen(false);
  };
  SaveCrop = () => {
    const croppedImg = this.state.blob;
    croppedImg.blobURL = URL.createObjectURL(croppedImg);
    this.props.onSubmit && this.props.onSubmit(croppedImg);
  };
  render() {
    const { crop, src } = this.state;
    const { file, onSubmit, ...rest } = this.props;
    return (
      <Modal
        {...rest}
        actionBtn={[
          <Button disabled={!src} onClick={this.SaveCrop}>
            Crop
          </Button>,
        ]}
      >
        <Box className="App">
          {src ? (
            <ReactCrop
              src={src}
              crop={crop}
              ruleOfThirds
              onImageLoaded={this.onImageLoaded}
              onComplete={this.onCropComplete}
              onChange={this.onCropChange}
            />
          ) : null}
        </Box>
      </Modal>
    );
  }
}
export default CropImage;
