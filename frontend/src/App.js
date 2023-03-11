import "./App.scss";
import HomePage from "./Components/Home/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NavBar from "./Components/NavBar/NavBar";
import GroupPage from "./Components/Group/GroupPage";
import { LoginUserProvider } from "./context/login-content";
import { AllUsersProvider } from "./context/allUsers-context";
import { ListMembersProvider } from "./context/listMembers-constext";

function App() {
  return (
    <Router>
      <LoginUserProvider>
        <AllUsersProvider>
          <ListMembersProvider>
            <NavBar />
            <div className="App">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/group" element={<GroupPage />}></Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </div>
          </ListMembersProvider>
        </AllUsersProvider>
      </LoginUserProvider>
    </Router>
  );
}

export default App;
