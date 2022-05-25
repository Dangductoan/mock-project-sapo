import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import UserService from "../src/services/UserService";
import { UserContext } from "./context";
import AdminLayout from "./layouts/AdminLayout";
import GuestLayout from "./layouts/GuestLayout";
import TestPage from "./pages/Test/TestPage";
import "./styles/index.css";

function App() {
  let user = UserService.getUserFromStorage();
  const [userContext, setUserContext] = useState(null);

  function toggleUserContext(useContext) {
    setUserContext(useContext);
  }

  return (
    <div className="App">
      <UserContext.Provider value={{ userContext, toggleUserContext }}>
        <Switch>
          {user && user.roles.includes("ROLE_ADMIN") && (
            <Route path="/admin" component={AdminLayout} />
          )}
          <Route path="/test" component={TestPage} />
          <Route path="/" component={GuestLayout} />
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
