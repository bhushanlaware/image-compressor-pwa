import React, { useEffect, useState } from "react";

import { Button } from "@material-ui/core";
import InstallIcon from "@material-ui/icons/GetApp";

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = (evt) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  if (!supportsPWA) {
    return null;
  }
  return (
    <Button
      title="Install app"
      style={{ color: "white", borderColor: "white" }}
      startIcon={<InstallIcon onClick={onClick} />}
      variant="outlined"
    >
      Install
    </Button>
  );
};

export default InstallPWA;
