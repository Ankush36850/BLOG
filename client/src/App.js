import "./app.css";
import Login from "./component/Login";
import Register from "./component/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./component/UserContext";
import CreatePost from "./component/CreatePost";
import Home from "./component/Home"
import DisplayPost from "./component/DisplayPost";
import EditPost from "./component/EditPost";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreatePost/>}/>
          <Route path="/post/:id" element={<DisplayPost/>}/>
          <Route path="/edit/:id" element={<EditPost/>}/>
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
