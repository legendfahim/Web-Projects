import React from "react";

const optionCard = () => {
  return (
    <div className="row">
      <div className="col-md-6 my-5">
        <div className="card mb-4 shadow">
          <div className="card-body ">
            <h5 className="card-title">One to One Call</h5>
   
            <Link to="/one-to-one-call" className="btn btn-primary">
            Action
            </Link>
          </div>
        </div>
      </div>
      <div className="col-md-6 my-5 " >
        <div className="card mb-4 shadow ">
          <div className="card-body">
            <h5 className="card-title">Group Call</h5>

        
            <Link to="/group-call" className="btn btn-primary">
            
              Action
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default optionCard;