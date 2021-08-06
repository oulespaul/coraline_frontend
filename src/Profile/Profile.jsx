import { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import Avatar from "@material-ui/core/Avatar";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import { useStyles } from "./profile.styles";
import handlePromise from "shared/handlePromise";

import { AlertType, useAlert } from "shared/context/alertContext";
import AlertBox from "../shared/components/AlertBox";

import createProfile from "./apis/createProfile";
import updateProfile from "./apis/updateProfile";
import uploadProfileImage from "./apis/uploadProfileImage";
import getProfile from "./apis/getProfile";

import { useHistory } from "react-router";
import { useEffect } from "react";

export default function Profile() {
  const classes = useStyles();
  const { dispatch } = useAlert();
  const history = useHistory();
  const initValue = {
    firstName: "",
    lastName: "",
    birthday: "",
    phone: "",
    email: "",
    educations: "",
  };
  const [value, setValue] = useState(initValue);
  const [profileImage, setProfileImage] = useState({ file: 0, imageUrl: "" });
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    (async () => {
      const [res, error] = await handlePromise(getProfile());

      if (error) {
        return;
      }

      if (res.data.profileImage) {
        setProfileImage({
          imageUrl: `${process.env.REACT_APP_API_ENDPOINT}/${res.data.profileImage}`,
        });
      }

      setIsNew(false);
      return setValue(res.data);
    })();
  }, []);

  const handleInputChange = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    if (isNew) {
      if (!profileImage.file) {
        return dispatch({
          type: AlertType.ERROR,
          payload: { message: "กรุณาอัพโหลดรูปภาพ" },
        });
      }

      var [, errorCreate] = await handlePromise(createProfile(value));

      const [, uploadError] = await handlePromise(
        uploadProfileImage(profileImage.file)
      );

      if (uploadError) {
        dispatch({
          type: AlertType.ERROR,
          payload: { message: "อัพโหลดรูปภาพ Profile ไม่สำเร็จ" },
        });
        return setValue(initValue);
      }
    } else {
      var [, errorUpdate] = await handlePromise(updateProfile(value, value.id));
    }

    if (errorCreate || errorUpdate) {
      dispatch({
        type: AlertType.ERROR,
        payload: { message: "อัพเดต profile ไม่สำเร็จ" },
      });

      return setValue(initValue);
    }

    dispatch({
      type: AlertType.SUCCESS,
      payload: { message: "อัพเดต profile สำเร็จ" },
    });

    return history.push("/login");
  };

  const handleUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsBinaryString(file);

    reader.onload = () => {
      setProfileImage({
        file,
        imageUrl: `data:${file.type};base64,${btoa(reader.result)}`,
      });
    };
  };

  return (
    <>
      <Container component="main" maxWidth="sm">
        <CssBaseline />

        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            สร้าง Profile
          </Typography>

          <ValidatorForm className={classes.form} onSubmit={handleSubmit}>
            {profileImage.imageUrl ? (
              <Grid container justifyContent="center">
                <Avatar
                  alt="profile-image"
                  src={profileImage.imageUrl}
                  className={classes.media}
                />
              </Grid>
            ) : (
              <Grid
                container
                direction="column"
                alignItems="flex-end"
                justifyContent="center"
              >
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={handleUploadClick}
                />
                <label htmlFor="contained-button-file">
                  <Fab component="span" className={classes.button}>
                    <AddPhotoAlternateIcon />
                  </Fab>
                </label>

                <Typography variant="caption">
                  *ไฟล์ต้องเป็น .jpg, .png เท่านั้น
                </Typography>
              </Grid>
            )}

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextValidator
                  autoFocus
                  name="firstName"
                  variant="outlined"
                  label="ขื่อ"
                  onChange={handleInputChange}
                  value={value.firstName}
                  fullWidth
                  validators={["required"]}
                  errorMessages={["กรุณากรอก ชื่อ"]}
                />
              </Grid>

              <Grid item xs={12}>
                <TextValidator
                  autoFocus
                  name="lastName"
                  variant="outlined"
                  label="นามสกุล"
                  onChange={handleInputChange}
                  value={value.lastName}
                  fullWidth
                  validators={["required"]}
                  errorMessages={["กรุณากรอก นามสกุล"]}
                />
              </Grid>

              <Grid item xs={12}>
                <TextValidator
                  autoFocus
                  name="phone"
                  variant="outlined"
                  label="เบอร์โทรศัพท์"
                  onChange={handleInputChange}
                  value={value.phone}
                  fullWidth
                  validators={["required"]}
                  errorMessages={["กรุณากรอก เบอร์โทรศัพท์"]}
                />
              </Grid>

              <Grid item xs={12}>
                <TextValidator
                  autoFocus
                  name="birthday"
                  variant="outlined"
                  label="วันเกิด"
                  onChange={handleInputChange}
                  value={value.birthday}
                  fullWidth
                  validators={["required"]}
                  placeholder="ตัวอย่าง 1998-05-15"
                  errorMessages={["กรุณากรอก วันเกิด"]}
                />
              </Grid>

              <Grid item xs={12}>
                <TextValidator
                  autoFocus
                  name="email"
                  variant="outlined"
                  label="Email"
                  onChange={handleInputChange}
                  value={value.email}
                  fullWidth
                  validators={["required", "isEmail"]}
                  errorMessages={["กรุณากรอก Email", "Email ไม่ถูกต้อง"]}
                />
              </Grid>

              <Grid item xs={12}>
                <TextValidator
                  autoFocus
                  name="educations"
                  variant="outlined"
                  label="Educations"
                  onChange={handleInputChange}
                  value={value.educations}
                  fullWidth
                  multiline
                  rows={4}
                  validators={["required"]}
                  errorMessages={["กรุณากรอก educations"]}
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
              อัพเดต Profile
            </Button>

            {!isNew && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                onClick={() => history.push(`/profile/${value.id}`)}
                className={classes.profilePreview}
              >
                ดู Profile
              </Button>
            )}

            <Button
              type="submit"
              fullWidth
              onClick={() => history.push("/login")}
              variant="contained"
            >
              กลับ
            </Button>
          </ValidatorForm>
        </div>
      </Container>

      <AlertBox />
    </>
  );
}
