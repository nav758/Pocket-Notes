import { Route, Routes } from "react-router-dom";
import "./style.css";
import Home from "./pages/Home"

function App() {
  return(
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/home' element={<Home />} />
   
    
  </Routes>
  );
}

export default App;