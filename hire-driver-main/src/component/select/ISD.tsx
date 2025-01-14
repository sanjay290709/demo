import { TextField, MenuItem } from "@mui/material";
import { ISD_LIST } from "../../constant/dropdown";
import { setISDCode } from "../../features/api/zipCodeSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectZipCode } from "../../features/api/zipCodeSlice";
export const ISD = ({ disabled }: { disabled?: boolean }) => {
  const dispatch = useAppDispatch();
  const postalState = useAppSelector(selectZipCode);
  return (
    <TextField
      defaultValue={postalState.isd}
      select
      disabled={disabled}
      fullWidth
      sx={{
        maxWidth: "74px",
        border: "none",
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            border: "none", // Removes the border
          },
          "&:hover fieldset": {
            border: "none", // Removes border on hover
          },
          "&.Mui-focused fieldset": {
            border: "none", // Removes border when focused
          },
        },
      }}
      onChange={(e) => {
        const selectedIsd = ISD_LIST.find(
          (data) => data.isd === e.target.value
        );
        dispatch(setISDCode(selectedIsd));
      }}
    >
      {ISD_LIST?.map((data) => {
        return (
          <MenuItem id={data.isd} value={data.isd} key={data.country}>
            {data.isd}
          </MenuItem>
        );
      })}
    </TextField>
  );
};
