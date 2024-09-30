import { Rating } from "@mui/material";

function RatingStars({ value, setValue, size = "medium" }: any) {
  return (
    <Rating
      size={size}
      sx={{ my: 1 }}
      value={value}
      onChange={setValue}
      precision={0.5}
    />
  );
}

export default RatingStars;