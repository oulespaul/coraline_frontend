import { Switch, Route, Redirect } from "react-router-dom";

import { Login } from "./Login";
import { Register } from "./Register";
import { Profile } from "./Profile";
import { ProfilePage } from "./ProfilePage";

import ProtectedRoute from "shared/components/ProtectedRoute";

import { AlertProvider } from "shared/context/alertContext";

function App() {
  return (
    <AlertProvider>
      <Switch>
        <Route path="/register" component={Register} />

        <Route path="/login" component={Login} />

        <Route path="/profile/:profileId" component={ProfilePage} />

        <ProtectedRoute path="/Profile" component={Profile} />

        <Redirect to="/login" />
      </Switch>
    </AlertProvider>
  );
}

export default App;
