import React from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { deleteCouseService } from "../../services/course";

const CourseDetails = () => {
  const location = useLocation();
  const { thumbnail, courseName, authorName, courseDescription, createdDate,id } =
    location.state;
    const navigate = useNavigate();

    const deleteCourse = async() =>{
      const data = await deleteCouseService(id)
      if(data){
        navigate('/')
      }
    }
    return (
    <div className="mt-3 bg-white p-4 rounded shadow-sm">
      <div className="flex justify-between">
        <div className="w-1/3">
        <img src={thumbnail} alt="" className="w-full h-96" />
        </div>
        <div className="w-2/3 border ml-4">
          <p className="text-2xl">{courseName}</p>
          <p className="text-2xl">By {authorName}</p>
          <p className="text-2xl">{createdDate}</p>
          <p className="text-2xl">{courseDescription}</p>
          <button className="bg-rose-600 text-white mt-4" onClick={deleteCourse}>Delete</button>
        </div>

      </div>
      {/* <div className="w-full h-24">
        <img src={location.state.thumbnail} alt="" className="w-full h-96" />
      </div>
      <div className="py-2"></div> */}
    </div>
  );
};

export default CourseDetails;
