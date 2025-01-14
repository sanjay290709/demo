import { createSlice } from "@reduxjs/toolkit";
import { client } from "../api/client";
import { createAppAsyncThunk } from "../app/withTypes";
import { RootState } from "../app/store";

export const login = createAppAsyncThunk("auth/login", async (data: any) => {
  try {
    const res = await client.post("/hireDriver/login", data, {});
    if (res?.data?.token) {
      console.log(res, "RES");
      localStorage.setItem(
        "userName",
        `${res?.data?.data?.firstName + " " + res?.data?.data?.lastName}`
      );
      localStorage.setItem("applicationNo", res?.data?.data?.applicationNo);
      localStorage.setItem("step", res?.data?.data?.step);
      localStorage.setItem("Id", res?.data?.data?.id);
      localStorage.setItem("token", res?.data?.token);
      localStorage.setItem("Authentication", "true");
      return data;
    }
  } catch (error) {
    console.log(error, "Check ERROR");
  }
});

export const logout = createAppAsyncThunk(
  "auth/logout",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await client.post(
        "/hireDriver/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        }
      );
      localStorage.clear();
      return res;
    } catch (error: any) {
      console.error("Logout failed:", error);
      return rejectWithValue(error.response?.data || "Logout failed");
    }
  }
);

export const authenticate = createAppAsyncThunk(
  "/hireDriver/getHireDriverDetail",
  async (id: any, { rejectWithValue }) => {
    try {
      const resposne: any = await client.get(
        `/hireDriver/getHireDriverDetail/${id}`
      );
      return resposne?.data?.data;
    } catch (error: any) {
      localStorage.clear();

      return rejectWithValue(
        error?.response?.data ||
          "An error occurred while fetching driver details"
      );
    }
  }
);

const initialState = {
  userDetail: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.userDetail = action.payload;
        state.isLoading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.userDetail = null;
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userDetail = action.payload;
      });
  },
});

export default authSlice.reducer;

export const selectCurrentUserDetail = (state: RootState) =>
  state.auth.userDetail;
