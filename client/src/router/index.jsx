import React from "react";
import Home from "../page/home/Home";
import About from "../page/about/About";
import Login from "../page/login/Login";
import Support from "../page/support/Support";
import Customer from "../page/customer/Customer";
import { DefaultLayout } from "../layout/DefaultLayout";
import AccountantLayout from "../layout/accountantlayout/AccountantLayout";
import { ChiefLayout } from "../layout/ChiefLayout";
import NotFound from "../page/notfound/NotFound";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ChiefAccountant from "../page/chiefAccountant/ChiefAccountant";
import BillCategory from "../page/billCategory/BillCategory";
import Accountant from "../page/accountant/Accountant";
import ManageAccountant from "../page/manageAccountant/ManageAccountant";
import ManageCustomer from "../page/manageCustomer/ManageCustomer";

function RouterDefined() {
  return (
    <Router>
      <Switch>
        <Route path="/accountant/:path?" exact>
          <AccountantLayout>
            <Switch>
              <Route path="/accountant" exact component={Accountant} />
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
                path="/chief-accountant/accountant"
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
              <Route path="/login" component={Login} />
              <Route path="/support" component={Support} />
              <Route path="/" exact component={Home} />
              <Route path="/*" exact component={NotFound} />
            </Switch>
          </DefaultLayout>
        </Route>
      </Switch>
    </Router>
  );
}

export default RouterDefined;
