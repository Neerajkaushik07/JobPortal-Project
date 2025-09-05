import React from "react";
import { Formik } from "formik";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import classes from "./AddJob.module.css";

import { TextField, SelectInput } from "./FormTypes";
import * as Yup from "yup";
export default function AddJob(props) {
  let initialValues = {
    title: "",
    description: "",
    jobType: "", // Added jobType
    experience: "", // Added experience
    startDate: "",
    endDate: "",
    category: "",
  };

  if (props.jobInfo) {
    initialValues = {
      title: props.jobInfo.title,
      description: props.jobInfo.description,
      jobType: props.jobInfo.jobType || "", // Added jobType
      experience: props.jobInfo.experience || "", // Added experience
      startDate: props.jobInfo.startDate,
      endDate: props.jobInfo.endDate,
      category: props.jobInfo.category,
    };
  }

  const formSubmitHandler = (values, setSubmitting) => {
    props.onAdd(values);
  };

  // VALIDATION
  const validate = Yup.object({
    title: Yup.string().max(30).required("Required"),
    description: Yup.string()
      .max(100, "Must be 100 characters or less")
      .required("Required"),
    startDate: Yup.date().required("Required"),
    endDate: Yup.date().required("Required"),
    jobType: Yup.string().required("Job Type is Required"), // Added jobType validation
    experience: Yup.string().required("Experience Level is Required"), // Added experience validation
    category: Yup.string().required("Required"),
  });

  return (
    <Container className={`${classes.formContainer} my-4 p-4`}>
      <h3 className="mb-4 text-center">{props.jobInfo ? "Edit Job" : "Add New Job"}</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validate}
        onSubmit={(values, { setSubmitting }) => {
          const editedValues = { ...props.jobInfo, ...values };
          // setTimeout(() => {
          //   alert(JSON.stringify(editedValues, null, 2));
          //   setSubmitting(false);
          // props.onAdd();
          // history.push("/dashboard");
          // }, 400);
          formSubmitHandler(editedValues, setSubmitting);
        }}
      >
        {(formik) => (
          // console.log(formik);
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Col md={12}>
                <TextField label="Title" name="title" type="text" />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <TextField
                  label="Description"
                  name="description"
                  type="text-area"
                  rows={3}
                />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <SelectInput label="Job Type" name="jobType">
                  <option value="">Select Job Type</option>
                  <option value="Full time">Full-time</option>
                  <option value="Part time">Part-time</option>
                  <option value="Contract">Contract</option>
                </SelectInput>
              </Col>
              <Col md={6}>
                <SelectInput label="Experience Level" name="experience">
                  <option value="">Select Experience Level</option>
                  <option value="Min.1 Year">Min. 1 Year</option>
                  <option value="Senior Level">Senior Level</option>
                </SelectInput>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <SelectInput label="Category" name="category">
                  <option value="">Select Category</option>
                  <option value="IT">IT</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Finance">Finance</option>
                </SelectInput>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <TextField label="Start Date" name="startDate" type="date" />
              </Col>
              <Col md={6}>
                <TextField label="End Date" name="endDate" type="date" />
              </Col>
            </Row>

            <div className="d-grid gap-2 mt-4">
              {!props.jobInfo ? (
                <Button
                  variant="primary"
                  type="submit"
                  size="lg"
                  className={classes.submitBtn}
                >
                  Add Job
                </Button>
              ) : (
                <Button
                  variant="primary"
                  type="submit"
                  size="lg"
                  className={classes.submitBtn}
                >
                  Save Changes
                </Button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
