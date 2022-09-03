import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "./Header";
import axios from "axios";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    //redirecting logged in users from registration page to Home page
    if (localStorage.getItem("user-info")) {
      navigate("/home");
    }
  }, []);

  async function login(e) {
    //prevents the reloading of the page by button click
    e.preventDefault();

    //assigning the email and password data to the object item
    let item = { email, password };
    const result = await axios
      .post("https://reqres.in/api/login", item)
       //if error is cathced the alert will be displayed with the information about eror
      .catch((e) => {
        alert(e.response.data.error);
      });

    console.log(result);

    const result2 = await axios
      .post("https://reqres.in/api/register", item)
      //if error is cathced the alert will be displayed with the information about eror
      .catch((e) => {
        alert(e.response.data.error);
      });

    const id = result2.data.id;
    console.log(id);

    //we store the information about logged user to access it when displaying the information on page
    localStorage.setItem("user-info", JSON.stringify(email));
    localStorage.setItem("user-id", JSON.stringify(id));

    //when function is executed succesfullt redirect to home page 
    navigate("/home");
  }

  return (
    <div>
      <Header />
      <div className="container mt-3">
        <section className="d-flex justify-content-between">
          <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
            <h3 className="text-center col-lg-6">Log in</h3>
            <Form>
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
                onClick={login}
                type="submit"
              >
                Submit
              </Button>
            </Form>
            <p className="mt-3">
              {" "}
              You have not registered yet?{" "}
              <span>
                {" "}
                <NavLink to="/register">SignUp</NavLink>
              </span>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
