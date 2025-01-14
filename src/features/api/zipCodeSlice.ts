import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiEndpoints } from "../../constant/endpoints";
export const fetchCityState = createAsyncThunk(
  "zipcode/fetchCityState",
  async (
    {
      zipcode,
      countryName,
      isoCode,
    }: { zipcode: string; countryName: string; isoCode: string },
    { rejectWithValue }
  ) => {
    console.log(zipcode, countryName, isoCode, "check all values");
    const params = new URLSearchParams({
      qq: `postalCode=${zipcode};country=${countryName}`,
      in: `countryCode:${isoCode}`,
      apiKey: "YUJmQ5qt-vtGQR3EGsfVxjglkWW3dXF3xpvmGnOqyhs",
    });

    try {
      const response = await fetch(
        `${apiEndpoints.geoCode}?${params.toString()}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      const { city, state } = data.items[0].address;
      if (data.items.length === 0) {
        return rejectWithValue("Error fetching city and state");
      }
      return { city, state };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCityStateByZipcode = async ({
  zipcode,
  countryName,
  isoCode,
}: {
  zipcode: string;
  countryName: string;
  isoCode: string;
}) => {
  const params = new URLSearchParams({
    qq: `postalCode=${zipcode};country=${countryName}`,
    in: `countryCode:${isoCode}`,
    apiKey: "YUJmQ5qt-vtGQR3EGsfVxjglkWW3dXF3xpvmGnOqyhs",
  });

  try {
    const response = await fetch(
      `${apiEndpoints.geoCode}?${params.toString()}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    console.log(data  , "data")
    const { city, state } = data.items[0].address;
    if (data.items.length === 0) {
      return "Error fetching city and state";
    }
    return { city, state };
  } catch (error) {
    return error.message;
  }
};

const zipcodeSlice = createSlice({
  name: "zipcode",
  initialState: {
    city: "",
    state: "",
    loading: false,
    error: null,
    isd: "+1",
    countryName: "United States",
    countryENCode: "US",
    index: null,
  },
  reducers: {
    setISDCode(state: any, action) {
      const { country, isd, iso } = action.payload;
      state.isd = isd;
      state.countryENCode = iso;
      state.countryName = country;
    },
    setIndex(state, action) {
      console.log(action.payload, "Check Par");
      state.index = action.payload ? action.payload : 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCityState.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCityState.fulfilled, (state, action) => {
        state.loading = false;
        state.city = action.payload.city;
        state.state = action.payload.state;
      })
      .addCase(fetchCityState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setISDCode, setIndex } = zipcodeSlice.actions;
export default zipcodeSlice.reducer;
export const selectZipCode = (state: any) => state.zipcode;
export const selectIndex = (state: any) => state.zipcode.index;
