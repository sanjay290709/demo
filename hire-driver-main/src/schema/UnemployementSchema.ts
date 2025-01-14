import * as Yup from "yup";

const UnemployementSchema = Yup.object().shape({
    unemployed: Yup.boolean()
      .nullable()
      .required("Please specify if you are unemployed"),
    unemploymentDate: Yup.string()
      .nullable()
      .when("unemployed", (unemployed:any, schema) =>
        unemployed === true
          ? schema.required("Unemployment date is required")
          : schema
      ),
    unemploymentDuration: Yup.string()
      .nullable()
      .when("unemployed", (unemployed:any, schema) =>
        unemployed === true
          ? schema.required("Unemployment duration is required")
          : schema
      ),
    unemploymentDetail: Yup.string()
      .nullable()
      .when("unemployed", (unemployed:any, schema) =>
        unemployed === true
          ? schema.required("Unemployment detail is required")
          : schema
      ),
  });
  

export default UnemployementSchema;