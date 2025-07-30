import * as yup from "yup";

export const ChangePasswordSchema = yup.object().shape({
  newPassword: yup.string().required("Please input your new password"),
  oldPassword: yup.string().required("Please input your old password!"),
});
