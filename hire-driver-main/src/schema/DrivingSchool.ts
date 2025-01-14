import * as Yup from "yup";

const DrivingSchoolSchema = (isVeteran) =>
  Yup.object().shape({
    schoolName: Yup.string()
      .nullable()
      .when([], {
        is: () => isVeteran,
        then: (schema) => schema.required("School name is required"),
      }),
    schoolStartDate: Yup.string()
      .nullable()
      .when([], {
        is: () => isVeteran,
        then: (schema) => schema.required("School start date is required"),
      }),
    schoolEndDate: Yup.string()
      .nullable()
      .when([], {
        is: () => isVeteran,
        then: (schema) => schema.required("School end date is required"),
      }),
    email: Yup.string()
      .nullable()
      .when([], {
        is: () => isVeteran,
        then: (schema) => schema.required("Email is required"),
      }),
    countryENCode: Yup.string()
      .nullable()
      .when([], {
        is: () => isVeteran,
        then: (schema) => schema.required("Country EN Code is required"),
      }),
    countryCode: Yup.string()
      .nullable()
      .when([], {
        is: () => isVeteran,
        then: (schema) => schema.required("Country code is required"),
      }),
    phone: Yup.string()
      .nullable()
      .when([], {
        is: () => isVeteran,
        then: (schema) => schema.required("Phone is required"),
      }),
    fax: Yup.string()
      .nullable()
      .when([], {
        is: () => isVeteran,
        then: (schema) => schema.required("Fax is required"),
      }),
    subjectToFMCSR: Yup.boolean()
      .nullable()
      .when([], {
        is: () => isVeteran,
        then: (schema) => schema.required("FMCSR field is required"),
      }),
    addressDetails: Yup.object().shape({
      city: Yup.string()
        .nullable()
        .when([], {
          is: () => isVeteran,
          then: (schema) => schema.required("City is required"),
        }),
      state: Yup.string()
        .nullable()
        .when([], {
          is: () => isVeteran,
          then: (schema) => schema.required("State is required"),
        }),
      country: Yup.string()
        .nullable()
        .when([], {
          is: () => isVeteran,
          then: (schema) => schema.required("Country is required"),
        }),
      zipCode: Yup.string()
        .matches(
          /^[A-Za-z0-9\s-]{3,10}$/, // Regex for general postal codes
          "Please enter a valid postal code"
        )
        .nullable()
        .when([], {
          is: () => isVeteran,
          then: (schema) => schema.required("Zip code is required"),
        }),
    }),
  });

export default DrivingSchoolSchema;
