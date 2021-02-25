import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  axios.get("/api/shops/").then((res) => console.log(res));
  return <div className="App">Hello</div>;
}

export default App;
