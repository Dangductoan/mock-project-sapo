import {
  faDownload,
  faMagnifyingGlass,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import BillCategoryService from "../../../api/BillCategoryService";
import BillService from "../../../api/BillService";
import CustomerService from "../../../api/CustomerService";
import Filter from "../../../component/filter/Filter";
import SingleModal from "../../../component/modal/singlemodal/SingleModal";
import ReactNumberTextFormat from "../../../component/numberformat/template/ReactNumberTextFormat";
import MaterialPagination from "../../../component/pagination/template/MaterialPagination";
import CircularIndeterminate from "../../../component/progress/CircularProgress";
import { VIETNAME_DATE_FORMAT } from "../../../constant/DateFormat";
import "./BillListPage.css";
import { exportBillList } from "./excel";
const ITEM_PER_PAGE = 20;

function BillListPage() {
  let user = JSON.parse(localStorage.getItem("user"));
  const match = useRouteMatch();
  const history = useHistory();

  const [bills, setBills] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [openExportExcelModal, setOpenExportExcelModal] = useState(false);
  const [searchParams, setSearchParams] = useState({
    query: "",
    customerId: null,
    billCategoryId: null,
    page: 0,
    size: ITEM_PER_PAGE,
    payment: "",
    start: "",
    end: "",
    createdBy: "",
  });
  const [fileExcelExportType, setFileExcelExportType] =
    useState("current-page");

  let totalPage =
    totalItem % ITEM_PER_PAGE === 0
      ? totalItem / ITEM_PER_PAGE
      : Math.floor(totalItem / ITEM_PER_PAGE) + 1;

  useEffect(() => {
    BillService.searchBill(searchParams)
      .then((res) => setBills(res.data?.bills))
      .catch((err) => console.log(err));
    BillService.count(searchParams)
      .then((res) => setTotalItem(res.data?.count))
      .catch((err) => console.log(err));
  }, [
    searchParams.billCategoryId,
    searchParams.createdBy,
    searchParams.customerId,
    searchParams.end,
    searchParams.page,
    searchParams.payment,
    searchParams.query,
    searchParams.start,
  ]);

  useEffect(() => {
    setFileExcelExportType("current-page");
  }, [openExportExcelModal]);

  const handlePaginationChange = (event, page) => {
    setSearchParams({ ...searchParams, page: page - 1 });

    BillService.searchBill(searchParams)
      .then((res) => setBills(res.data?.bills))
      .catch((err) => console.log(err));
  };

  const handleExportBillListExcel = () => {
    document
      .getElementById("circular-progress")
      .classList.toggle("circular-progress-show");

    if (fileExcelExportType === "current-page") {
      mapDataAndExport(bills);
    } else if (fileExcelExportType === "all") {
      BillService.searchBill({
        query: searchParams.query,
        customerId: searchParams.customerId,
        billCategoryId: searchParams.billCategoryId,
        payment: searchParams.payment,
        start: searchParams.start,
        end: searchParams.end,
        createdBy: searchParams.createdBy,
      })
        .then((res) => {
          mapDataAndExport(res.data?.bills);
        })
        .catch((err) => console.log(err));
    }
    setTimeout(() => {
      document
        .getElementById("circular-progress")
        .classList.toggle("circular-progress-show");
    }, 500);
  };

  const mapDataAndExport = async (data) => {
    data = data.map((bill) => ({
      ...bill,
      customerName: bill.customer.name,
      billCategoryName: bill.billCategory.name,
      createdAt: moment(bill.createdAt).format("DD/MM/YYYY HH:mm"),
      modifiedAt: moment(bill.modifiedAt).format("DD/MM/YYYY HH:mm"),
    }));
    let title = "L???C THEO:";
    if (searchParams.customerId) {
      let res = await CustomerService.getCustomer(searchParams.customerId);
      title += " Kh??ch h??ng: " + res.data?.customer?.name + ",";
    }
    if (searchParams.billCategoryId) {
      let res = await BillCategoryService.getById(searchParams.billCategoryId);
      title += " Lo???i phi???u thu: " + res.data?.data?.name + ",";
    }
    if (searchParams.payment !== "") {
      title += " H??nh th???c thanh to??n: " + searchParams.payment + ",";
    }
    if (searchParams.createdBy !== "") {
      title += " Ng?????i t???o: " + searchParams.createdBy + ",";
    }
    if (searchParams.start !== "" && searchParams.end !== "") {
      title +=
        " Th???i gian: T??? " +
        moment(searchParams.start).format(VIETNAME_DATE_FORMAT) +
        " ?????n " +
        moment(searchParams.end).format(VIETNAME_DATE_FORMAT) +
        ",";
    }
    title = title.substring(0, title.length - 1);
    if (title === "L???C THEO") title = "";

    exportBillList(title, data);
    setOpenExportExcelModal(false);
  };

  return (
    <div className="bill-list">
      <div className="bill-header">
        <h2>Phi???u thu</h2>
        <div className="bill-header__right">
          <p>Xin ch??o "{user.name}"</p>
        </div>
      </div>
      <div className="bill-option">
        <div className="option-excel">
          <div
            className="export-excel"
            onClick={() => setOpenExportExcelModal(true)}
          >
            <FontAwesomeIcon icon={faDownload} className="svg-khutx" />
            <span>Xu???t file</span>
          </div>
        </div>
        <button
          className="btn-create btn__icon"
          onClick={() => history.push(`${match.path}/create`)}
        >
          <FontAwesomeIcon icon={faPlus} />
          T???o phi???u thu
        </button>
      </div>
      <div className="bill-list-content">
        <div className="bill-list-filter">
          <Filter
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          <div className="bill-searchbar searchbar">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="svg-khutx" />
            <input
              type="text"
              placeholder="T??m theo m?? phi???u, t??n kh??ch h??ng, lo???i phi???u, h??nh th???c thanh to??n v?? ng?????i t???o"
              onKeyPress={(e) => {
                if (e.key === "Enter")
                  setSearchParams({
                    ...searchParams,
                    page: 0,
                    query: e.target.value,
                  });
              }}
            />
          </div>
        </div>
        <div>
          <table className="bill-table">
            <thead>
              <tr>
                <th>M?? phi???u</th>
                <th>Kh??ch h??ng</th>
                <th>Lo???i phi???u</th>
                <th>H??nh th???c thanh to??n</th>
                <th>Ng?????i t???o</th>
                <th className="table__price">S??? ti???n thu</th>
                <th className="table__price">Ng??y ghi nh???n</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill) => {
                return (
                  <tr
                    key={bill.id}
                    onClick={() => history.push(`${match.path}/${bill.id}`)}
                  >
                    <td>{bill.code}</td>
                    <td>{bill.customer.name}</td>
                    <td>{bill.billCategory.name}</td>
                    <td>{bill.payment}</td>
                    <td>{bill.createdBy}</td>
                    <td className="table__price">
                      <ReactNumberTextFormat value={bill.totalValue} />
                    </td>
                    <td className="table__price">
                      {moment(bill.createdAt).format("DD/MM/YYYY HH:mm")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          {totalItem > 0 ? (
            <MaterialPagination
              count={totalPage}
              page={searchParams.page + 1}
              onChange={handlePaginationChange}
            />
          ) : (
            <p>Kh??ng t??m th???y k???t qu??? n??o</p>
          )}
        </div>
      </div>
      <div className="model-overlay"></div>
      <SingleModal
        open={openExportExcelModal}
        setOpen={setOpenExportExcelModal}
        title="X??c nh???n xu???t file Excel"
        onConfirm={handleExportBillListExcel}
        className="bill-export"
      >
        <div className="bill-export--chosen">
          <legend>Ch???n lo???i file:</legend>
          <div>
            <input
              type="radio"
              id="current-page"
              name="drone"
              value="current-page"
              defaultChecked
              onChange={(e) => setFileExcelExportType(e.target.value)}
            />
            <label for="current-page">Xu???t phi???u thu ??? trang hi???n t???i</label>
          </div>
          <div>
            <input
              type="radio"
              id="all"
              name="drone"
              value="all"
              onChange={(e) => setFileExcelExportType(e.target.value)}
            />
            <label for="all">
              Xu???t to??n b??? phi???u thu ???? l???c(t??m ki???m) ???????c
            </label>
          </div>
        </div>
      </SingleModal>
      <CircularIndeterminate />
    </div>
  );
}

export default BillListPage;
