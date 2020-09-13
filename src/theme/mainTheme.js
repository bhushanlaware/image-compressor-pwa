import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

const theme = React.memo(
  () =>
    createMuiTheme({
      palette: {
        type: prefersDarkMode ? "dark" : "light",
        primary: {
          light: "#008394",
          main: "#00bcd4",
          dark: "#33c9dc",
          contrastText: "#fff",
        },
        secondary: {
          light: "#b28900",
          main: "#ffc400",
          dark: "#ffcf33",
          contrastText: "#000",
        },
      },
    }),
  [prefersDarkMode]
);

export default theme;
