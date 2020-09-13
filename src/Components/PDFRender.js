import ReactPDF, {
  Document,
  Image,
  PDFViewer,
  Page,
  StyleSheet,
} from "@react-pdf/renderer";

import Modal from "./Modal";
import React from "react";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

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

const PDFRender = React.memo(({ images, ...rest }) => {
  return (
    <Modal {...rest}>
      <PDFViewer height={1000} width="100%">
        <MyDocument images={images} />
      </PDFViewer>
    </Modal>
  );
}, []);

export default PDFRender;
