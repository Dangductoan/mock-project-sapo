import React, { useEffect, useState } from 'react'
import CustomerService from "../../api/CustomerService";
import FormCustomer from "../../component/form/FormCustomer";
import ListCustomer from "../../component/list/ListCustomer";
import './ManageCustomer.css'
import { toast } from "react-toastify";
import ToastifyToast from "../../component/toast/template/ToastifyToast";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function ManageCustomer(props) {
  const history = useHistory;
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({});
  const [showFormUpdate, setShowFormUpdate] = useState(false);
  const [showFormCreate, setShowFormCreate] = useState(false);
  const [index, setIndex] = useState();
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);
  const [del,setDel] = useState(false)
  const [check, setCheck] = useState([])

  const handleClick = () => {
    setShowFormCreate(!showFormCreate);
  };
  useEffect(() => {
    CustomerService.getCustomer().then((res) => {
      const data = res.data;
      console.log(data);
      setCustomers(data.customers);
    });
  }, [create, update,del]);
  const handleCreate = () => {
    setCreate(!create);
  };
  const handleUpdate = () => {
    setUpdate(!update);
  };
  const handleDelete=()=>{
    if(check==[]){
      console.log("nothing on checked")
  
    }
    else{
    check.map(id =>{
      CustomerService.deleteCustomer(id).
      then(res=> setDel(!del)).
      then(()=>{
        showToast("Xóa khách hàng thành công", "success");
        history.push("/accountant/customer")
    })
  
    })
    
  }
  }
  const showToast = (message, type) => {
    if (type === "error") toast.error(message);
    else toast.success(message);
  };
  return (
    <>
      <div className="manageCustomer ml-230">
        <div className="manageCustomer-header">
          <h2 className="manageCustomer-title">Danh sách khách hàng</h2>
          <div className="manageCustomer-btn ">
            <button onClick={handleClick} className="btn">
              Thêm khách hàng
            </button>
          </div>
        </div>
        <div className="manageCustomer-content">
          <div className="manageCustomer-table">
            <div className="column">
              <h5>Mã khách hàng</h5>
              <h5>Tên khách hàng</h5>
              <h5>Số điện thoại</h5>
              <h5>Nhóm khách hàng</h5>
              <h5>Nhân viên phụ trách</h5>
              <h5>Địa chỉ</h5>
              <h5>Email</h5>
            </div>
            {customers.map((customers) => {
              const {
                id,
                code,
                name,
                phoneNumber,
                groupCustomer,
                createdBy,
                address,
                createdAt,
                email
              } = customers;
              const data = customers.createdAt.toString().slice(0,10);

              return (
                <ListCustomer
                  key={id}
                  index={id}
                  code={code}
                  name={name}
                  phoneNumber={phoneNumber}
                  groupCustomer={groupCustomer}
                  createdBy={createdBy}
                  address={address}
                  createdAt={data}
                  email={email}
                  show={showFormUpdate}
                  setShow={setShowFormUpdate}
                  setIndex={setIndex}
                  setCustomer={setCustomer}
                  check={check}
                  setCheck={setCheck}
                />
              );
            })}
             <button className='btn' style={{float:"right"}} onClick={handleDelete}>Xóa</button>

          </div>
        </div>
        <ToastifyToast />
      </div>

      {showFormUpdate && (
        <FormCustomer
          title="Cập nhật khách hàng"
          action="Lưu"
          show={showFormUpdate}
          setShow={setShowFormUpdate}
          id={index}
          cus={customer}
          handleUpdate={handleUpdate}
          showToast={showToast}
        />
      )}
      {showFormCreate && (
        <FormCustomer
          title="Thêm khách hàng"
          action="Thêm"
          show={showFormCreate}
          setShow={setShowFormCreate}
          handleCreate={handleCreate}
          showToast={showToast}

        />
      )}
    </>
  );
}

export default ManageCustomer;
