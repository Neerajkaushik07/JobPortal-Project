import React from "react";
import { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import Jobitem from "./Job_item";
import ApplyModal from "./ApplyModal";
import classes from "./Modalf.module.css";
import Config from "../config/Config.json";

let jobsData = [];
const Jobs = () => {
  const [modal, setModal] = useState(false);
  const [action, setAction] = useState(false);
  const [jobSet, setjobSet] = useState("");
  const [jobs, setJobs] = useState([]);
  const [jobType, setJobType] = useState("All");
  const [experience, setExperience] = useState("All");
  const [category, setCategory] = useState("All");

  const closeModalHandler = () => {
    setModal(false);
  };

  const jobApply = (applyData) => {
    setModal(true);
    setjobSet(applyData);
  };

  const filterJobs = (currentJobsData, searchTerm, currentJobType, currentExperience, currentCategory) => {
    return currentJobsData.filter((job) => {
      const matchesSearch = searchTerm === "" || job.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesJobType = currentJobType === "All" || job.type === currentJobType;
      const matchesExperience = currentExperience === "All" || job.experience === currentExperience;
      const matchesCategory = currentCategory === "All" || job.category === currentCategory;
      return matchesSearch && matchesJobType && matchesExperience && matchesCategory;
    });
  };

  const jobSearchHandler = (event) => {
    const searchTerm = event.target.value;
    setJobs(filterJobs(jobsData, searchTerm, jobType, experience, category));
  };

  const jobTypeFilterHandler = (event) => {
    const newJobType = event.target.value;
    setJobType(newJobType);
    setJobs(filterJobs(jobsData, document.querySelector('input[type="search"]').value, newJobType, experience, category));
  };

  const experienceFilterHandler = (event) => {
    const newExperience = event.target.value;
    setExperience(newExperience);
    setJobs(filterJobs(jobsData, document.querySelector('input[type="search"]').value, jobType, newExperience, category));
  };

  const categoryFilterHandler = (event) => {
    const newCategory = event.target.value;
    setCategory(newCategory);
    setJobs(filterJobs(jobsData, document.querySelector('input[type="search"]').value, jobType, experience, newCategory));
  };

  useEffect(() => {
    axios
      .get(`${Config.SERVER_URL + "user/jobsAvailable"}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        jobsData = response.data.jobs;
        setJobs(filterJobs(jobsData, document.querySelector('input[type="search"]').value, jobType, experience, category));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [action, jobType, experience, category]);

  return (
    <div className="fade-in">
      <Container>
        <Row style={{ marginTop: "20px" }} className="justify-content-center">
          <Col md={3}>
            <input
              className="form-control"
              type="search"
              onChange={jobSearchHandler}
              placeholder="Search Jobs"
            ></input>
          </Col>
          <Col md={3}>
            <select className="form-control" onChange={jobTypeFilterHandler}>
              <option value="All">All Job Types</option>
              <option value="Full time">Full-time</option>
              <option value="Part time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
          </Col>
          <Col md={3}>
            <select className="form-control" onChange={experienceFilterHandler}>
              <option value="All">All Experience Levels</option>
              <option value="Min.1 Year">Min. 1 Year</option>
              <option value="Senior Level">Senior Level</option>
            </select>
          </Col>
          <Col md={3}>
            <select className="form-control" onChange={categoryFilterHandler}>
              <option value="All">All Categories</option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Finance">Finance</option>
            </select>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <div className={classes.grid}>
          {jobs.map((jobItem) => (
            <Jobitem key={jobItem._id} item={jobItem} jobApply={jobApply} />
          ))}
        </div>
      </Container>
      {modal && (
        <ApplyModal
          job={jobSet}
          onOpen={modal}
          onClose={closeModalHandler}
          changes={setAction}
        />
      )}
    </div>
  );
};

export default Jobs;
