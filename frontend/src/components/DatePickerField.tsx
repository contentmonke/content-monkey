
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { GlobalStyles } from "@mui/material";

function DatePickerField({ label, value, setValue }: any) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <GlobalStyles styles={{
        // Selected day styles
        ".MuiPickersDay-root.Mui-selected": {
          backgroundColor: "#31628F !important", // Selected day circle color
          color: "#fff !important", // Selected day text color
        },
        ".MuiPickersDay-root.Mui-selected:hover": {
          backgroundColor: "#274b73 !important", // Hover color for selected day
        },
        // Selected year styles
        ".MuiPickersYear-yearButton.Mui-selected": {
          backgroundColor: "#31628F !important", // Selected year color
          color: "#fff !important", // Selected year text color
        },
        ".MuiPickersYear-yearButton.Mui-selected:hover": {
          backgroundColor: "#274b73 !important", // Hover color for selected year
        },
      }} />
      <DatePicker
        label={label}
        value={value}
        onChange={(newValue) => setValue(newValue)}
        slotProps={{
          textField: {
            sx: {
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#31628F",
                },
              },
              "& .MuiInputLabel-root": {
                "&.Mui-focused": {
                  color: "#31628F", // Change label color on focus
                },
              },
            },
          },
          day: {
            sx: {
              "&.Mui-selected": {
                backgroundColor: "#31628F", // Selected date circle color
                color: "#fff", // Selected date text color
              },
              "&.Mui-selected:hover": {
                backgroundColor: "#31628F", // Darken color on hover if needed
              },
            },
          },
          yearButton: {
            sx: {
              pb: 1,
              "&.Mui-selected": {
                backgroundColor: "#31628F", // Selected date circle color
                color: "#fff", // Selected date text color
              },
              "&.Mui-selected:hover": {
                backgroundColor: "#31628F", // Darken color on hover if needed
              },
            },
          }
        }}
      />
    </LocalizationProvider >
  );
}

export default DatePickerField;