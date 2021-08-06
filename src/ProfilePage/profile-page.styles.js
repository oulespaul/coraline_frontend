import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  paper: {
    margin: theme.spacing(22, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  media: {
    margin: "36px",
    width: "250px",
    height: "250px",
  },
  infoCard: {
    backgroundColor: "#a2c1e0",
    color: "whitesmoke",
  },
}));
