import React,{Suspense} from "react";
import { Route,BrowserRouter,Routes } from 'react-router-dom'

const HomePage  = React.lazy(()=>import('../pages/home'))
const CourseDetails = React.lazy(() => import("../pages/courseDetails"));


function Navigator(){
    return (
      <>
        <Suspense fallback={<div>Loading....</div>}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/course-details/*" element={<CourseDetails />} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </>
    );
}
export default Navigator