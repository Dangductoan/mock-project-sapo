import React from "react";
import Home from "../page/home/Home";
import About from "../page/about/About";
import Login from "../page/login/Login";
import Support from "../page/support/Support";
import Customer from "../page/customer/Customer";
import { DefaultLayout } from "../layout/DefaultLayout";
import  AccountantLayout from "../layout/accountantlayout/AccountantLayout";
import { ChiefLayout } from "../layout/ChiefLayout";
import NotFound from "../page/notfound/NotFound";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ChiefAccountant from "../page/chiefAccountant/ChiefAccountant";
import BillCategory from "../page/billCategory/BillCategory";
import Accountant from "../page/accountant/Accountant";
import ManageAccountant from "../page/manageaccountant/ManageAccountant";
import ManageCustomer from "../page/managecustomer/ManageCustomer";
import {AuthProvider} from '../component/authencontext/AuthenProvide'
import { RequireAuth } from "../component/authencontext/RequireAuth";
import Report from '../page/report/Report'
function RouterDefined() {
  return (
   <AuthProvider>
    <Router>
   {/* < RequireAuth> */}
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
                path="/chief-accountant/report"
                component={Report}
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
              <Route path="/login" component={Login} />
              <Route path="/support" component={Support} />
              <Route path="/" exact component={Home} />
              <Route path="/*" exact component={NotFound} />
            </Switch>
          </DefaultLayout>
        </Route>
      </Switch>
      {/* </RequireAuth> */}
    </Router>
    </AuthProvider>
  );
}

export default RouterDefined;
