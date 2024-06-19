import { useState, useEffect } from "react";
import MainScreen from "../../components/MainScreen";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import "./LoginPage.css";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Replace useHistory with useNavigate
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/mynotes"); // Use navigate instead of history.push
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  return (
    <MainScreen title="Login">
      <div className="loginContainer">
        {error && <Alert variant="primary">{error}</Alert>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          {loading && <Loading />}
          <Button variant="primary" type="submit" style={{ marginTop: "6px" }}>
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Not a user? <Link to="/register">Register Now</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default LoginPage;
