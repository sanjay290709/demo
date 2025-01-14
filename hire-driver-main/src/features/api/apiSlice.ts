import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiEndpoints } from '../../constant/endpoints';



export const apiSlice = createApi({
    reducerPath: "api",

    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BASE_URL}),
    tagTypes: [],
    endpoints: (builder) => ({
        documentUpload: builder.mutation<any , FormData>({
            query: (body: any) => ({
                url: apiEndpoints.documentUpload,
                method: "POST",
                body,
                formData: true
              }),
        })
    })
})

export const {useDocumentUploadMutation} = apiSlice;