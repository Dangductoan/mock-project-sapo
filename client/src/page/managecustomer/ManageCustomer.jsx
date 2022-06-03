import React, { useEffect, useState } from 'react'
import CustomerService from "../../api/CustomerService";
import FormCustomer from "../../component/form/FormCustomer";
import ListCustomer from "../../component/list/ListCustomer";
import './ManageCustomer.css'

function ManageCustomer(props) {
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({});
  const [showFormUpdate, setShowFormUpdate] = useState(false);
  const [showFormCreate, setShowFormCreate] = useState(false);
  const [index, setIndex] = useState();
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);
  

  const handleClick = () => {
    setShowFormCreate(!showFormCreate);
  };
  useEffect(() => {
    CustomerService.getCustomer().then((res) => {
      const data = res.data;
      console.log(data);
      setCustomers(data.customers);
    });
  }, [create, update]);
  const handleCreate = () => {
    setCreate(!create);
  };
  const handleUpdate = () => {
    setUpdate(!update);
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
              <input
                className="checkAllAccountant"
                type="checkbox"
                data-indeterminate="false"
                value=""
              />
              <h5>Mã khách hàng</h5>
              <h5>Tên khách hàng</h5>
              <h5>Số điện thoại</h5>
              <h5>Nhóm khách hàng</h5>
              <h5>Nhân viên phụ trách</h5>
              <h5>Địa chỉ</h5>
              <h5>Ngày tạo</h5>
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
              } = customers;
              return (
                <ListCustomer
                  key={id}
                  index={id}
                  code={code}
                  name={name}
                  phone={phoneNumber}
                  groupCustomer={groupCustomer}
                  createdBy={createdBy}
                  address={address}
                  createdAt={createdAt}
                  show={showFormUpdate}
                  setShow={setShowFormUpdate}
                  setIndex={setIndex}
                  setCustomer={setCustomer}
                />
              );
            })}
          </div>
        </div>
        {/* footer */}
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
        />
      )}
      {showFormCreate && (
        <FormCustomer
          title="Thêm khách hàng"
          action="Thêm"
          show={showFormCreate}
          setShow={setShowFormCreate}
          handleCreate={handleCreate}
        />
      )}
    </>
  );
}

export default ManageCustomer;
