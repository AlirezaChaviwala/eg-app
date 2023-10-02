import React, { useState } from "react";
import "../../App.css";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useAuth } from "../../authContext";
import axios from "axios";
import { Navigate } from "react-router-dom";

function SignUp() {
  const { backEndURL, setAccessToken, accessToken, signIn } = useAuth();

  const [signUpError, setSignUpError] = useState({
    isError: false,
    message: [],
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignUp = async (e) => {
    e.preventDefault();
    const signUpBody = { ...formData };
    try {
      const signUpResponse = await axios.post(
        `${backEndURL}/auth/signUp`,
        signUpBody,
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      );

      if (signUpResponse.status === 201 && signUpResponse.data) {
        const signInBody = {
          email: signUpBody.email,
          password: signUpBody.password,
        };
        const signInResponse = await signIn(signInBody);

        setAccessToken(signInResponse.data.token);

        setSignUpError({
          isError: false,
          message: [],
        });
      }
    } catch (error) {
      const errorMessage =
        error.response.data.statusCode === 429
          ? "Too many requests"
          : error.response.data.message;
      setAccessToken(null);
      setSignUpError({
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
                <p className=" mb-5">Please enter your details</p>
                <Form className="mb-3" onSubmit={handleSignUp}>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label className="text-center">Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </Form.Group>
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
                  {signUpError.isError ? (
                    <div className="mb-1">
                      {signUpError.message &&
                        signUpError.message.map((item) => (
                          <span className="mb-0 text-danger d-block" key={item}>
                            {item}
                          </span>
                        ))}
                    </div>
                  ) : null}
                  <div className="d-grid">
                    <Button type="submit">Sign Up</Button>
                  </div>
                </Form>
                <div className="mt-3">
                  <p className="mb-0  text-center">
                    Already have an account?{" "}
                    <a href="/signIn" className="text-primary fw-bold">
                      Sign In
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

export default SignUp;
