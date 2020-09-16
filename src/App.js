import React, { useEffect, useState } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";
import Home from "./Containers/Home";
import { SnackbarProvider } from "notistack";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    let dmode = localStorage.getItem("darkMode");
    console.log(dmode);
    // if (dmode == undefined) {
    //   dmode = false;
    //   localStorage.setItem("darkMode", dmode);
    // }
    dmode === "false" ? setDarkMode(false) : setDarkMode(true);
  }, []);
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: darkMode ? "dark" : "light",
          // primary: {
          //   light: "#008394",
          //   main: "#00bcd4",
          //   dark: "#33c9dc",
          //   contrastText: "#fff",
          // },
          // secondary: {
          //   light: "#b28900",
          //   main: "#ffc400",
          //   dark: "#ffcf33",
          //   contrastText: "#000",
          // },
          primary: {
            light: "#4dabf5",
            main: "#2196f3",
            dark: "#1769aa",
            contrastText: "#fff",
          },
          secondary: {
            light: "#f73378",
            main: "#f50057",
            dark: "#ab003c",
            contrastText: "#fff",
          },
        },
      }),
    [darkMode]
  );
  const changeTheme = () => {
    localStorage.setItem("darkMode", !darkMode);
    setDarkMode(!darkMode);
  };
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Home changeTheme={changeTheme} isDark={darkMode} />
      </SnackbarProvider>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
