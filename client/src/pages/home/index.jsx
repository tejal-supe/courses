import React, { useEffect, useState } from "react";
import Cards from "../../components/common/Cards";
import { getAllCourseData , getCourseByAuthorService } from "../../services/course";
import Search from "./Search";

const Home = () => {
  const [course,setCourse] = useState([]);

  const getCourse = async() =>{
      try {
          const data = await getAllCourseData();
          setCourse(data.data)
      } catch (error) {
        console.log(error);
      }
  }
  const getCourseByAuthor = async(authorName) =>{
      console.log(authorName,'in home');
      try {
        const data = await getCourseByAuthorService(authorName);
        setCourse(data.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getCourse();
  },[])

  return (
    <>
    <Search getCourseByAuthor={getCourseByAuthor}/>
    <div className="mt-4 flex flex-wrap justify-center">
    {
      course.map((data)=>{
        return(
          <Cards
            authorName={data.author}
            courseName={data.name}
            createdDate={data.creation_date}
            courseDescription={data.description}
            thumbnail={data.thumbnail}
            id={data.id}
          />

        )
      })
    }
    </div>
    </>
  );
};

export default Home;
