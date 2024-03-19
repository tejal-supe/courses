import React from "react";
import { useLocation } from "react-router-dom";

const CourseDetails = () => {
  const location = useLocation();
  const { thumbnail, courseName, authorName, courseDescription, createdDate } =
    location.state;
  console.log(location.state, thumbnail, courseName, authorName);
  return (
    <div className="mt-3">
      <div className="w-full h-24">
        <img src={location.state.thumbnail} alt="" className="w-full h-96" />
      </div>
      <div className="py-2"></div>
    </div>
  );
};

export default CourseDetails;
