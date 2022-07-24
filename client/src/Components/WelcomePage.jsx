/* eslint-disable react/prop-types */
import { Box, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const WelcomePage = () => {
  const params = useParams();
  const [goodLink, setGoodLink] = React.useState(false);
  useEffect(() => {
    if (params?.confirmationCode) {
      const requestOptions = {
        method: "GET"
      };

      fetch(`http://localhost:3000/confirm/${params?.confirmationCode}`, requestOptions).then(
        (response) => {
          if (response.status === 200) {
            setGoodLink(true);
          }
        }
      );
    }
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
        {goodLink ? (
          <>
            <Typography component="h1" variant="h5">
              Compte confirmé!
            </Typography>
            <Link to={"/login"} variant="body2" style={{ marginTop: "20px" }}>
              Se connecter
            </Link>
          </>
        ) : (
          <Typography component="h1" variant="h5">
            Le lien que tu a reçu semble nul :(
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default WelcomePage;
