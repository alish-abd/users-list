import React, { useState } from "react";
import Header from "./Header";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Container, Card, ListGroup } from "react-bootstrap";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";

export const Home = () => {
  // Declaring new state variables to add React state to function components
  const [users, setUsers] = React.useState([]);
  const [user, setUser] = React.useState([]);
  const navigate = useNavigate();

  //redux
  // const usersNew = useSelector((state = state.users));

  //function for displaying a list of users in the form of icons
  async function showUsers(e) {
    const response1 = await axios
      //page 1
      .get("https://reqres.in/api/users?page=1")
      //if error is cathced the alert will be displayed with the information about eror
      .catch((e) => {
        alert(e.response.data.error);
      });

    //page 2
    const response2 = await axios
      .get("https://reqres.in/api/users?page=2")
      //if error is cathced the alert will be displayed with the information about eror
      .catch((e) => {
        alert(e.response.data.error);
      });
    setUsers([...response1.data.data, ...response2.data.data]);
  }

  //function is only executed once and only when the page is loaded 
  React.useEffect(() => {
    showUsers();
  }, []);

  //setting user-id from localStaorage, which we got from user login, to userId
  const userId = localStorage.getItem("user-id");

  //function for displaying current authorized user
  async function userFetch() {
    const userResponse = await axios
      .get(`https://reqres.in/api/users/${userId}`)
      .catch((e) => {
        alert(e.response.data.error);
      });
    setUser(userResponse.data.data);
    console.log(userResponse);
  }
  //function is only executed once and only when the page is loaded 
  React.useEffect(() => {
    userFetch();
  }, []);

  return (
    <div>
      <Header />
      <Container>
        <div className="App">
          <h2 className="mt-5 d-flex align-content-start">My profile</h2>
          <div className="d-flex flex-wrap gap-3  mt-4">
            <Card className="" style={{ width: "18rem" }}>
              <Card.Img variant="top" src={user.avatar} />
              <Card.Body>
                <Card.Title>
                  {user.first_name} {user.last_name}
                </Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>{user.email}</ListGroup.Item>
              </ListGroup>
              <Card.Body></Card.Body>
            </Card>

            <Card className="" style={{ width: 990 }}>
              <div className="flex">
                <div className="d-flex align-items-sm-baseline ">
                  <h4 className="m-3">Other users </h4>
                  <p className=" text-secondary">
                    Click avatar to visit their profile
                  </p>
                </div>

                <div className="d-flex flex-wrap">
                  {users.length &&
                    users.map((otherUser) => {
                      return (
                        <div className="avatar" key={otherUser.id}>
                          {/* navigating to profile of a particular user by clicking his icon image */}
                          <Link to={`/profile/${otherUser.id}`}>
                            <div className="bg-image hover-zoom">
                              <img
                                // style={{ width: 160 }}
                                className="p-3 rounded-circle w-160"
                                key={otherUser.avatar}
                                src={otherUser.avatar}
                              />
                            </div>
                          </Link>
                          {/* <div>{otherUser.email}</div> */}
                        </div>
                      );
                    })}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};
