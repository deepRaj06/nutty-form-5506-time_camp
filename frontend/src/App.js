import { useSelector } from "react-redux";
import "./App.css";
import Footer from "./Components/footer/Footer";
import Navvbar from "./Components/main_navbar/Navvbar";

import AllRoutes from "./Routes/AllRoutes";

function App() {
  const token = useSelector((store) => store.AuthReducer.token);
  const googleUser = useSelector((store) => store.AuthReducer.googleUser);

  return (
    <div className="App">
      {token === null || googleUser.length === 0 ? <Navvbar /> : ""}
      <AllRoutes />
      {token === null || googleUser.length === 0 ? <Footer /> : ""}
    </div>
  );
}

export default App;
