import axios, { Axios } from "axios";
import React, { useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { motion } from "framer-motion";

import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginUserMutation } from "../comps/redux/appApi";
import { API_URL, doApiMethod } from "../services/apiService";
import "./css/Login.css";
import ResetPass from "../comps/utils/resetPass";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const [show, setShow] = useState(false);
  const nav = useNavigate();

  const handleToggle = () => setShow(!show);

  const handleLogin = async (e) => {
    e.preventDefault();
    let url = API_URL + "/users/login";
    // let resp = await doApiMethod(url, "POST", { email, password });
    let resp = await loginUser({ email, password });
    if (resp.data) {
      toast.success("You are now logged in ");
      nav("/");

      console.log(resp.data);
    } else {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.7 }}
      className="register-photo"
    >
      <Container>
        <ResetPass handleToggle={handleToggle} show={show} />
        <Row>
          <Col md={5} className="login__bg"></Col>
          <Col
            md={7}
            className="d-flex shad flex-direction-column align-items-center justify-content-center"
          >
            <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleLogin}>
              {error && (
                <p className="alert alert-danger">
                  {error.data?.err
                    ? error.data.err
                    : "It's not you, it's up. Please thy again later."}
                </p>
              )}
              <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
                <Form.Label className="text-left">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                {isLoading ? <Spinner animation="grow" /> : "Login"}
              </Button>
              <div className="py-4">
                {error?.status === 401 ? ( //403 - unauthorized
                  <p className="text-center">
                    Forgot your password?
                    <a className="text-decoration-none" onClick={handleToggle}>
                      {" "}
                      resst password
                    </a>
                  </p>
                ) : (
                  <p className="text-center ">
                    Don't have an account?{" "}
                    <Link className="text-decoration-none" to="/signup">
                      Signup
                    </Link>
                  </p>
                )}
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
}

export default Login;