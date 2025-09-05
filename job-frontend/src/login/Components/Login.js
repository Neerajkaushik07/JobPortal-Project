import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Form, Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "./Header";
import classes from "./Register.module.css";
// import "./src/App.css";
import Config from "../../config/Config.json";
import loginImage from '../../assets/images/login-image.svg'; // Assuming you have an image in this path
import "../../App.css"; // Import for animations

// const style = {
//   backgroundColor: "rgb(235, 238, 240)",
// };

const Login = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [backendErrors, setBackendErrors] = useState({
    show: false,
    message: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginAnimation, setLoginAnimation] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = Config.TITLE.LOGIN;
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      // console.log(inputs);
      setBackendErrors({ show: false, message: "" });
      axios
        .post("http://localhost:8080/auth/login", inputs)
        .then((res) => {
          setLoginSuccess(true);
          setLoginAnimation(true);
          
          // Add a slight delay before dispatching the token to allow animation to show
          setTimeout(() => {
            const token = res.data.token;
            dispatch({
              type: "SETAUTHTOKEN",
              data: token,
            });
          }, 2000); // 2 second delay for animation
        })
        .catch((err) => {
          const statusCode = err.message.split(" ").pop();
          if (statusCode === "401" || "422") {
            // console.log(statusCode);
            setBackendErrors({
              show: true,
              message: "Incorrect Email or Password",
            });
          } else {
            setBackendErrors({
              show: true,
              message: "Some error...on our side...",
            });
          }
        });
    }
  };

  const validate = () => {
    let isValid = true;
    let error = {};

    if (!inputs["email"]) {
      isValid = false;
      error["email"] = "Please enter your email Address.";
    }

    if (typeof inputs["email"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(inputs["email"])) {
        isValid = false;
        error["email"] = "Please enter valid email address.";
      }
    }

    if (!inputs["password"]) {
      isValid = false;
      error["password"] = "Please enter your password.";
    }

    if (typeof inputs["password"] !== "undefined") {
      if (inputs["password"].length < 6) {
        isValid = false;
        error["password"] = "Please add at least 6 character.";
      }
    }

    setErrors(error);

    return isValid;
  };

  return (
    <React.Fragment>
      <Header />
      <Container fluid className="vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "var(--background-color)" }}>
        {loginSuccess && (
          <div 
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center login-success-overlay" 
            style={{
              backgroundColor: "rgba(0, 123, 255, 0.2)",
              zIndex: 1050
            }}
          >
            <div 
              className="text-center p-5 bg-white rounded-lg shadow-lg login-success-message" 
              style={{
                opacity: 0,
                transform: "translateY(20px)"
              }}
            >
              <div className="mb-3" style={{ fontSize: "3rem", color: "#28a745" }}>
                <i className="bi bi-check-circle-fill"></i>
              </div>
              <h3 className="mb-3">Login Successful!</h3>
              <p className="mb-0">Redirecting to your dashboard...</p>
            </div>
          </div>
        )}
        <Row className="w-100 justify-content-center">
          <Col md={10} lg={8} xl={7}>
            <div className={`card shadow-lg border-0 rounded-lg fade-in ${loginAnimation ? 'fade-out' : ''}`} style={{ backgroundColor: 'var(--card-background)', borderColor: 'var(--card-border)' }}>
              <Row className="g-0">
                <Col md={6} className="d-none d-md-flex align-items-center justify-content-center p-5" style={{ backgroundColor: "#007bff"}}>
                  {/* You can replace this with an actual image or illustration */}
                  {/* <img src={loginImage} alt="Login Illustration" className="img-fluid" /> */}
                  <div className="text-white text-center">
                    <h2 className="mb-3">Welcome Back!</h2>
                    <p>Log in to access your personalized job portal and find your next career opportunity.</p>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="card-body p-5">
                    <h1 className="text-center mb-4" style={{ color: "#2c49ed" }}>
                      Login
                    </h1>
                    {backendErrors.show && (
                      <div className="alert alert-danger" role="alert">{backendErrors.message}</div>
                    )}
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>
                          Email <span style={{ color: "red" }}> *</span>
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Enter email"
                          value={inputs.email}
                          onChange={handleChange}
                          className={errors.email ? 'is-invalid' : ''}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>
                          Password <span style={{ color: "red" }}> *</span>
                        </Form.Label>
                        <div className="input-group">
                          <Form.Control
                            type={showPassword ? "text" : "password"} // Toggle input type
                            name="password"
                            placeholder="Password"
                            value={inputs.password}
                            onChange={handleChange}
                            className={errors.password ? 'is-invalid' : ''}
                          />
                  <Button
                      variant="link"
                      className="position-absolute end-0 top-50 translate-middle-y"
                      onClick={handleTogglePasswordVisibility}
                      style={{ zIndex: 100, marginRight: '5px', fontSize: '0.9em' }}
                    >
                      {showPassword ? (
                        <i className="bi bi-eye-slash"></i>
                      ) : (
                        <i className="bi bi-eye"></i>
                      )}
                    </Button>
                        </div>
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                      </Form.Group>
                      <div className="d-grid gap-2">
                        <Button
                          variant="primary"
                          size="lg"
                          type="submit"
                          className="mt-3 mb-3 w-100"
                        >
                          Log In
                        </Button>
                      </div>
                      <Row className="mt-3">
                        <Col xs={12} sm={6} className="text-center text-sm-start mb-2 mb-sm-0">
                          <Link style={{ textDecoration: "none" }} to="/Reset">
                            Forgot Password?
                          </Link>
                        </Col>
                        <Col xs={12} sm={6} className="text-center text-sm-end">
                          <Link style={{ textDecoration: "none" }} to="/Register">
                            Create an account
                          </Link>
                        </Col>
                      </Row>
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

export default Login;
