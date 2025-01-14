import * as Yup from "yup";

const AccidentSchema = Yup.object().shape({
  users: Yup.array().of(
    Yup.object().shape({
      accident: Yup.boolean().nullable(),
      accidentDate: Yup.string()
        .nullable()
        .test(
          "accident-date-required", // Custom test name
          "Accident date is required", // Error message if test fails
          function (value) {
            const { accident } = this.parent; // Get the `accident` value from the parent object
            if (accident === true && !value) {
              return false; // Fail validation if accident is true and value is empty
            }
            return true; // Pass validation if `accident` is false or value is provided
          }
        ),
      accidentComVehicle: Yup.boolean().nullable(),
      accidentPreventable: Yup.boolean().nullable(),
      accidentDetails: Yup.string().nullable(),
      accidentAddress: Yup.object({
        city: Yup.string().nullable(),
        state: Yup.string().nullable(),
        country: Yup.string().nullable(),
        zipCode: Yup.string()
          .nullable()
          .test(
            "valid-zip", // Custom test name
            "Please enter a valid postal code", // Error message
            function (value) {
              // Check if zipCode exists and apply regex if it does
              if (value && !/^[A-Za-z0-9\s-]{3,10}$/.test(value)) {
                return false; // Fail validation if the regex doesn't match
              }
              return true; // Pass if zipCode is null or empty or matches the regex
            }
          ),
      }),
      countryENCode: Yup.string().nullable(),
    })
  ),
});

export default AccidentSchema;
