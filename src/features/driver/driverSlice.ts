import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiEndpoints } from "../../constant/endpoints";
import { setDrivingExperience, setIsRegistered, setIsVeteran, setProgressStep } from "../api/globalStateSlice";

// import { useToast } from "../../context/ToastContext";
interface PersonalInformation {
  name?: string;
  age?: number;
  address?: string;
  isRegistered?:boolean
  // Add any other fields as per your API requirements
}
interface ApiResponse {
  success: boolean;
  message: string;
}

const HireDriverTags = {
  HireDriver: "HireDriver",
};

export const driverSlice = createApi({
  reducerPath: "driverApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [HireDriverTags.HireDriver],
  endpoints: (builder) => ({
    getDriverInformation: builder.query<any, any>({
      query: (id) => `${apiEndpoints.driverInformation}/${id}`,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          if (response?.data?.data) {
            dispatch(setProgressStep(response?.data?.data?.step));
            dispatch(
              setIsVeteran(response?.data?.data?.otherDetails?.isVeteran)
            );
            dispatch(setDrivingExperience(response?.data?.data?.yearsOfComExp))
            dispatch(setIsRegistered(response?.data?.data?.isRegistered))
          }
        } catch (error) {
          console.error("Error fetching driver information:", error);
        }
      },
      providesTags: [HireDriverTags.HireDriver],
    }),
    addPersonalInformation: builder.mutation<ApiResponse, PersonalInformation>({
      query: (body) => ({
        url: apiEndpoints.personalInformAtion,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result) => (result ? [HireDriverTags.HireDriver] : []),
    }),
    addQualificationInfo: builder.mutation<any, any>({
      query: (body) => ({
        url: apiEndpoints.qualificationInformation,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result) => (result ? [HireDriverTags.HireDriver] : []),
    }),
    addMotorVehicleInformation: builder.mutation<any, any>({
      query: (body) => ({
        url: apiEndpoints.motorVehicleRecordInformation,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result) => (result ? [HireDriverTags.HireDriver] : []),
    }),
    addPreviousEmployerInformation: builder.mutation<any, any>({
      query: (body) => ({
        url: apiEndpoints.PreviousEmployerInformation,
        method: "POST",
        body,
      }),
    }),
    addMotorVehicleViolationInformation: builder.mutation<any, any>({
      query: (body) => ({
        url: apiEndpoints.violationData,
        method: "POST",
        body,
      }),
      invalidatesTags: (result) => (result ? [HireDriverTags.HireDriver] : []),
    }),
    addAccidentInformation: builder.mutation<any, any>({
      query: (body) => ({
        url: apiEndpoints.addAccidentInformation,
        method: "POST",
        body,
      }),
      invalidatesTags: (result) => (result ? [HireDriverTags.HireDriver] : []),
    }),
    addDrivingSchoolInformation: builder.mutation<any, any>({
      query: (body) => ({
        url: apiEndpoints.addDrivingSchoolData,
        method: "POST",
        body,
      }),
      invalidatesTags: (result) => (result ? [HireDriverTags.HireDriver] : []),
    }),
    addMilitaryInformation: builder.mutation<any, any>({
      query: (body) => ({
        url: apiEndpoints.addMilitaryInformation,
        method: "POST",
        body,
      }),
      invalidatesTags: (result) => (result ? [HireDriverTags.HireDriver] : []),
    }),
  }),
});

export const {
  useAddPersonalInformationMutation,
  useAddQualificationInfoMutation,
  useAddMotorVehicleInformationMutation,
  useAddPreviousEmployerInformationMutation,
  useGetDriverInformationQuery,
  useAddMotorVehicleViolationInformationMutation,
  useAddAccidentInformationMutation,
  useAddDrivingSchoolInformationMutation,
  useAddMilitaryInformationMutation,
} = driverSlice;
