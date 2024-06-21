import { Alert, Button, Form } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { updateProfile } from "../../actions/userActions";
import Loading from "../../components/Loading";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;
  useEffect(() => {
    if (!userInfo) {
      Navigate("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(capitalizeFirstLetter(value));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword)
      dispatch(updateProfile({ name, email, password }));
  };
  return (
    <MainScreen title="Edit Profile">
      <div className="profileContainer">
        {loading && <Loading />}
        {success && <Alert variant="primary">Updated Successfully</Alert>}
        {error && <Alert variant="primary">{error}</Alert>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="Name" className="mt-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              placeholder="Enter the name"
              onChange={handleNameChange}
            />
          </Form.Group>

          <Form.Group controlId="email" className="mt-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              value={email}
              placeholder="Enter the email"
              rows={4}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="passsword" className="mt-2">
            <Form.Label>Passsword</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Enter the password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="confirmPasssword" className="mt-2">
            <Form.Label>Passsword</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              placeholder="Confirm the password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-2">
            Create Note
          </Button>
        </Form>
        <div className="mt-2">
          <small className="text-muted">
            Updating on - {new Date().toLocaleDateString()}
          </small>
        </div>
      </div>
    </MainScreen>
  );
};

export default ProfilePage;
