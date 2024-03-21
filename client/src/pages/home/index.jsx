import React, { useEffect, useState } from "react";
import Cards from "../../components/common/Cards";
import { getAllCourseData } from "../../services/course";

const Home = () => {
  const data = {
    authorName: "tejal",
    courseName: "abc yefk",
    createdDate: "202020",
    courseDescription: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
    optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
    `,
    thumbnail:
      "https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg",
  };
  const [course,setCourse] = useState([]);

  const getCourse = async() =>{
      try {
          const data = await getAllCourseData();
          setCourse(data.data)
      } catch (error) {
        console.log(error);
      }
  }
  console.log(course,'course');

  useEffect(()=>{
    getCourse();
  },[])
  return (
    <div className="mt-4 flex flex-wrap justify-center">
    {
      course.map((data)=>{
        return(
          <Cards
            id={data.id}
            authorName={data.author}
            courseName={data.name}
            createdDate={data.creation_date}
            courseDescription={data.description}
            thumbnail={data.thumbnail}
          />

        )
      })
    }
     
    </div>
  );
};

export default Home;
