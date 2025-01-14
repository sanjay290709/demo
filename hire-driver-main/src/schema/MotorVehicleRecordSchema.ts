import * as Yup from "yup";

const MotorVehicleRecordSchema = Yup.object().shape({
  revokedLicenses: Yup.mixed().nullable(),
  drivingConvictions: Yup.mixed().nullable(),
  drugConvictions: Yup.mixed().nullable(),
  medicalCardDoc: Yup.mixed().nullable(),
  dmvDoc: Yup.mixed().nullable(),
});

export default MotorVehicleRecordSchema;
