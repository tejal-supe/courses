import React, { useEffect, useState } from "react";
import Cards from "../../components/common/Cards";
import {
  getAllCourseData,
  getCourseByAuthorService,
} from "../../services/course";
import Search from "./Search";

const Home = () => {
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCourse = async () => {
    try {
      const data = await getAllCourseData();
      setCourse(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getCourseByAuthor = async (authorName) => {
    try {
      if (!authorName.length == 0) {
        const data = await getCourseByAuthorService(authorName);
        setCourse(data.data);
        setLoading(false);
      } else {
        getCourse();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourse();
  }, []);

  return (
    <>
      <Search getCourseByAuthor={getCourseByAuthor} setLoading={setLoading} />
      <div className="mt-4 flex flex-wrap justify-center">
        {loading ? (
          <img
            src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
            alt="loading"
          />
        ) : (
          <>{
            course.length > 0?<>
 {course.map((data) => {
              return (
                <Cards
                  authorName={data.author}
                  courseName={data.name}
                  createdDate={data.created_at}
                  courseDescription={data.description}
                  thumbnail={data.thumbnail}
                  id={data.id}
                />
              );
            })}
            </>:<>
            <p className="text-bold text-xl">No Data Available</p>
            </>
          }
           
          </>
        )}
      </div>
    </>
  );
};

export default Home;
