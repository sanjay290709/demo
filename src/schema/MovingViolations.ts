import * as Yup from "yup";

const MovingViolationsSchema = Yup.object().shape({
  users: Yup.array().of(
    Yup.object().shape({
      movingViolation: Yup.mixed().nullable(),
      violationDate: Yup.mixed().nullable(),
      violationCharge: Yup.mixed().nullable(),
      violationComVehicle: Yup.mixed().nullable(),
      drivingPenalty: Yup.mixed(),
      other: Yup.string().nullable(),
      countryENCode: Yup.string().nullable(),
      violationAddress: Yup.object({
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

export default MovingViolationsSchema;
