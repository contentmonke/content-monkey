import { Button } from "@mui/material";


function ConfirmButton({ title, onClick }: any) {
  return (
    <Button variant="contained"
      size='large'
      sx={{
        bgcolor: '#99d2ff',
        color: 'black',
        borderRadius: 0,
        ml: 2
      }}
      onClick={onClick}>
      {title}
    </Button>
  );
}

export default ConfirmButton;