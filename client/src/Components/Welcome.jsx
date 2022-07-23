/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Welcome = () => {
  const params = useParams();
  const [goodLink, setGoodLink] = React.useState(false);
  useEffect(() => {
    if (params?.confirmationCode) {
      const requestOptions = {
        method: "GET"
      };

      fetch(
        `http://localhost:3000/sendMail/confirm/${params?.confirmationCode}`,
        requestOptions
      ).then((response) => {
        if (response.status === 200) {
          console.log(
            "%cWelcome.jsx line:20 params?.confirmationCode",
            "color: #007acc;",
            params?.confirmationCode
          );
          setGoodLink(true);
        }
      });
    }
  }, []);

  // TODO: Make beautiful UI
  if (goodLink) {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>Compte confirmé!</strong>
          </h3>
        </header>
        <Link to={"/login"}>Se connecter</Link>
      </div>
    );
  } else {
    return (
      <>
        {" "}
        <h3>Le lien que tu a reçu semble nul, contactez le support COMMUNITY</h3>
        <span>TODO: un lien /contact </span>
      </>
    );
  }
};

export default Welcome;
