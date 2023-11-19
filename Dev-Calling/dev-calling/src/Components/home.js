import React from "react";
import { Link } from "react-router-dom";
import Footer from "./footer";



const HomePage = () => {
   

return (
    <>
    {/* Navbar */}
    
        <navbar/>

    {/* Option Card */}
    <div className="row ">
      <div className="col-md-4 my-5 mx-auto">
        <div className="card mb-4 shadow">
          <div className="card-body mx-auto">
            <h5 className="card-title">One to One Call</h5>
   
            <Link to="/one-to-one-call" className="btn btn-primary">
            Action
            </Link>
          </div>
        </div>
      </div>
      <div className="col-md-4 my-5 mx-auto" >
        <div className="card mb-4 shadow ">
          <div className="card-body mx-auto">
            <h5 className="card-title">Group Call</h5>

            <Link to="/group-call" className="btn btn-primary">
            
              Action
            </Link>

          </div>
        </div>
      </div>

    </div>
    <Footer/>
    </>
)
};



export default HomePage;