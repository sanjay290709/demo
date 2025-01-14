import * as Yup from "yup";

const QualificationSchema = Yup.object().shape({
  eligibleInUs: Yup.boolean().required(
    "Please indicate if you are legally eligible to work in the U.S."
  ),
  positiveDrugTest: Yup.boolean().required(
    "Please indicate if you have ever tested positive or refused a test"
  ),
  provideRTDDoc: Yup.boolean().required(
    "Please indicate whether you can provide documentation for the DOT return to duty process"
  ),
  isVeteran: Yup.boolean().required(
    "Please indicate whether you are a veteran"
  ),
  serveInMilitary: Yup.boolean()
    .nullable()
    .test(
      "serve-in-military-required", // Custom test name
      "Please specify your military service details", // Error message if the test fails
      function (value) {
        const { isVeteran } = this.parent; // Access `isVeteran` value from the parent object
        if (isVeteran === true && !value) {
          return false; // Fail validation if `isVeteran` is true and `serveInMilitary` is empty
        }
        return true; // Pass validation if `isVeteran` is false or `serveInMilitary` has a value
      }
    ),
  driveInMilitary: Yup.boolean()
    .nullable()
    .test(
      "drive-in-military-required", // Custom test name
      "Please specify your military driving experience", // Error message if the test fails
      function (value) {
        const { isVeteran } = this.parent; // Access `isVeteran` value from the parent object
        if (isVeteran === true && !value) {
          return false; // Fail validation if `isVeteran` is true and `driveInMilitary` is empty
        }
        return true; // Pass validation if `isVeteran` is false or `driveInMilitary` has a value
      }
    ),
  drivingLicenseNo: Yup.string()
    .matches(/^[A-Za-z0-9]+$/, "License number must be alphanumeric") // Allows only letters and numbers
    .min(6, "License number must be at least 6 characters")
    .max(12, "License number must be at most 12 characters")
    .required("Please provide a valid driver's license number"),
  twicCardNo: Yup.string().nullable()
    .test(
      "is-valid-twicCardNo",
      "TWIC card number must be exactly 8 characters long and alphanumeric",
      (value) => !value || /^[A-Za-z0-9]{8}$/.test(value)
    ),
  twicCardExpDate: Yup.string().nullable(),
  CDLExpDate: Yup.string().required(
    "Driving license expiration date is required"
  ),
  licenseClass: Yup.string().required("License class is required"),
  yearsOfComExp: Yup.string().required("Experience is required"),
  jobType: Yup.array()
    .min(1, "At least one item is required") // Ensure array has at least one item
    .required("Items are required"),
  drivingLicenseNoDoc: Yup.string().required("License doc is required"),
  twicCardNoDoc: Yup.string().required("TWIC doc is required"),
});

export default QualificationSchema;
