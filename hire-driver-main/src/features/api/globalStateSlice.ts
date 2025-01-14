import { createSlice } from "@reduxjs/toolkit";

const globalStateSlice = createSlice({
  name: "globalState",
  initialState: {
    isVeteran: null,
    step: 0,
    drivingExperience: null,
    isRegistered: false,
  },
  reducers: {
    setIsVeteran(state: any, action) {
      state.isVeteran = action.payload;
    },
    setProgressStep(state, action) {
      state.step = action.payload;
    },
    setDrivingExperience(state, action) {
      state.drivingExperience = action.payload;
    },
    setIsRegistered(state, action) {
      state.isRegistered = action.payload;
    },
  },
});
export const { setIsVeteran, setProgressStep , setDrivingExperience , setIsRegistered } = globalStateSlice.actions;
export default globalStateSlice.reducer;
export const selectVeteran = (state: any) => state.globalState.isVeteran;
export const selectProgresStep = (state: any) => state.globalState.step;
export const selectDrivingExperience = (state: any) => state.globalState.drivingExperience;
export const isRegistered = (state: any) => state.globalState.isRegistered;
