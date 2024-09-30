import { AppBar, Toolbar } from "@mui/material";

function CustomAppBar() {
  return (
    <AppBar position="fixed" sx={{ bgcolor: 'lightblue' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
      </Toolbar>
    </AppBar>
  );
}

export default CustomAppBar;