import { Button } from "@mui/material";

function CancelButton({ onClick }: any) {
  return (
    <Button
      variant="outlined"
      size='large'
      sx={{ borderRadius: 0, mr: 2 }}
      onClick={onClick}>
      Cancel
    </Button>
  );
}

export default CancelButton;