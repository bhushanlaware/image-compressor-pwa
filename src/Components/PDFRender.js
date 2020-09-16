import { Button, CircularProgress } from "@material-ui/core";
import {
  Document,
  Image,
  PDFDownloadLink,
  PDFViewer,
  Page,
  StyleSheet,
} from "@react-pdf/renderer";
import React, { useEffect, useRef } from "react";

import Modal from "./Modal";

const PDFRender = React.memo(({ images, fill, ...rest }) => {
  // Create styles
  let styles = StyleSheet.create({
    page: {
      flexDirection: fill,
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

  useEffect(() => {
    styles.page.flexDirection = fill;
  }, [fill]);
  // Create Document Component
  const MyDocument = ({ images }) => (
    <Document>
      {images.map((img) => (
        <Page size="A4" style={styles.page}>
          <Image src={URL.createObjectURL(img)}></Image>
        </Page>
      ))}
    </Document>
  );

  const downloadBtn = (
    <PDFDownloadLink
      document={<MyDocument images={images} />}
      fileName="_commpressedoImage.pdf"
      style={{ textDecoration: "none" }}
    >
      {({ blob, url, loading, error }) =>
        loading ? (
          <CircularProgress></CircularProgress>
        ) : (
          <Button color="white" style={{ color: "white" }}>
            Download Now
          </Button>
        )
      }
    </PDFDownloadLink>
  );
  return (
    <Modal {...rest} actionBtn={[downloadBtn]}>
      <PDFViewer height={1000} width="100%">
        <MyDocument images={images} />
      </PDFViewer>
    </Modal>
  );
}, []);

export default PDFRender;
