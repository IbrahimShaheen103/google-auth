import { googleLogout } from "@react-oauth/google";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const About = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    if (state) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${state.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${state.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [state]);
  const logOut = () => {
    googleLogout();
    setProfile(null);
    navigate("/");
  };
  return (
    <div className="about-container">
      {profile && (
        <div>
          <img src={profile.picture} alt="user" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      )}
    </div>
  );
};

export default About;
