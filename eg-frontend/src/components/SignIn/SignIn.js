import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import "../../App.css";
import { useAuth } from "../../authContext";
import { Navigate } from "react-router-dom";

function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [signInError, setSignInError] = useState({
    isError: false,
    message: [],
  });

  const { setAccessToken, accessToken, signIn } = useAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const signInBody = { ...formData };
    try {
      const signInResponse = await signIn(signInBody);

      setAccessToken(signInResponse.data.token);

      setSignInError({
        isError: false,
        message: [],
      });
    } catch (error) {
      setAccessToken(null);
      const errorMessage =
        error.response.data.statusCode === 429
          ? "Too many requests"
          : error.response.data.message;
      setSignInError({
        isError: true,
        message: Array.isArray(errorMessage)
          ? [...errorMessage]
          : [errorMessage],
      });
    }
  };

  return accessToken ? (
    <Navigate to="/dashboard" />
  ) : (
    <Container>
      <Row className="vh-100 d-flex justify-content-center mt-5 mb-5">
        <Col xs={12} sm={8} md={8} lg={8}>
          <div className="border border-3"></div>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-4">
                <p className=" mb-5">Please enter your login and password!</p>
                <Form className="mb-3" onSubmit={handleSignIn}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="text-center">
                      Email address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                  </Form.Group>
                  {signInError.isError ? (
                    <div className="mb-1">
                      {signInError.message &&
                        signInError.message.map((item) => (
                          <span className="mb-0 text-danger" key={item}>
                            {item}
                          </span>
                        ))}
                    </div>
                  ) : null}
                  <div className="d-grid">
                    <Button variant="primary" type="submit">
                      Sign In
                    </Button>
                  </div>
                </Form>
                <div className="mt-3">
                  <p className="mb-0  text-center">
                    Don't have an account?{" "}
                    <a href="/signUp" className="text-primary fw-bold">
                      Sign Up
                    </a>
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SignIn;
