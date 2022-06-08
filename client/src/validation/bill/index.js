import * as Yup from "yup";
import { CODE_REGEX } from "../../utils/regex";

export const validateBillCreate = Yup.object().shape({
  billCategoryName: Yup.string().required("Chưa chọn Loại phiếu thu"),
  customerName: Yup.string().required("Chưa chọn tên khách hàng"),
  code: Yup.string()
    .required("Chưa nhập mã phiếu thu")
    .matches(
      CODE_REGEX,
      "Mã phiếu thu chỉ chứa chữ hoa và số, không chứa dấu cách"
    ),
  payment: Yup.string().required("Chưa chọn hình thức thanh toán"),
  totalValue: Yup.string().required("Chưa nhập giá trị phiếu thu"),
  description: Yup.string().notRequired(),
});

export const validateBillUpdate = Yup.object().shape({
  code: Yup.string()
    .required("Chưa nhập mã phiếu thu")
    .matches(
      CODE_REGEX,
      "Mã phiếu thu chỉ chứa chữ hoa và số, không chứa dấu cách"
    ),
  totalValue: Yup.string().required("Chưa nhập giá trị phiếu thu"),
  description: Yup.string().notRequired(),
});
