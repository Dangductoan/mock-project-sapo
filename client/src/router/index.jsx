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
import BillAdd from "../page/bill/billadd/BillAdd";
import BillListPage from "../page/bill/billlist/BillListPage";
import BillCategory from "../page/billCategory/BillCategory"
import ChiefAccountant from "../page/chiefAccountant/ChiefAccountant";
import Home from "../page/home/Home";
import Login from "../page/login/Login";
import NotFound from "../page/notfound/NotFound";
import Support from "../page/support/Support";
import Report from "../page/report/Report";
import BillDetail from "../page/bill/billdetail/BillDetail";
import AccountantDetail from "../page/accountant/accountantdetail/AccountantDetail";
import AccountantAdd from "../page/accountant/accountantadd/AccountantAdd";
import AccountantListPage from "../page/accountant/accountantlist/AccountantListPage";
import AuthService from "../api/AuthService";
import CustomerDetail from "../page/customer/customerdetail/CustomerDetail";
import CustomerAdd from "../page/customer/customeradd/CustomerAdd";
import CustomerListPage from "../page/customer/customerlist/CustomerListPage";

function RouterDefined() {
  const user = AuthService.getUserFormLocalStorage();

  return (
    <Router>
      <Switch>
        {user && user.role.name === "ROLE_ACCOUNTANT" && (
          <Route path="/accountant/:path?/:path?" exact>
            <AccountantLayout>
              <Switch>
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
                <Route path="/*" exact component={NotFound} />
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
                  component={BillCategory}
                  exact
                />
                <Route
                  path="/chief-accountant/bills"
                  component={BillListPage}
                  exact
                />
                <Route
                  path="/chief-accountant/bills/create"
                  component={BillAdd}
                  exact
                />
                <Route
                  path="/chief-accountant/bills/:id"
                  component={BillDetail}
                  exact
                />
                <Route
                  path="/chief-accountant/report"
                  component={Report}
                  exact
                />
                <Route
                  path="/chief-accountant/users"
                  component={AccountantListPage}
                  exact
                /> <Route
                path="/chief-accountant/users/create"
                component={AccountantAdd}
                exact
              />
              <Route
                path="/chief-accountant/users/:id"
                component={AccountantDetail}
                exact
              />
               <Route
                  path="/chief-accountant/customers"
                  exact
                  component={CustomerListPage}
                />
                <Route
                  path="/chief-accountant/customers/create"
                  exact
                  component={CustomerAdd}
                />
                <Route
                  path="/chief-accountant/customers/:id"
                  exact
                  component={CustomerDetail}
                />
            
                <Route path="/*" exact component={NotFound} />
              </Switch>
            </ChiefLayout>
          </Route>
        )}

        <Route>
          <DefaultLayout>
            <Switch>
              <Route path="/about" component={About}>
                {redirectToDashboard("/about")}
              </Route>
              {/* <Route path="/customer" component={Customer}>
                {redirectToDashboard("/customer")}
              </Route> */}
              <Route path="/login" component={Login}>
                {redirectToDashboard("/login")}
              </Route>
              <Route path="/support" component={Support}>
                {redirectToDashboard("/support")}
              </Route>
              <Route path="/" exact component={Home}>
                {redirectToDashboard("/")}
              </Route>
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
        return null;
    }
  }
  return null;
}

function redirectToDashboard(baseRoute) {
  const user = AuthService.getUserFormLocalStorage();

  if (user) {
    switch (user.role?.name) {
      case "ROLE_ACCOUNTANT":
        return <Redirect to="/accountant" />;
      case "ROLE_CHIEF_ACCOUNTANT":
        return <Redirect to="/chief-accountant" />;
      default:
        return <Redirect to={baseRoute} />;
    }
  }
  return null;
}

export default RouterDefined;
