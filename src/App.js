import React, { useState } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";
import Home from "./Containers/Home";
import useMediaQuery from "@material-ui/core/useMediaQuery";

function App() {
  const [darkMode, setDarkMode] = useState(false);

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
    setDarkMode(!darkMode);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home changeTheme={changeTheme} isDark={darkMode} />
    </ThemeProvider>
  );
}

export default App;
