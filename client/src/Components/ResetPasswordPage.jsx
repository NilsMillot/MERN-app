/* eslint-disable react/prop-types */
import { Box, Button, Container, CssBaseline, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";
import ClosableAlert from "./ClosableAlert";

const ResetPasswordPage = () => {
  const params = useParams();
  const [goodLink, setGoodLink] = React.useState(true);
  const [isDisabledSubmit, setIsDisabledSubmit] = React.useState(false);
  const [alert, setAlert] = React.useState({
    opened: false,
    severity: "error",
    message: ""
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get("password").length > 7) {
      setAlert({
        opened: false,
        message: alert.message,
        severity: alert.severity
      });
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          password: data.get("password")
        })
      };
      fetch(
        `http://localhost:3000/password-reset/${params.userId}/${params?.token.replace(
          /---/g,
          "."
        )}`,
        requestOptions
      ).then((response) => {
        if (response.status === 200) {
          setAlert({
            opened: true,
            message: "Votre mot de passe a été mis à jour",
            severity: "success"
          });
          setIsDisabledSubmit(true);
        } else {
          setGoodLink(false);
        }
      });
    } else {
      setAlert({
        opened: true,
        message: "Votre mot de passe doit contenir au moins 8 caractères",
        severity: "error"
      });
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {goodLink ? (
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
          <Typography component="h1" variant="h5">
            Change ton mot de passe
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Nouveau mot de passe"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <ClosableAlert
                  severity={alert.severity}
                  message={alert.message}
                  onOpenAlert={alert.opened}
                  setOnOpenAlert={setAlert}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              disabled={isDisabledSubmit}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              {"Changer"}
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
          <Typography component="h1" variant="h5">
            Le lien semble invalide ou a expiré
          </Typography>
          <Link to="/">{"Page d'accueil"}</Link>
        </Box>
      )}
    </Container>
  );
};

export default ResetPasswordPage;
