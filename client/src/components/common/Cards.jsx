import React from "react";
import { useNavigate } from "react-router-dom";

const Cards = ({
  authorName,
  courseName,
  createdDate,
  courseDescription,
  thumbnail,
  id
}) => {
  const navigate = useNavigate();

  const redirectToDetailsPage = () => {
    const data = {
      authorName,
      courseDescription,
      courseName,
      createdDate,
      thumbnail,
      id
    };
    navigate(`/course-details/${courseName.split(" ").join("-")}`, {
      state: data,
    });
  };

  return (
      <div className="w-72 sm:w-72 h-96 border bg-slate-100 rounded-lg shadow-md hover:shadow-lg cursor-pointer mx-5 my-4" key={id}>
        <div className="w-full h-40">
          <img
            src={thumbnail}
            alt="thumbnail"
            className="w-full h-full rounded-t-lg object-cover"
          />
        </div>
        <div className="py-3 px-3 h-[49%] ">
          <p className="font-bold text-xl tracking-wide">{courseName}</p>
          <p className="font-medium text-gray-400 text-sm ">By {authorName}</p>
          <p className="font-semibold text-sm tracking-wide break-words">
            {courseDescription?.length>160?courseDescription.slice(0, 160):courseDescription}...
          </p>
          <p className="font-thin text-slate-400 text-sm">
            Last updated {createdDate}
          </p>
        </div>
        <div className="bg-blue-400 text-center cursor-pointer py-1 text-white h-9 rounded-b-lg" onClick={redirectToDetailsPage}>
          <button >
            {" "}
            View Details
          </button>
        </div>
      </div>
  );
};

export default Cards;
