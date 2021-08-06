import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

import AlertBox from "../shared/components/AlertBox";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useStyles } from "./profile-page.styles";
import handlePromise from "shared/handlePromise";

import getProfilePublish from "./apis/getProfilePublish";

function ProfilePage() {
  const classes = useStyles();
  const { profileId } = useParams();
  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    phone: "",
    email: "",
    educations: "",
  });

  useEffect(() => {
    (async () => {
      const [res, error] = await handlePromise(getProfilePublish(profileId));

      if (error) {
        return;
      }

      return setValue({
        ...res.data,
        imageUrl: `${process.env.REACT_APP_API_ENDPOINT}/${res.data.profileImage}`,
      });
    })();
  }, [profileId]);

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Typography component="h1" variant="h2">
              {value.firstName} {value.lastName}
            </Typography>

            <Avatar
              alt="profile-image"
              src={value.imageUrl}
              className={classes.media}
            />
          </div>
        </Grid>

        <Grid
          item
          container
          alignItems="center"
          xs={12}
          sm={12}
          md={6}
          justifyContent="center"
          component={Paper}
          elevation={6}
          className={classes.infoCard}
        >
          <Grid item container direction="column" md={8}>
            <Typography component="h1" align="left" variant="h3" gutterBottom>
              Birthday: {value.birthday}
            </Typography>

            <Typography component="h1" align="left" variant="h3" gutterBottom>
              Tel: {value.phone}
            </Typography>

            <Typography component="h1" align="left" variant="h4" gutterBottom>
              Email: {value.email}
            </Typography>

            <Typography component="h1" align="left" variant="h4" gutterBottom>
              My Educations: {value.educations}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <AlertBox />
    </>
  );
}

export default ProfilePage;
