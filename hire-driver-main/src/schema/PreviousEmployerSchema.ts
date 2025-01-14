import * as Yup from "yup";

// Updated validation schema
const PreviousEmployerSchema = Yup.object().shape({
  users: Yup.array().of(
    Yup.object().shape({
      companyName: Yup.string().nullable(),
      startDate: Yup.string().required("Start date is required"),
      endDate: Yup.string().nullable(),
      email: Yup.string().email("Invalid email format").nullable(),
      countryENCode: Yup.string().nullable(),
      countryCode: Yup.string().nullable(),
      phone: Yup.string().nullable(),
      fax: Yup.string().nullable(),
      position: Yup.string().nullable(),
      reasonOfLeaving: Yup.string().nullable(),
      isCurrentEmployer: Yup.boolean().nullable(),
      operatedComVehicle: Yup.boolean().nullable(),

      // Nested address details validation
      addressDetails: Yup.object().shape({
        address: Yup.string()
          .min(5, "Address must be at least 5 characters long")
          .max(100, "Address must be less than or equal to 100 characters")
          .matches(
            /^[a-zA-Z0-9\s,.'-]+$/,
            "Address can only contain letters, numbers, spaces, commas, periods, and hyphens"
          )
          .nullable(),
        city: Yup.string().nullable(),
        state: Yup.string().nullable(),
        country: Yup.string().nullable(),
        zipCode: Yup.string()
          .matches(
            /^[A-Za-z0-9\s-]{3,10}$/, // Regex for general postal codes
            "Please enter a valid postal code"
          )
          .nullable(),
      }),
    })
  ),
});

export default PreviousEmployerSchema;
