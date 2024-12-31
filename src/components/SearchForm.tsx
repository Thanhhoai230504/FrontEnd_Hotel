// import { AttachMoney, Person } from "@mui/icons-material";
// import {
//   Alert,
//   Button,
//   Grid,
//   InputAdornment,
//   Paper,
//   Snackbar,
//   TextField,
// } from "@mui/material";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { CalendarIcon } from "@mui/x-date-pickers/icons";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import dayjs from "dayjs";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { AppDispatch } from "../store/store";

// const BookingForm = () => {
//   const [checkInDate, setCheckInDate] = useState(null);
//   const [checkOutDate, setCheckOutDate] = useState(null);
//   const [adults, setAdults] = useState(2);
//   const [price, setPrice] = useState(2000000); // Set a default max price
//   const [showError, setShowError] = useState(false);

//   const dispatch = useDispatch<AppDispatch>();
//   const { loading, error } = useSelector(
//     (state: any) => state.roomSearchState.loading
//   );
//   const navigate = useNavigate();
//   const handleSearch = () => {
//     if (!checkInDate || !checkOutDate) {
//       setShowError(true);
//       return;
//     }
//     const searchData = {
//       checkInDate,
//       checkOutDate,
//       adults,
//       minPrice: 100000, // Giả sử price là giá tối thiểu
//       maxPrice: Math.max(price, price), // Giá tối đa
//     };
//     navigate('/SearchRoom', { state: searchData });
//   };

//   return (
//     <>
//       <Paper
//         elevation={3}
//         sx={{
//           p: 3,
//           position: "absolute",
//           bottom: 50,
//           left: "50%",
//           transform: "translateX(-50%)",
//           width: "80%",
//           maxWidth: 1200,
//           bgcolor: "rgba(255, 255, 255, 0.95)",
//           borderRadius: 2,
//         }}
//       >
//         <Grid container spacing={2} alignItems="center">
//           <Grid item xs={12} md={3}>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DatePicker
//                 label="Nhận phòng"
//                 format="DD/MM/YYYY"
//                 value={checkInDate}
//                 onChange={(newValue) => setCheckInDate(newValue as any)}
//                 disablePast
//                 slotProps={{
//                   textField: {
//                     fullWidth: true,
//                     error: showError && !checkInDate,
//                     helperText: showError && !checkInDate ? "Required" : "",
//                     InputProps: {
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <CalendarIcon />
//                         </InputAdornment>
//                       ),
//                     },
//                   },
//                 }}
//               />
//             </LocalizationProvider>
//           </Grid>

//           <Grid item xs={12} md={3}>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DatePicker
//                 label="Trả phòng"
//                 format="DD/MM/YYYY"
//                 value={checkOutDate}
//                 onChange={(newValue) => setCheckOutDate(newValue as any)}
//                 disablePast
//                 minDate={
//                   checkInDate ? dayjs(checkInDate).add(1, "day") : undefined
//                 }
//                 slotProps={{
//                   textField: {
//                     fullWidth: true,
//                     error: showError && !checkOutDate,
//                     helperText: showError && !checkOutDate ? "Required" : "",
//                     InputProps: {
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <CalendarIcon />
//                         </InputAdornment>
//                       ),
//                     },
//                   },
//                 }}
//               />
//             </LocalizationProvider>
//           </Grid>

//           <Grid item xs={12} md={2}>
//             <TextField
//               fullWidth
//               label="Người lớn"
//               type="number"
//               value={adults}
//               onChange={(e) => setAdults(Math.max(1, Number(e.target.value)))}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Person />
//                   </InputAdornment>
//                 ),
//                 inputProps: { min: 1 },
//               }}
//             />
//           </Grid>

//           <Grid item xs={12} md={2}>
//             <TextField
//               fullWidth
//               label="Giá tối đa"
//               type="number"
//               value={price}
//               onChange={(e) =>
//                 setPrice(Math.max(10000, Number(e.target.value)))
//               }
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <AttachMoney />
//                   </InputAdornment>
//                 ),
//                 inputProps: { min: 1000 },
//               }}
//             />
//           </Grid>

//           <Grid item xs={12} md={2}>
//             <Button
//               fullWidth
//               variant="contained"
//               size="large"
//               disabled={loading}
//               sx={{
//                 bgcolor: "#D4C1A5",
//                 color: "black",
//                 height: "56px",
//                 "&:hover": {
//                   bgcolor: "#C4B195",
//                 },
//               }}
//               onClick={handleSearch}
//             >
//               {loading ? "ĐANG TÌM..." : "TÌM KIẾM"}
//             </Button>
//           </Grid>
//         </Grid>
//       </Paper>

//       <Snackbar
//         open={!!error}
//         autoHideDuration={6000}
//         onClose={() => dispatch({ type: "RoomSearchSlice/clearError" })}
//       >
//         <Alert
//           severity="error"
//           onClose={() => dispatch({ type: "RoomSearchSlice/clearError" })}
//         >
//           {error}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };

// export default BookingForm;

import { AttachMoney, Person } from "@mui/icons-material";
import {
  Alert,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  FormControl,
  InputLabel,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { CalendarIcon } from "@mui/x-date-pickers/icons";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store/store";

const BookingForm = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [adults, setAdults] = useState(2);
  const [price, setPrice] = useState(1000000);
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector(
    (state: any) => state.roomSearchState.loading
  );
  const navigate = useNavigate();

  const priceOptions = [
    { value: 1000000, label: "1,000,000 VND" },
    { value: 2000000, label: "2,000,000 VND" },
    { value: 3000000, label: "3,000,000 VND" },
    { value: 4000000, label: "4,000,000 VND" },
    { value: 5000000, label: "5,000,000 VND" },
  ];

  const handleSearch = () => {
    if (!checkInDate || !checkOutDate) {
      setShowError(true);
      return;
    }
    const searchData = {
      checkInDate,
      checkOutDate,
      adults,
      minPrice: 1000000,
      maxPrice: Math.max(price, price),
    };
    navigate("/SearchRoom", { state: searchData });
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          position: "absolute",
          bottom: 50,
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          maxWidth: 1400,
          bgcolor: "rgba(255, 255, 255, 0.95)",
          borderRadius: 2,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Nhận phòng"
                format="DD/MM/YYYY"
                value={checkInDate}
                onChange={(newValue) => setCheckInDate(newValue as any)}
                disablePast
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: showError && !checkInDate,
                    helperText: showError && !checkInDate ? "Required" : "",
                    InputProps: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarIcon />
                        </InputAdornment>
                      ),
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} md={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Trả phòng"
                format="DD/MM/YYYY"
                value={checkOutDate}
                onChange={(newValue) => setCheckOutDate(newValue as any)}
                disablePast
                minDate={
                  checkInDate ? dayjs(checkInDate).add(1, "day") : undefined
                }
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: showError && !checkOutDate,
                    helperText: showError && !checkOutDate ? "Required" : "",
                    InputProps: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarIcon />
                        </InputAdornment>
                      ),
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              label="Người lớn"
              type="number"
              value={adults}
              onChange={(e) => setAdults(Math.max(1, Number(e.target.value)))}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
                inputProps: { min: 1 },
              }}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Giá tối đa</InputLabel>
              <Select
                label="Giá tối đa"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                startAdornment={
                  <InputAdornment position="start">
                    <AttachMoney />
                  </InputAdornment>
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: 1,
                    },
                  },
                }}
              >
                {priceOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                bgcolor: "#D4C1A5",
                color: "black",
                height: "56px",
                "&:hover": {
                  bgcolor: "#C4B195",
                },
              }}
              onClick={handleSearch}
            >
              {loading ? "ĐANG TÌM..." : "TÌM KIẾM"}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => dispatch({ type: "RoomSearchSlice/clearError" })}
      >
        <Alert
          severity="error"
          onClose={() => dispatch({ type: "RoomSearchSlice/clearError" })}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default BookingForm;
