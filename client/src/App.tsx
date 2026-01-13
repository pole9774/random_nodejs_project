import { Route, Routes } from "react-router-dom";
import Documents from "./components/documents";
import Home from "./components/home";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/documents" element={<Documents />} />
    </Routes>
  )
}

export default App;
