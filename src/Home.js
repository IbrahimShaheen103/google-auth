import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      navigate("about", { state: codeResponse });
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  return (
    <div>
      <h1>Home</h1>
      <p>Home page</p>
      <button onClick={() => login()}>Login</button>
    </div>
  );
};

export default Home;
