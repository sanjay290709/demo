import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { useAppDispatch } from "../../app/hooks";
import { fetchCityState } from "../../features/api/zipCodeSlice";
import debounce from "lodash.debounce";
import { useEffect, useState } from "react";

interface PostalFieldProps {
  control: any;
  id: any;
  name: any;
  countryName: any; // Optional prop
  isoCode: any; // Optional prop
  value: any
}
export const PostalField = ({
  control,
  id,
  countryName,
  isoCode,
  name,
  value
}: PostalFieldProps) => {
  const dispatch = useAppDispatch();
  const [zipcode, setZipcode] = useState("");
  const handleZipcodeChange = debounce((value: string) => {
    let isoCode;
    switch (countryName) {
      case "United States":
        isoCode = "USA";
        break;
      case "India":
        isoCode = "IND";
        break;
      case "Australia":
        isoCode = "AUS";
        break;
      default:
        isoCode = "USA"
    }
    dispatch(fetchCityState({ zipcode: value, countryName, isoCode }));
  }, 500);
  useEffect(() => {
    handleZipcodeChange(zipcode);
  }, [zipcode]);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          onChange={(e) => {
            field.onChange(e.target.value);
            setZipcode(e.target.value);
          }}
          value={field.value || value}
          id={id}
          fullWidth
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};
