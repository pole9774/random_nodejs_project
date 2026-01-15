import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../API/API";

function Login(props: any) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();

  const doLogin = function (username: string, password: string) {
    API.login(username, password)
      .then(() => {
        props.setDirty(true);
        navigate("/");
      })
      .catch((err: any) => {
        setMessage(
          err.error
            ? err.error
            : err.message
              ? err.message
              : typeof err === "string"
                ? err
                : "An error occurred"
        );
      });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setMessage("");

    let valid = true;
    let msg = "";

    if (!username || username === "") {
      valid = false;
      msg += "Please insert a valid username\r\n";
    }

    if (!password || password === "") {
      valid = false;
      msg += "Please insert a valid password\r\n";
    }

    if (valid) {
      doLogin(username, password);
    } else {
      setMessage(msg);
    }
  };

  return (
    <>
      {
        props.loggedIn ? (
          <h1>Logged in as {props.user.name} {props.user.surname}</h1>
        ) : (
          <h1>Not logged in</h1>
        )
      }

      {message && <p>{message}</p>}

      <Form onSubmit={handleSubmit}>

        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit">Login</Button>
        <Button onClick={() => navigate("/")}>Back to Home</Button>
      </Form>
    </>
  );
}

export default Login;
