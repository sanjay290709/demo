import * as Yup from "yup";

const AuthorizationSchema = Yup.object().shape({
  signature: Yup.string().required('This field is required'),
  isChecked: Yup.boolean().required('You must agree to the declaration before proceeding.')
})

export default AuthorizationSchema;