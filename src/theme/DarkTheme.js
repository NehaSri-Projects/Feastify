import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#49557e", //blue-grey colour
    },
    secondary: {
      main: "#fe724c", // tomato red
    },
    black: {
      main: "#272d2f", // blue-black
    },
    background: {
      main: "#ffffff", // white
      default: "#ffffff", // white
      paper: "#ffffff", //  white
    },
    text: {
      primary: "#000", // black
    },
  },
});

export default lightTheme;
