import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import loginPic from "../assets/login-pic.jpg";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
import ClosableAlert from "./closableAlert";

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

export default function SignInPage() {
  let auth = React.useContext(AuthContext);
  let navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";

  const [alert, setAlert] = React.useState({
    opened: false,
    severity: "error",
    message: ""
  });

  const [emailInForm, setEmailInForm] = React.useState("");
  const [isForgotPwdButtonDisabled, setIsForgotPwdButtonDisabled] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let user = data.get("email");

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: data.get("email"),
        password: data.get("password")
      })
    };
    fetch("http://localhost:3000/login", requestOptions)
      .then((response) => {
        response.json().then((data) => {
          if (data?.token) {
            localStorage.setItem("token", data.token);
          }
          if (data?.email || data?.password) {
            setAlert({
              opened: true,
              message: "Email ou mot de passe incorrect",
              severity: "error"
            });
          }
          if (data?.pendingAccount) {
            setAlert({
              opened: true,
              message: "Votre compte n'est pas encore activé",
              severity: "error"
            });
          }
        });

        if (response.status === 200) {
          auth.signin(user, () => {
            navigate(from, { replace: true });
          });
        }
      })
      .catch((error) => {
        console.log("%cSignInPage.jsx line:81 error", "color: #007acc;", error);
      });
  };

  const handleClickForgotPwd = () => {
    fetch("http://localhost:3000/password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: emailInForm
      })
    }).then((response) => {
      if (response.status === 200) {
        setAlert({
          opened: true,
          message: "Vérifie tes mails, un lien pour résilier ton mot de passe vient de partir ;)",
          severity: "success"
        });
        setIsForgotPwdButtonDisabled(true);
      }
      if (response.status === 400) {
        setAlert({
          opened: true,
          message: "Impossible de réinitialiser le mot de passe",
          severity: "error"
        });
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${loginPic})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Se connecter
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Adresse mail"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => {
                  setEmailInForm(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <ClosableAlert
                severity={alert.severity}
                message={alert.message}
                onOpenAlert={alert.opened}
                setOnOpenAlert={setAlert}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Se connecter
              </Button>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Button
                  onClick={handleClickForgotPwd}
                  disabled={isForgotPwdButtonDisabled}
                  variant="body2">
                  Mot de passe oublié ?
                </Button>

                <Link href="/signUp" variant="body2">
                  {"Pas encore de compte? Inscris-toi!"}
                </Link>
              </Box>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
