import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Header from "./Header";
import axios from "axios";

function Register() {
  useEffect(() => {
    //redirecting logged in users from registration page to Home page
    if (localStorage.getItem("user-info")) {
      navigate("/home");
    }
  }, []);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  //redux use
  // const dispatch = useDispatch();

  // function signedUp() {
  //   dispatch({
  //     type: "REGISTER",
  //     payload: {
  //       id: new Date().getTime(),
  //       name,
  //       username,
  //       password,
  //     },
  //   });
  // }
  async function signUp(e) {
    e.preventDefault();
    // let item = { name, email, password };
    let item = { email, password };

    const response = await axios
      .post("https://reqres.in/api/register", item)
      .catch((e) => {
        alert(e.response.data.error);
        alert("Try this email instead: michael.lawson@reqres.in");
      });

    if (response == null) return;

    alert("You successfully registered!");

    navigate("/login");
  }

  return (
    <>
      <Header />
      <div className="container mt-3">
        <section className="d-flex justify-content-between">
          <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
            <h3 className="text-center col-lg-6">Sign Up</h3>
            <Form>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  value={name}
                  name="name"
                  //e is the event (change), target is the element that triggered the event (input), and value is the value of the input
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  value={email}
                  name="email"
                  // e is the event (change), target is the element that triggered the event (input), and value is the value of the input
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group
                className="mb-3  col-lg-6"
                controlId="formBasicPassword"
              >
                <Form.Control
                  type="password"
                  value={password}
                  name="password"
                  // e is the event (change), target is the element that triggered the event (input), and value is the value of the input
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </Form.Group>

              <Button
                variant="primary"
                className="col-lg-6"
                onClick={signUp}
                type="submit"
              >
                Submit
              </Button>
            </Form>
            <p className="mt-3">
              {" "}
              Already have an account?{" "}
              <span>
                {" "}
                <NavLink to="/login">SignIn</NavLink>
              </span>
            </p>
          </div>
          {/* <Sign_img /> */}
        </section>
      </div>
    </>
  );
}

export default Register;
