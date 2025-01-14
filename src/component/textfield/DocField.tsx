import {
  TextField,
  InputAdornment,
  Box,
  CircularProgress,
  styled,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import { useDocumentUploadMutation } from "../../features/api/apiSlice";
import { useThemeContext } from "../../context/ThemeContext";
import { useModal } from "../../context/ModalContext";
import { useRef } from "react";
import { Controller } from "react-hook-form";
interface IconProps {
  mode: any;
}
const AddDoc = <i className="fa-solid fa-file-circle-plus cursor-pointer"></i>;
const VerticalLine = (
  <i className="fa-solid fa-minus fa-rotate-90  text-[#0082FB] cursor-pointer"></i>
);
export const StyledPdfIcon = styled("i")<IconProps>(({ mode }) => ({
  fontSize: "16px", // Adjust the size
  color: mode === "dark" ? "#0082FB" : "#01aae9", // Gold color for a star
  margin: "0 8px", // Add some margin
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.2)", // Add a hover effect
  },
  cursor: "pointer",
}));
export const DocField = ({
  id,
  accept,
  onChange,
  state,
  name,
  control,
  exact,
  docUrl,
  handleDoc,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mode } = useThemeContext();
  const [documentUpload, { isLoading, isSuccess, isError, error }] =
    useDocumentUploadMutation();
  const { isOpen, closeModal, openModal } = useModal();
  console.log(isSuccess, isError, error);
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      const formData = new FormData();
      formData.append("image", file);
      try {
        const response = await documentUpload(formData).unwrap();
        if (response.data.Location) {
          onChange(response.data.Location);
        }
      } catch (err) {
        console.error("Upload failed:", err);
      }
      reader.readAsDataURL(file);
    }
  };
  const handleClick = () => {
    document.getElementById(`file-input-${name}`).click();
  };
  return (
    <>
      <Box sx={{ position: "relative" }}>
        <input
          id={`file-input-${name}`}
          ref={inputRef}
          type={"file"}
          style={{ display: "none" }}
          accept={accept}
          onChange={handleFileChange}
        />
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id={id}
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              inputProps={{
                accept: accept,
              }}
              disabled={name === "SSN" ? true : false}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" onClick={handleClick}>
                    {VerticalLine}
                    {isLoading ? (
                      <CircularProgress size="20px" />
                    ) : (
                      <>
                        {state ? (
                          <StyledPdfIcon
                            mode={mode}
                            className="fa-solid fa-file-pdf"
                          />
                        ) : (
                          AddDoc
                        )}
                      </>
                    )}
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        {state && (
          <Typography
            sx={{
              position: "absolute",
              top: "100%",
              right: "1%",
              cursor: "pointer",
              color: mode === "dark" ? "#0082FB" : "#01aae9",
            }}
            onClick={() => {
              openModal();
              handleDoc();
            }}
          >
            View
          </Typography>
        )}
      </Box>
      <Dialog open={isOpen} maxWidth="md">
        <DialogTitle sx={{ textAlign: "center", color: "#121212" }}>
          Document Preview
        </DialogTitle>
        <Box>
          <iframe
            src={docUrl}
            width="700px"
            height="500px"
            style={{ border: "none" }}
            title="PDF Preview"
          />
        </Box>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
