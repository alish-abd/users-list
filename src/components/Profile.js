import React from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, ListGroup } from "react-bootstrap";

export const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = React.useState([]);

  const userId = id;

  // function to access the data of the user by id which is stored in localStorage after user is logged in
  async function userFetch() {
    const userResponse = await axios
      .get(`https://reqres.in/api/users/${userId}`)
      //if error is cathced the alert will be displayed with the information about eror
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
        <div>
          <Card className="mt-5" style={{ width: "18rem" }}>
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
        </div>
      </Container>
    </div>
  );
};
