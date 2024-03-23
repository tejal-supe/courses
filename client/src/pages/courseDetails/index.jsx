import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { deleteCouseService } from "../../services/course";
import moment from "moment";

const CourseDetails = () => {
  const location = useLocation();
  const {
    thumbnail,
    courseName,
    authorName,
    courseDescription,
    createdDate,
    id,
  } = location.state;
  const navigate = useNavigate();

  const deleteCourse = async () => {
    const data = await deleteCouseService(id);
    if (data) {
      navigate("/");
    }
  };
  return (
    <div className="mt-3 bg-white p-4 rounded shadow-sm">
      <div className="w-100">
        <img src={thumbnail} alt="" className="w-full h-96" />
      </div>
      <div className="px-2 pt-2 relative">
        <p className="text-2xl font-bold tracking-wide text-gray-800">
          {courseName}
        </p>
        <p className="text-lg  text-gray-600">By {authorName}</p>
        <p className="text-sm text-gray-400">{courseDescription}</p>
          <p className="font-thin text-slate-400 text-sm absolute bottom-0 ">
          Published on {moment(createdDate).format("DD-MM-YYYY")}
          </p>
        <div className="flex justify-end">
          <button
            className="bg-rose-600 text-white mt-4 rounded-sm p-1 mr-3"
            onClick={deleteCourse}
          >
            <MdDelete color="white" onClick={deleteCourse} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
