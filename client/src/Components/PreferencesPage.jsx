import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../utils/auth";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

export default function PreferencesPage() {
  const auth = useAuth();
  // const [isSendingResetPwd, setIsSendingResetPwd] = React.useState(false);
  // const [openValidationSentAlert, setOpenValidationSentAlert] = React.useState(false);

  // const handleClickForgetPassword = () => {
  //   const requestOptions = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     }
  //     },
  //     body: JSON.stringify({
  //       email: auth?.email
  //     })
  //   };
  //   fetch("http://localhost:3000/password-reset", requestOptions).then((response) => {
  //     if (response.status === 200) {
  //       setIsSendingResetPwd(true);
  //       setOpenValidationSentAlert(true);
  //     }
  //   });
  // };
  // const arrTechnos = ["React", "TS", "Javascript", "php", "docker"];
  const [arrFavoriteTechnos, setArrFavoriteTechnos] = useState([]);

  console.log(
    "%cPreferencesPage.jsx line:33 arrFavoriteTechnos",
    "color: #007acc;",
    arrFavoriteTechnos
  );

  const handleSubmitPref = () => {
    // const requestOptions = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     preferedStack: arrFavoriteTechnos
    //   })
    // };
    if (arrFavoriteTechnos.length > 0) {
      // fetch("http://localhost:3000/password-reset", requestOptions).then((response) => {
      //   if (response.status === 200) {
      //     setIsSendingResetPwd(true);
      //     setOpenValidationSentAlert(true);
      //   }
      // });
      console.log("soumettre mes prefs");
    }
  };

  return (
    <>
      <h1>Par quelles technos êtes vous intéressé?</h1>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
          label="React"
          onChange={(e) => {
            e.target.checked
              ? setArrFavoriteTechnos([...arrFavoriteTechnos, "React"])
              : setArrFavoriteTechnos(arrFavoriteTechnos.filter((techno) => techno !== "React"));
          }}
        />
        <FormControlLabel
          control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
          label="JS"
          onChange={(e) => {
            e.target.checked
              ? setArrFavoriteTechnos([...arrFavoriteTechnos, "JS"])
              : setArrFavoriteTechnos(arrFavoriteTechnos.filter((techno) => techno !== "JS"));
          }}
        />
        <FormControlLabel
          control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
          label="Docker"
          onChange={(e) => {
            e.target.checked
              ? setArrFavoriteTechnos([...arrFavoriteTechnos, "Docker"])
              : setArrFavoriteTechnos(arrFavoriteTechnos.filter((techno) => techno !== "Docker"));
          }}
        />
        <FormControlLabel
          control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
          label="PHP"
          onChange={(e) => {
            e.target.checked
              ? setArrFavoriteTechnos([...arrFavoriteTechnos, "PHP"])
              : setArrFavoriteTechnos(arrFavoriteTechnos.filter((techno) => techno !== "PHP"));
          }}
        />
        ;
        {/* {arrTechnos.map((techno, index) => {
          return (
            <FormControlLabel
              key={index}
              control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
              label={techno}
              checked={arrFavoriteTechnos.includes(techno)}
              onChange={(e) => {
                e.target.checked
                  ? setArrFavoriteTechnos([...arrFavoriteTechnos, techno])
                  : setArrFavoriteTechnos(arrFavoriteTechnos.filter((techno) => techno !== techno));
              }}
            />
          );
        })} */}
      </FormGroup>
      <Button onClick={handleSubmitPref}>Envoyer</Button>
    </>
  );
}
