import { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import { useStyles } from "./register.styles";
import handlePromise from "shared/handlePromise";
import postRegister from "./apis/postRegister";
import { AlertType, useAlert } from "shared/context/alertContext";
import AlertBox from "../shared/components/AlertBox";
import { useHistory } from "react-router";

export default function SignUp() {
  const classes = useStyles();
  const { dispatch } = useAlert();
  const history = useHistory();
  const initValue = {
    username: "",
    password: "",
  };
  const [value, setValue] = useState(initValue);

  const handleInputChange = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    const [, error] = await handlePromise(postRegister(value));

    if (error) {
      dispatch({
        type: AlertType.ERROR,
        payload: { message: "สมัครสมาชิกไม่สำเร็จ" },
      });

      return setValue(initValue);
    }

    dispatch({
      type: AlertType.SUCCESS,
      payload: { message: "สมัครสมาชิกสำเร็จ" },
    });
    return history.push("/login");
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            สมัครสมาชิก
          </Typography>

          <ValidatorForm className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextValidator
                  autoFocus
                  name="username"
                  variant="outlined"
                  label="username"
                  onChange={handleInputChange}
                  value={value.username}
                  fullWidth
                  validators={["required"]}
                  errorMessages={["กรุณากรอก username"]}
                />
              </Grid>

              <Grid item xs={12}>
                <TextValidator
                  autoFocus
                  name="password"
                  variant="outlined"
                  label="password"
                  onChange={handleInputChange}
                  value={value.password}
                  type="password"
                  fullWidth
                  validators={["required"]}
                  errorMessages={["กรุณากรอก password"]}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              สมัคร
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="/login"
                  variant="body2"
                  className={classes.loginText}
                >
                  มี Account อยู่แล้ว? เข้าสู่ระบบ
                </Link>
              </Grid>
            </Grid>
          </ValidatorForm>
        </div>
      </Container>

      <AlertBox />
    </>
  );
}
