import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  styled,
  InputLabel,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { authenticate, login, selectCurrentUserDetail } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "../context/ToastContext";
import { isRegistered } from "../features/api/globalStateSlice";
const Asterisk = (
  <Typography component="span" color="#FF0266" sx={{ fontSize: "24px" }}>
    *
  </Typography>
);
const StyledLogoImage = styled("img")(() => ({
  objectFit: "contain",
  maxWidth: "100%",
  maxHeight: "64px",

  marginBottom: "10px",
}));
const schema = yup.object({
  email: yup
    .string()
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  // .matches(/^\d{7,9}$/, "SSN No. must be 7-8 digits long"),
});

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { success, error, info } = useToast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userDetail = useAppSelector(selectCurrentUserDetail);
  const registerd = useAppSelector(isRegistered);
  const onSubmit = async (data: any) => {
    const userDetail: any = { ...data, updateToken: true, deviceToken: null };
    try {
      // await dispatch(login(userDetail));
      // if (localStorage.getItem("token")) {
      //   success("Login successful! 😀");
      // }
      // if (!registerd) {
      //   navigate("/driver/personal-information");
      // } else {
      //   navigate("/preview");
      // }
      navigate("/admin/product")
    } catch (error) {
      console.log("Login Error", error);
    }
  };
  // useEffect(() => {
  //   const checkAuthenticate = async () => {
  //     try {
  //       if (localStorage.getItem("token")) {
  //         let id = localStorage.getItem("Id");
  //         await dispatch(authenticate(id));
  //         if (!registerd) {
  //           navigate("/driver/personal-information");
  //         } else {
  //           navigate("/preview");
  //         }
  //       }
  //     } catch (err) {
  //       console.error("Authentication error:", err);
  //       setLoading(false);
  //       localStorage.clear();
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   checkAuthenticate();
  // }, [registerd]);

  if (loading) {
    // Show loader while loading
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f9f9f9", // Optional background color
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {!userDetail && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            bgcolor: "#DD781E",
            width: "100vw",
            p: 3,
            boxSizing: "border-box",
          }}
          className="water-mark"
        >
          <Box
            display={"flex"}
            sx={{
              width: "50%",
              boxSizing: "border-box",
            }}
            position={"absolute"}
            zIndex={999}
          >
            <Box
              className="login-image-box"
              sx={{
                flex: 1,
              }}
            ></Box>
            <Box
              sx={{
                paddingX: 3,
                flex: 1,
                paddingY: 4,
                background: "#DD781E",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              {/* <StyledLogoImage src="https://d29tl4qldq5y95.cloudfront.net/logo-light.webp" /> */}
              <Typography
                variant="h5"
                gutterBottom
                sx={{ textAlign: "center", color: "#f2f4f4" }}
              >
                Welcome to our manage Content and products seamlessly portal
              </Typography>

              <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Box>
                      <InputLabel
                        sx={{
                          color: "white !important",
                          fontWeight: "bold",
                          marginBottom: "8px",
                        }}
                      >
                        Email Id: {Asterisk}
                      </InputLabel>
                      <TextField
                        {...field}
                        variant="outlined"
                        fullWidth
                        // error={!!errors.applicationNo}
                        helperText={errors.email?.message}
                        InputProps={
                          {
                            // style: { color: "#fff" },
                          }
                        }
                        placeholder="example@gmail.com"
                        InputLabelProps={{
                          style: { color: "#ccc" },
                        }}
                        sx={{
                          "& .MuiFormHelperText-root": {
                            textAlign: "end",
                            color: "#01AAE9 !important",
                          },
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "#F2F4F4", // Change background color
                            color: "#121212",
                          },
                        }}
                      />
                    </Box>
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Box>
                      <InputLabel
                        sx={{
                          color: "white !important",
                          fontWeight: "bold",
                          marginBottom: "8px",
                        }}
                      >
                        Password: {Asterisk}
                      </InputLabel>
                      <TextField
                        {...field}
                        variant="outlined"
                        fullWidth
                        // error={!!errors.SSN}
                        helperText={errors.password?.message}
                        InputProps={
                          {
                            // style: { color: "#fff" },
                          }
                        }
                        InputLabelProps={{
                          style: { color: "#ccc" },
                        }}
                        sx={{
                          "& .MuiFormHelperText-root": {
                            textAlign: "end",
                            color: "#01AAE9 !important",
                          },
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "#F2F4F4", // Change background color
                            color: "#121212",
                          },
                        }}
                      />
                    </Box>
                  )}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: "#fff",
                    color: "#000",
                    textTransform: "none",
                    ":hover": {
                      bgcolor: "#1565C0",
                    },
                    py: 1,
                  }}
                >
                  Login
                </Button>
                {/* <Typography
                  variant="body2"
                  color="textSecondary"
                  textAlign={"center"}
                  sx={{ color: "#f2f4f4" }}
                >
                  By clicking "Submit," you consent to the processing of your
                  personal information as part of the application process.
                </Typography> */}
              </form>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Login;
