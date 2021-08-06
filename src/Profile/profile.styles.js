import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(16),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    display: "none",
  },
  button: {
    color: "#0d47a1",
    margin: 10,
  },
  media: {
    margin: "36px",
    width: "150px",
    height: "150px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#a2c1e0",
  },
  profilePreview: {
    margin: theme.spacing(0, 0, 2),
  },
}));
