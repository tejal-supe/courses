import React from 'react'

const Cards = ({authorName,courseName,createdDate,courseDescription,thumbnail}) => {

  return (
    <>
    <div className='sm:w-72 h-96 border bg-slate-100 rounded-lg shadow-md hover:shadow-lg cursor-pointer'>
        <div className="w-full h-40">
          <img src={thumbnail} alt="thumbnail" className="w-full h-full rounded-t-lg"/>
        </div>
        <div className="py-3 px-3 h-[49%]">
            <p className='font-bold text-xl tracking-wide'>{courseName}</p>
            <p className='font-medium text-gray-400 text-sm '>By {authorName}</p>
            <p className='font-semibold text-sm tracking-wide'>{courseDescription.slice(0,160)}...</p>  
            <p>{createdDate}</p>
        </div>
        <div className='bg-blue-400 text-center py-1 text-white h-9 rounded-b-lg'>
          <button className='ab '> View Details</button>
        </div>
    </div>  

    </>
  )
}

export default Cards