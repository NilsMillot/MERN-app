import { Button } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useAuth } from "../utils/auth";
import ClosableAlert from "./closableAlert";

export default function ProfilePage() {
  const auth = useAuth();
  const [isSendingResetPwd, setIsSendingResetPwd] = React.useState(false);
  const [openValidationSentAlert, setOpenValidationSentAlert] = React.useState(false);

  const handleClickForgetPassword = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: auth?.email
      })
    };
    fetch("http://localhost:3000/password-reset", requestOptions).then((response) => {
      if (response.status === 200) {
        setIsSendingResetPwd(true);
        setOpenValidationSentAlert(true);
      }
    });
  };
  return (
    <Container component="main" maxWidth="lg">
      <Button onClick={handleClickForgetPassword} variant="body2" disabled={isSendingResetPwd}>
        Forgot password?
      </Button>
      <ClosableAlert
        message="Vérifie tes mails, un lien pour résilier ton mot de passe vient de partir ;)"
        onOpenAlert={openValidationSentAlert}
        setOnOpenAlert={setOpenValidationSentAlert}
      />
    </Container>
  );
}
