import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect, use } from "react";
import Documents from "./components/documents";
import API from "./API/API";
import Home from "./components/home";
import Login from "./components/login";
import User from "./entities/user";

function App() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loggedIn, setLoggedIn] = useState<Boolean>(false);
  const [dirty, setDirty] = useState<boolean>(false);
  const navigate = useNavigate();

  const doLogOut = async () => {
    await API.logOut();
    setDirty(true);
    navigate("/");
  };

  useEffect(() => {
    API.getUserInfo()
      .then((u: User) => {
        setLoggedIn(true);
        setUser(new User(u.username, u.name, u.surname));
        setDirty(false);
      })
      .catch((err: any) => {
        setLoggedIn(false);
        setUser(undefined);
        setDirty(false);
      });
  }, [dirty]);

  return (
    <Routes>
      <Route path="/" element={<Home user={user} loggedIn={loggedIn} setDirty={setDirty} doLogOut={doLogOut} />} />
      <Route path="/login" element={<Login user={user} loggedIn={loggedIn} setDirty={setDirty} />} />
      <Route path="/documents" element={<Documents user={user} loggedIn={loggedIn} />} />
    </Routes>
  )
}

export default App;
