import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { DefaultLayout } from "../layout/DefaultLayout";
import AccountantLayout from "../layout/accountantlayout/AccountantLayout";
import { ChiefLayout } from "../layout/ChiefLayout";

import Home from "../page/home/Home";
import About from "../page/about/About";
import Login from "../page/login/Login";
import Support from "../page/support/Support";
import Customer from "../page/customer/Customer";
import NotFound from "../page/notfound/NotFound";
import ChiefAccountant from "../page/chiefAccountant/ChiefAccountant";
import BillCategory from "../page/billCategory/BillCategory";
import Accountant from "../page/accountant/Accountant";
import ManageAccountant from "../page/manageaccountant/ManageAccountant";
import ManageCustomer from "../page/managecustomer/ManageCustomer";
import BillListPage from "../page/bill/billlist/BillListPage";
import BillAdd from "../page/bill/billadd/BillAdd";

import { AuthProvider } from "../component/authencontext/AuthenProvide";
import { RequireAuth } from "../component/authencontext/RequireAuth";

function RouterDefined() {
  return (
      <Router>
        <RequireAuth>
          <Switch>
            <Route path="/accountant/:path?/:path?" exact>
              <AccountantLayout>
                <Switch>
                  <Route path="/accountant" exact component={Accountant} />
                  <Route path="/accountant/bills" exact component={BillListPage} />
                  <Route path="/accountant/bills/create" exact component={BillAdd} />
                  <Route path="/*" exact component={NotFound} />
                </Switch>
              </AccountantLayout>
            </Route>
            <Route path="/chief-accountant/:path?" exact>
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
                  />
                  <Route
                    path="/chief-accountant/user"
                    component={ManageAccountant}
                  />
                  <Route
                    path="/chief-accountant/customer"
                    component={ManageCustomer}
                  />
                  <Route path="/*" exact component={NotFound} />
                </Switch>
              </ChiefLayout>
            </Route>

            <Route>
              <DefaultLayout>
                <Switch>
                  <Route path="/about" component={About} />
                  <Route path="/customer" component={Customer} />
                  {/* <Route path="/login" component={Login} /> */}
                  <Route path="/support" component={Support} />
                  <Route path="/" exact component={Home} />
                  <Route path="/*" exact component={NotFound} />
                </Switch>
              </DefaultLayout>
            </Route>
          </Switch>
        </RequireAuth>
      </Router>
  );
}

export default RouterDefined;
