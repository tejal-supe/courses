import React from 'react'
import Cards from '../../components/common/Cards'

const Home = () => {
  const data ={
    authorName:'tejal',courseName:'abc',createdDate:'202020',courseDescription:`Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
    optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
    `,thumbnail:'https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg'
  }
  return (
    <div>
        <div className="text-3xl font-bold underline">Helllo </div>
        <Cards authorName={data.authorName} courseName={data.courseName} createdDate={data.createdDate} courseDescription={data.courseDescription} thumbnail={data.thumbnail}/>
    </div>
  )
}

export default Home