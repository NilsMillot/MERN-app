import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../App";
import { v4 as uuidv4 } from "uuid";
import ClosableAlert from "./ClosableAlert";
import CenteredSnackbar from "./CenteredSnackBar";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="/">
        COMMUNITY
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUpPage() {
  let auth = React.useContext(AuthContext);
  const [openValidationSentAlert, setOpenValidationSentAlert] = React.useState(false);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const uniqueId = uuidv4();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: data.get("email"),
        password: data.get("password"),
        firstname: data.get("firstName"),
        confirmationCode: uniqueId
      })
    };
    fetch("http://localhost:3000/register", requestOptions).then((response) => {
      if (response.status === 422) {
        setOpenSnackBar(true);
      }
      if (response.status === 201) {
        auth.signin(undefined, () => {
          const requestOpts = {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              mailTo: data.get("email"),
              confirmationCode: uniqueId,
              firstName: data.get("firstName")
            })
          };
          fetch("http://localhost:3000/validationAccountLink", requestOpts).then((response) => {
            if (response.status === 201) {
              setOpenSnackBar(false);
              setOpenValidationSentAlert(true);
            } else {
              setOpenSnackBar(false);
              alert("The server can't send you email :(");
            }
          });
        });
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Se créer un compte
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Prénom"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Adresse mail"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <ClosableAlert
                  severity="success"
                  message="Vérifie ta boîte mail pour confirmer ton compte :)"
                  onOpenAlert={openValidationSentAlert}
                  setOnOpenAlert={setOpenValidationSentAlert}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={openValidationSentAlert}
              sx={{ mt: 3, mb: 2 }}>
              {"S'enregistrer"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Déjà un compte? Connecte toi
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
        <CenteredSnackbar
          message="Le nom ou le mot de passe est trop court ou bien l'adresse mail est déjà utilisée/est mal formatée"
          openSnackBar={openSnackBar}
          setOpenSnackBar={setOpenSnackBar}
        />
      </Container>
    </ThemeProvider>
  );
}
