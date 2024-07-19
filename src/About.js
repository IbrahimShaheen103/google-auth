import { googleLogout } from "@react-oauth/google";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const About = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (state?.access_token) {
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
          console.log(res);
        })
        .catch((err) => {
          console.error("Failed to fetch user profile", err);
          navigate("/");
        });
    } else {
      navigate("/");
    }

    return () => {
      setProfile(null);
    };
  }, [navigate, state]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
    navigate("/");
  };

  return (
    <div className="about-container">
      {profile ? (
        <div className="profile-card">
          <img src={profile.picture} alt="user" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <p className="loading">Loading...</p>
      )}
    </div>
  );
};

export default About;
