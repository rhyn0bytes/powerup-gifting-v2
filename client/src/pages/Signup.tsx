import { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row, Alert } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRegistration } from "../models/user";
import { signup, selectErrors, selectAuthLoading } from "../state/auth";
import useAuthentication from "../hooks/useAuthentication";

// import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { fab } from '@fortawesome/free-brands-svg-icons';

// library.add(fab)

function Signup() {
  const dispatch = useDispatch();
  const { push } = useHistory();

  const { authenticated } = useAuthentication();

  useEffect(() => {
    if (authenticated) push("/wishes");
  }, [authenticated, push]);

  const signupErrors = useSelector(selectErrors);
  const loading = useSelector(selectAuthLoading);

  const [user, setUser] = useState<IRegistration>({
    email: "",
    password: "",
    password_confirmation: ""
  });

  const _handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const {id, value} = e.target
    setUser(prevUser => ({
      ...prevUser,
      [id]: value
    }))
  }

  const _handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    _handleSignup();
  }
  
  const _handleSignup = async () => {
    dispatch(signup({ user }));
  }

  return (
    <Container>
      <Row>
        <Col sm={9} md={7} lg={5} className="mx-auto">
          <Card className="border-0 shadow rounded-3 my-5">
            <Card.Body className="p-4 p-sm-5">
              <Card.Title className="text-center mb-5 fw-light fs-5">Sign Up</Card.Title>
              
              <Form onSubmit={_handleSubmit}>
                <Form.Group className="form-floating mb-3" controlId="email">
                  <Form.Control type="email" placeholder="Enter email" value={user.email} onChange={_handleChange} />
                  <Form.Label>Email address</Form.Label>
                </Form.Group>
              
                <Form.Group className="form-floating mb-3" controlId="password">
                  <Form.Control type="password" placeholder="Password" value={user.password} onChange={_handleChange} />
                  <Form.Label>Password</Form.Label>
                </Form.Group>

                <Form.Group className="form-floating mb-3" controlId="password_confirmation">
                  <Form.Control type="password" placeholder="Password Confirmation" value={user.password_confirmation} onChange={_handleChange} />
                  <Form.Label>Password Confirmation</Form.Label>
                </Form.Group>
                
                <div className="d-grid">
                  <Button variant="primary" disabled={loading} type="submit" className="btn-login text-uppercase fw-bold mb-3">Sign Up</Button>
                </div>
                {signupErrors ? <Alert variant="danger" className="mb-0">{signupErrors}</Alert> : null}
                {/* <hr className="my-4" />
                <div className="d-grid mb-2">
                  <Button type="submit" className="btn-google btn-login text-uppercase fw-bold">
                    <FontAwesomeIcon icon={["fab", "google"]} /> Sign in with Google
                  </Button>
                </div>
                <div className="d-grid">
                <Button type="submit" className="btn-apple btn-login text-uppercase fw-bold">
                    <FontAwesomeIcon icon={["fab", "apple"]} /> Sign in with Apple
                  </Button>
                </div> */}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;
