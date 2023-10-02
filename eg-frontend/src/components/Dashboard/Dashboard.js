import React, { useEffect, useState } from "react";
import { useAuth } from "../../authContext";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const { user, setUser, accessToken, setAccessToken, backEndURL } = useAuth();
  const [dashboardError, setDashboardError] = useState(false);

  const getUserDetails = async () => {
    try {
      const loadDashboardResponse = await axios.get(
        `${backEndURL}/users/dashboard`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${accessToken}`,
          },
        }
      );

      setDashboardError(false);
      setUser(loadDashboardResponse.data);
    } catch (error) {
      setAccessToken(null);
      setUser(null);
      setDashboardError(true);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return dashboardError ? (
    <Navigate to="/signIn" />
  ) : (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={8} lg={8}>
          {user ? (
            <h1>Hello {user.name}, welcome to the application</h1>
          ) : (
            <p>You are not authenticated.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
