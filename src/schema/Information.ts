import * as Yup from "yup";
const InformationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(
      /^[A-Za-zÀ-ÿ\s'-]+$/,
      "First name can only contain letters, spaces, apostrophes, and hyphens"
    )
    .required("This field is required."),
  lastName: Yup.string()
    .required("This field is required.")
    .matches(/^[A-Za-z]+$/, "Only alphabets are allowed for this field."),
  additionalName: Yup.string().nullable().matches(/^[A-Za-z\s]+$/, "Only alphabets and spaces are allowed."),
  gender: Yup.string().required("This field is required."),
  email: Yup.string()
    .email("Invalid email").matches(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/, "Invalid email")
    .required("This field is required."),
  countryENCode: Yup.string(),
  phoneNo: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("This field is required."),
  countryCode: Yup.string(),
  addressDetails: Yup.object({
    address: Yup.string()
      .min(5, "Address must be at least 5 characters long")
      .max(100, "Address must be less than or equal to 100 characters")
      .matches(
        /^[a-zA-Z0-9\s,.'-]+$/,
        "Address can only contain letters, numbers, spaces, commas, periods, and hyphens"
      )
      .required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
    zipCode: Yup.string()
      .matches(
        /^[A-Za-z0-9\s-]{3,10}$/, // Regex for general postal codes
        "Please enter a valid postal code"
      )
      .required("Postal code is required"),
  }),
  DOB: Yup.date()
    .required("Date of Birth is required")
    .max(new Date(), "Date of Birth cannot be in the future")
    .test("min-age", "You must be at least 21 years old", (value) => {
      const age = new Date().getFullYear() - value?.getFullYear();
      return age >= 21; // Checks if the user is at least 21 years old
    }),
  SSN: Yup.string()
    .matches(/^\d{9}$/, "SSN must be 9 digits")
    .required("This field is required."),
  endorsement: Yup.string().required("This field is required."),
  leadSource: Yup.string().required("This field is required."),
  ssnDoc: Yup.string().required("This field is required."),
  profilePic: Yup.string().required("This field is required."),
  residentFor3Year: Yup.boolean().required("This field is required."),
  readyForTeamUp: Yup.boolean().required("This field is required."),
  smsUpdates: Yup.string().required("This field is required."),
});

export default InformationSchema;
