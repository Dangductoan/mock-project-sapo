import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import AccountantLayout from "../layout/accountantlayout/AccountantLayout";
import { ChiefLayout } from "../layout/ChiefLayout";
import { DefaultLayout } from "../layout/DefaultLayout";

import About from "../page/about/About";
import Accountant from "../page/accountant/Accountant";
import BillAdd from "../page/bill/billadd/BillAdd";
import BillListPage from "../page/bill/billlist/BillListPage";
import BillCategory from "../page/billCategory/BillCategory";
import ChiefAccountant from "../page/chiefAccountant/ChiefAccountant";
import Customer from "../page/customer/Customer";
import Home from "../page/home/Home";
import Login from "../page/login/Login";
import ManageAccountant from "../page/manageaccountant/ManageAccountant";
import ManageCustomer from "../page/managecustomer/ManageCustomer";
import NotFound from "../page/notfound/NotFound";
import Support from "../page/support/Support";
import Report from "../page/report/Report";
import BillDetail from "../page/bill/billdetail/BillDetail";

import AuthService from "../api/AuthService";

function RouterDefined() {
  const user = AuthService.getUserFormLocalStorage();

  return (
    <Router>
      <Switch>
        {user && user.role.name === "ROLE_ACCOUNTANT" && (
          <Route path="/accountant/:path?/:path?" exact>
            <AccountantLayout>
              <Switch>
                <Route path="/accountant" exact component={Accountant} />
                <Route
                  path="/accountant/bills"
                  exact
                  component={BillListPage}
                />
                <Route
                  path="/accountant/bills/create"
                  exact
                  component={BillAdd}
                />
                <Route
                  path="/accountant/bills/:id"
                  exact
                  component={BillDetail}
                />
                <Route path="/*"  component={NotFound} />
              </Switch>
            </AccountantLayout>
          </Route>
         )}
        {user && user.role.name === "ROLE_CHIEF_ACCOUNTANT" && (
          <Route path="/chief-accountant/:path?/:path?" exact>
            <ChiefLayout>
              <Switch>
                <Route
                  path="/chief-accountant"
                  exact
                  component={ChiefAccountant}
                />
                <Route
                  path="/chief-accountant/bill-category"
                  exact
                  component={BillCategory}
                />
                 <Route
                  path="/chief-accountant/bills"
                  exact
                  component={BillListPage}
                />
                 <Route
                  path="/chief-accountant/bills/create"
                  exact
                  component={BillAdd}
                />
                 <Route
                  path="/chief-accountant/report"
                  exact
                  component={Report}
                />
                <Route
                  path="/chief-accountant/user"
                  exact
                  component={ManageAccountant}
                />
                <Route
                  path="/chief-accountant/customer"
                  exact
                  component={ManageCustomer}
                />
                <Route path="/*"  component={NotFound} />
              </Switch>
            </ChiefLayout>
          </Route>
           )}   

        <Route>
          <DefaultLayout>
            <Switch>
              <Route path="/about" component={About} />
              <Route path="/customer" component={Customer} />
              <Route path="/login" component={Login} />
              <Route path="/support" component={Support} />
              <Route path="/" exact component={Home} />
              <Route path="/*" exact component={NotFound}>
                {redirectToNotFoundPage}
              </Route>
            </Switch>
          </DefaultLayout>
        </Route>
      </Switch>
    </Router>
  );
}

function redirectToNotFoundPage() {
  const user = AuthService.getUserFormLocalStorage();

  if (user) {
    switch (user.role?.name) {
      case "ROLE_ACCOUNTANT":
        return <Redirect to="/accountant/404" />;
      case "ROLE_CHIEF_ACCOUNTANT":
        return <Redirect to="/chief-accountant/404" />;
      default:
        break;
    }
  }
  return null;
}

export default RouterDefined;
