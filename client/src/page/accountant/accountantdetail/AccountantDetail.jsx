import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { useEffect } from "react";
import {
  useHistory, useLocation,
  useParams, useRouteMatch
} from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import AccountantService from "../../../api/AccountantService";
import ToastifyToast from "../../../component/toast/template/ToastifyToast";
import {
  VIETNAMESE_ADDRESS_REGEX,
  VIETNAMESE_NAME_REGEX,
  VIETNAM_PHONE_REGEX
} from "../../../constant/regex";
import "./AccountantDetail.css";

export default function AccountantDetail() {
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
  let user = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  if (!parseInt(id))
    history.push(`${match.path.substring(0, match.path.indexOf("/"))}/404`);

  useEffect(() => {
    if (location.state?.showAccountantAddSuccess)
      toast.success("Thêm nhân viên thành công");
  }, [location.state?.showAccountantAddSuccess]);

  useEffect(() => {
    AccountantService.getAccountant(id)
      .then((res) => {
        accountant.setValues(res.data?.user);
      })
      .catch(({ res }) => console.log(res.data?.error?.message));
  }, [id]);

  const accountant= useFormik({
    initialValues: {
      name: '',
      username: '',
      password: '',
      phoneNumber: '',
      address: ''
    },
    validationSchema: validateAccountant,
    onSubmit: (accountant) => {
      AccountantService.updateAccountant(id, {
        ...accountant
      })
        .then((res) => {
          showToast("Cập nhật nhân viên thành công", "success");
          setTimeout(()=>{
            history.push("/chief-accountant/users")
         },2000) 
        })
        .catch(({ response }) => {
          showToast(response.data?.error?.message, "error");
        });
    
    }
  });


  const deleteAccountant = () => {
    AccountantService.deleteAccountant(id)
      .then((res) => {
        showToast("Xóa nhân viên thành công", "success");
       setTimeout(()=>{
         history.push("/chief-accountant/users")
      },2000) 
      })
      .catch(({ response }) => {
        showToast(response.data?.error?.message, "error");
      });
  };

  const showToast = (message, type) => {
    if (type === "error") toast.error(message);
    else toast.success(message);
  };



  return (
    <div className="accountant-add">
      <div
        className="accountant-bread-crumb"
        onClick={() =>
          history.push(
            `${match.path.substring(0, match.path.lastIndexOf("/"))}`
          )
        }
      >
        <FontAwesomeIcon icon={faAngleLeft} style={{ marginRight: "10px" }} />
        <span>Danh sách nhân viên</span>
      </div>
      <div className="accountant-heading">
        <h2>Thông tin chi tiết nhân viên</h2>
      </div>
      <form onSubmit={accountant.handleSubmit}>
      <div className="accountant-content">
        <div className="accountant-info">
          <h3>Thông tin chung</h3>
          <div>
            <div>
              <p>Tên</p>
              <input
                type="text"
                name="name"
                onChange={accountant.handleChange}
                onBlur={accountant.handleBlur}
                value={accountant.values?.name}
              />
              {accountant.touched.name && accountant.errors.name && (
                  <div className="text-danger">{accountant.errors.name}</div>
                )}
              
            </div>
            <div>
              <p>Tên đăng nhập</p>
              <input
                type="text"
                name="username"
                onChange={accountant.handleChange}
                onBlur={accountant.handleBlur}
                value={accountant.values?.username}
              />
               {accountant.touched.name && accountant.errors.name && (
                  <div className="text-danger">{accountant.errors.name}</div>
                )}
              
            </div>
            <div>
              <p>Mật khẩu</p>
              <input
                type="password"
                name="password"
                onChange={accountant.handleChange}
                value={accountant.values?.password}
                
              />
            </div>
            <div>
              <p>Số điện thoại</p>
              <input
                type="text"
                name="phoneNumber"
                onChange={accountant.handleChange}
                onBlur={accountant.handleBlur}
                value={accountant.values?.phoneNumber}
              />
               {accountant.touched.name && accountant.errors.name && (
                  <div className="text-danger">{accountant.errors.name}</div>
                )}
              
            </div>
            <div>
              <p>Địa chỉ</p>
              <input
                type="text"
                name="address"
                onChange={accountant.handleChange}
                onBlur={accountant.handleBlur}
                value={accountant.values?.address}
              
              />
               {accountant.touched.name && accountant.errors.name && (
                  <div className="text-danger">{accountant.errors.name}</div>
                )}
              
              </div>
            </div>
          </div>
      </div>
      <div className="accountant-add-submit">
        <button className="btn-create" type="submit">
          Lưu
        </button>
     {user.id != id &&   
          <button className="btn-delete" type="button" onClick={deleteAccountant}>
          Xóa
        </button>
      }
      </div>
      </form>
      <ToastifyToast />
    </div>
  );
}
const validateAccountant= Yup.object().shape({
  name: Yup.string()
  .required("Tên không được để trống")
  .matches(VIETNAMESE_NAME_REGEX, "Tên không chứa số, ký tự đặc biệt"),
  username:Yup.string()
  .required("Tên tài khoản không được để trống"),
  phoneNumber: Yup.string()
  .required("Số điện thoại không được để trống")
  .matches(VIETNAM_PHONE_REGEX, "Số điện thoại không hợp lệ (gồm 10 chữ số ..)"),
  address: Yup.string().matches(
  VIETNAMESE_ADDRESS_REGEX,   
  "Địa chỉ không chứa ký tự đặc biệt"
),
});
