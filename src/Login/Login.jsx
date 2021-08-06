import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import AlertBox from "../shared/components/AlertBox";

import { useStyles } from "./login.styles";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import AuthService from "shared/services/authService";
import handlePromise from "shared/handlePromise";
import { AlertType, useAlert } from "shared/context/alertContext";

function SignInSide() {
  const classes = useStyles();
  const history = useHistory();
  const initCredential = {
    username: "",
    password: "",
  };
  const [credentials, setCredential] = useState(initCredential);
  const { dispatch } = useAlert();

  const handleFormChange = (event) => {
    setCredential({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const submitLogin = async (event) => {
    event.preventDefault();

    const [, error] = await handlePromise(AuthService.signIn(credentials));

    if (error) {
      return dispatch({
        type: AlertType.ERROR,
        payload: { message: "username หรือ password ไม่ถูกต้อง" },
      });
    }

    return history.push("/profile");
  };

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />

        <Grid item xs={false} sm={4} md={7} className={classes.image} />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Typography component="h1" variant="h2">
              Coraline Profile
            </Typography>

            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={credentials.username}
                autoComplete="username"
                onChange={handleFormChange}
                autoFocus
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                value={credentials.password}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleFormChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={submitLogin}
              >
                เข้าสู่ระบบ
              </Button>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    href="/register"
                    variant="body2"
                    className={classes.registerText}
                  >
                    {"สมัครสมาชิก"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>

      <AlertBox />
    </>
  );
}

export default SignInSide;
