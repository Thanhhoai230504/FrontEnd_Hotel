import { createTheme, ThemeProvider } from "@mui/material";
import Routers from "./router";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
dayjs.extend(weekOfYear);

const theme = createTheme({
  typography: {
    fontFamily: "'Times New Roman', serif",
    allVariants: {
      color: "#3D3935",
    },
  },
  palette: {
    primary: {
      main: "#8B7355",
    },
    secondary: {
      main: "#E8DFD8",
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routers />
    </ThemeProvider>
  );
}

export default App;
