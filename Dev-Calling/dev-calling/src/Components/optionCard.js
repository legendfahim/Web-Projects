import React from "react";
import { Link } from "react-router-dom";

const OptionCard = () => {
  return (
    <div className="row">
      <div className="col-md-6 my-5">
        <div className="card mb-4 shadow">
          <div className="card-body ">
            <h5 className="card-title">Join A Call</h5>
            <p className="card-text">
              It is a user-friendly feature that allows participants to easily
              connect and participate in audio or video meetings.
            </p>
            <Link to="/join-a-call" className="btn btn-primary">
              Action
            </Link>
          </div>
        </div>
      </div>
      <div className="col-md-6 my-5 ">
        <div className="card mb-4 shadow ">
          <div className="card-body">
            <h5 className="card-title">Create a Call</h5>
            <p className="card-text">
              Initiate a phone or video conversation with someone by
              establishing a communication link, enabling real-time interaction.
            </p>
            <Link to="/create-a-call" className="btn btn-primary">
              Action
            </Link>
          </div>
        </div>
      </div>
      <button className="btn btn-primary btn-block bg-warning">
        <Link
          to="/"
          className="nav-link active "
          aria-current="page"
        >
          Back To Home
        </Link>
      </button>
    </div>
  );
};

export default OptionCard;