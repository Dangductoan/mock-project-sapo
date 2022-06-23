import * as Yup from "yup";
import {
  CODE_REGEX,
  VIETNAMESE_NAME_REGEX,
  VIETNAM_PHONE_REGEX,
  VIETNAMESE_ADDRESS_REGEX
} from "../../constant/regex";

export const validateCustomerCreate = Yup.object().shape({
  name: Yup.string()
    .required("Tên không được để trống")
    .matches(VIETNAMESE_NAME_REGEX, "Tên không chứa số, ký tự đặc biệt"),
  code: Yup.string()
    .required("Code không được để trống")
    .matches(CODE_REGEX, "Code chỉ chứa chữ hoa và số, không có khoảng trắng"),
  phoneNumber: Yup.string()
    .required("Số điện thoại không được để trống")
    .matches(VIETNAM_PHONE_REGEX, "Số điện thoại không hợp lệ"),
  address: Yup.string().matches(
    VIETNAMESE_ADDRESS_REGEX,
    "Địa chỉ không chứa ký tự đặc biệt"
  ),
  email: Yup.string().email("Email không hợp lệ"),
  groupCustomer: Yup.string().required("Vui lòng chọn nhóm khách hàng"),
});
