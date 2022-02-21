import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { NoteProvider } from "./components/contexts/NoteProvider";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <NoteProvider>
      <BrowserRouter>
        <Navbar />
        <div className='container my-3'>
          <Routes>
            <Route path='/iNotes' element={<Home />} />
            <Route path='/iNotes/login' element={<Login />} />
            <Route path='/iNotes/signup' element={<SignUp />} />
          </Routes>
        </div>
      </BrowserRouter>
    </NoteProvider>
  );
}

export default App;
