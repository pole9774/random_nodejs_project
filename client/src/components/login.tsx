import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { showToast } from '../utilities/toast';
import API from "../API/API";

function Login(props: any) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await API.login(username, password);
      showToast.success('Login successful');
      props.setDirty(true);
      navigate('/');
    } catch (error) {
      showToast.error('Invalid username or password');
    }
  };

  useEffect(() => {
    if (props.loggedIn) {
      navigate("/");
    }
  }, [props.loggedIn, navigate]);

  return (
    <>
      <Form onSubmit={handleLogin}>

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
      </Form>
    </>
  );
}

export default Login;
