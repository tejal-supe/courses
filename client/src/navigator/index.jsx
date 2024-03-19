import React,{Suspense} from "react";
import { Route,BrowserRouter,Routes } from 'react-router-dom'

const HomePage  = React.lazy(()=>import('../pages/home'))


function Navigator(){
    return (
        <>
        <Suspense fallback={<div>Loading....</div>}>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
            </Routes>
            </BrowserRouter>

        </Suspense>
        </>
    )
}
export default Navigator