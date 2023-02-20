import "./App.css";
import Navbar from "./Components/Navbar";
import Main from "./Components/Main";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId="338391154476-d7dqjvvfipvmtbh73s4l04a7i7qjtv7j.apps.googleusercontent.com">
      <div>
        <Navbar />
        <Main />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
