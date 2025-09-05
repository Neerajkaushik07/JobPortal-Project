import React, { useEffect } from "react";
import AppliedJobsList from "../../JobSeeker/AppliedJobsList";
import Config from "../../config/Config.json";

const JobSeekerPage = () => {
  useEffect(() => {
    document.title = Config.TITLE.APPLIED_JOBS;
  }, []);
  return (
    <React.Fragment className="fade-in">
      <AppliedJobsList />
    </React.Fragment>
  );
};

export default JobSeekerPage;
