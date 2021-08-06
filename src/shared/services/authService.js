import apiAxios from "shared/apis/apiAxios";
import apiLogin from "shared/apis/apiLogin";
import handlePromise from "shared/handlePromise";

class AuthService {
  signIn = async (credentials) => {
    const [{ data }, error] = await handlePromise(apiLogin(credentials));

    if (error) throw new Error(error);

    return this.setSession(data.accessToken);
  };

  signOut = () => {
    return this.setSession(null);
  };

  setSession = (accessToken) => {
    if (accessToken) {
      localStorage.setItem("access_token", accessToken);

      apiAxios.defaults.headers.common["Authorization"] = accessToken;
    } else {
      localStorage.removeItem("access_token");

      delete apiAxios.defaults.headers.common["Authorization"];
    }
  };
}

const AuthInstance = new AuthService();

export default AuthInstance;
