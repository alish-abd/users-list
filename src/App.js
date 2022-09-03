import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Register from "./components/Register";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { Home } from "./components/Home";
import Login from "./components/Login";
import { Profile } from "./components/Profile";
import Protected from "./components/Protected";
import { useEffect } from "react";
// import Protected from "./components/Protected";
// import Login from "./components/Login";
// import Details from "./components/Details";
import Error from "./components/Error";

function App() {
  // function handleCallbackResponse(response) {}
  // useEffect(() => {
  //   // // global google
  //   // google.accounts.id.initialize({
  //   //   client_id:
  //   //     "http://559857044950-vcf3d12i6074hos0ifne40jt0qknlsqb.apps.googleusercontent.com",
  //   //   callback: handleCallbackResponse,
  //   // });
  //   google.accounts.id.renderButton(
  //     document.getElementById('signInDiv'),
  //     {theme: 'outline', size: 'large'
  //   ) 

  // }, []);
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Protected />}>
          {/* outlet routes */}
          <Route path="/home" element={<Home />} />
          {/* Dynamic routing */}
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
        {/* if accessing any other link excpet defined above, Error components is displayed */}
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
