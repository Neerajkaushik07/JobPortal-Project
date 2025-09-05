import React from "react";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import Header from "./Header";
import Config from "../../config/Config.json";
// import classes from "./Register.module.css"; // Not needed, using inline styles or Bootstrap classes

toast.configure();

const ForgotPassword = () => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.title = Config.TITLE.FORGOT_PASSWORD;
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      toast.success(
        "Link has been sent to registered email!",
        { position: toast.POSITION.TOP_CENTER },
        { autoClose: 5000 }
      );
    }
  };

  const validate = () => {
    let isValid = true;
    let error = {};

    if (!inputs["email"]) {
      isValid = false;
      error["email"] = "Please enter your email address.";
    }

    if (typeof inputs["email"] !== "undefined") {
      var pattern = new RegExp(
        /^(("\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(inputs["email"])) {
        isValid = false;
        error["email"] = "Please enter valid email address.";
      }
    }
    setErrors(error);

    return isValid;
  };

  return (
    <React.Fragment>
      <Header />
      <Container fluid className="vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#f0f2f5" }}>
        <Row className="w-100 justify-content-center">
          <Col md={10} lg={8} xl={7}>
            <div className="card shadow-lg border-0 rounded-lg fade-in">
              <Row className="g-0">
                <Col md={5} className="d-none d-md-flex align-items-center justify-content-center p-5" style={{ backgroundColor: "#007bff"}}>
                  <div className="text-white text-center">
                    <h2 className="mb-3">Forgot Password?</h2>
                    <p>Enter your email and we'll send you a link to reset your password.</p>
                  </div>
                </Col>
                <Col md={7}>
                  <div className="card-body p-4">
                    <h1 className="text-center mb-4" style={{ color: "#2c49ed" }}>
                      Reset Password
                    </h1>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>
                          Enter Registered Email <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          name="email"
                          value={inputs.email || ""}
                          onChange={handleChange}
                          isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <div className="d-grid gap-2 mt-4">
                        <Button variant="primary" size="lg" type="submit">
                          Submit
                        </Button>
                      </div>
                      <div className="text-center mt-3">
                        <Link to="/Login" className="text-decoration-none">Back to Login</Link>
                      </div>
                    </Form>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default ForgotPassword;
