import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Container, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import classes from "./Register.module.css";
import { NumberInput, SelectInput, TextInput } from "../../components/dashboard/ManageUsers/AddUsersFormik/fields/FieldInputs";
import SpinnerComponent from "../../components/UI/SpinnerComponent";

const Register = (props) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();

  let initialValues = {
    name: "",
    email: "",
    password: "",
    mobile: "",
    age: "",
    gender: "",
    qualification: "",
    experience: "",
    role: "",
  };

  const formSubmitHandler = (values, setSubmitting) => {
    setShowSpinner(true);
    axios
      .post(`http://localhost:8080/auth/register`, { ...values })
      .then((res) => {
        setShowSpinner(false);
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        setShowSpinner(false);
        toast.error("Oops something went wrong", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(err);
      });
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
                    <h2 className="mb-3">Welcome!</h2>
                    <p>Create your account and start your job search journey with us.</p>
                  </div>
                </Col>
                <Col md={7}>
                  <div className="card-body p-4">
                    <h1 className="text-center mb-4" style={{ color: "#2c49ed" }}>
                      Sign up
                    </h1>
                    {showSpinner && <SpinnerComponent />}
                    <Formik
                      initialValues={initialValues}
                      validationSchema={Yup.object({
                        name: Yup.string()
                          .min(4, "Name should be more than 4 characters")
                          .max(25, "Name should be less than 25 characters")
                          .required("Name is a required field"),
                        email: Yup.string()
                          .email("Invalid email address")
                          .required("Email is a required field"),
                        password: Yup.string()
                          .min(6, "Password must be minimum 6 characters")
                          .required("Password is a required field"),
                        mobile: Yup.string()
                          .required("Phone number is required")
                          .matches(/^[0-9]+$/, "Must be only digits")
                          .min(10, "Must be exactly 10 digits")
                          .max(10, "Must be exactly 10 digits"),
                        gender: Yup.string().required("Gender Required"),
                        age: Yup.number()
                          .max(60, "Age should be less than or equal to 60")
                          .min(18, "Age should be greater than or equal to 18")
                          .required("Age Required"),
                        qualification: Yup.string().required("Qualification Required"),
                        experience: Yup.string(),
                        role: Yup.string().required("Please select a role"),
                      })}
                      onSubmit={(values, { setSubmitting }) => {
                        const editedValues = { ...props.userInfo, ...values };
                        formSubmitHandler(editedValues, setSubmitting);
                      }}
                    >
                      {(formik) => (
                        <Form>
                          <Row>
                            <Col md={6}>
                              <div className="mb-3">
                                <TextInput
                                  label="Name"
                                  id="name"
                                  name="name"
                                  mandatory={"true"}
                                />
                              </div>
                            </Col>
                            <Col md={6}>
                              <div className="mb-3">
                                <TextInput
                                  label="Email"
                                  id="email"
                                  name="email"
                                  mandatory={"true"}
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={6}>
                              <div className="mb-3">
                                <div className="position-relative">
                                  <TextInput
                                    label="Password"
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    mandatory={"true"}
                                  />
                                  <Button
                    variant="link"
                    className="position-absolute end-0 top-50 translate-middle-y"
                    onClick={handleTogglePasswordVisibility}
                    style={{ zIndex: 100, marginRight: '5px', marginTop: '12px', fontSize: '0.9em' }}
                  >
                    {showPassword ? (
                      <i className="bi bi-eye-slash"></i>
                    ) : (
                      <i className="bi bi-eye"></i>
                    )}
                  </Button>
                                </div>
                              </div>
                            </Col>
                            <Col md={6}>
                              <div className="mb-3">
                                <TextInput
                                  label="Mobile No"
                                  id="mobile"
                                  name="mobile"
                                  mandatory={"true"}
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={6}>
                              <div className="mb-3">
                                <NumberInput
                                  label="Age"
                                  name="age"
                                  id="age"
                                  mandatory={"true"}
                                />
                              </div>
                            </Col>
                            <Col md={6}>
                              <div className="mb-3">
                                <label className="form-label">
                                  Gender<span className="text-danger">*</span>
                                </label>
                                <div className="d-flex gap-4">
                                  <div className="form-check">
                                    <Field
                                      type="radio"
                                      value="Male"
                                      name="gender"
                                      id="Male"
                                      className="form-check-input"
                                    />
                                    <label className="form-check-label" htmlFor="Male">Male</label>
                                  </div>
                                  <div className="form-check">
                                    <Field
                                      type="radio"
                                      value="Female"
                                      name="gender"
                                      id="Female"
                                      className="form-check-input"
                                    />
                                    <label className="form-check-label" htmlFor="Female">Female</label>
                                  </div>
                                </div>
                                {formik.errors.gender && (
                                  <div className="text-danger small">{formik.errors.gender}</div>
                                )}
                              </div>
                            </Col>
                          </Row>
                          {/* Ensured Qualification and Experience are in their own Row for clear horizontal alignment */}
                          <Row className="mb-3">
                            <Col md={6}>
                              <SelectInput
                                name="qualification"
                                id="qualification"
                                label="Qualification"
                                mandatory={"true"}
                              >
                                <option value="">Select</option>
                                <option value="Post Graduate">Post Graduate</option>
                                <option value="Graduate">Graduate</option>
                                <option value="HSC/Diploma">HSC/Diploma</option>
                                <option value="SSC">SSC</option>
                              </SelectInput>
                            </Col>
                            <Col md={6}>
                              <SelectInput
                                name="experience"
                                id="experience"
                                label="Experience"
                              >
                                <option value="">Select</option>
                                <option value="1">1 Year</option>
                                <option value="2">2 Years</option>
                                <option value="3">3 Years</option>
                                <option value="4">4 Years</option>
                                <option value="5">5+ Years</option>
                              </SelectInput>
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col md={12}>
                              <div className="mb-3">
                                <label className="form-label">
                                  Register as<span className="text-danger">*</span>
                                </label>
                                <div className="d-flex gap-4">
                                  <div className="form-check">
                                    <Field
                                      type="radio"
                                      value="User"
                                      name="role"
                                      id="User"
                                      className="form-check-input"
                                    />
                                    <label className="form-check-label" htmlFor="User">Job Seeker</label>
                                  </div>
                                  <div className="form-check">
                                    <Field
                                      type="radio"
                                      value="Job Provider"
                                      name="role"
                                      id="Provider"
                                      className="form-check-input"
                                    />
                                    <label className="form-check-label" htmlFor="Provider">Job Provider</label>
                                  </div>
                                </div>
                                {formik.errors.role && (
                                  <div className="text-danger small">{formik.errors.role}</div>
                                )}
                              </div>
                            </Col>
                          </Row>
                          <div className="d-grid gap-2 mt-4">
                            <Button variant="primary" size="lg" type="submit">
                              Sign up
                            </Button>
                          </div>
                          <div className="text-center mt-3">
                            <span className="text-muted">Already have an account? </span>
                            <Link to="/Login" className="text-decoration-none">Login here</Link>
                          </div>
                        </Form>
                      )}
                    </Formik>
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

export default Register;
