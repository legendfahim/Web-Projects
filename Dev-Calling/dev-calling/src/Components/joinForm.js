import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

const JoinForm = ({ title, Name, roomCode }) => {
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleJoinRoom = useCallback(() => {

    if (!name || !value) {
      alert("Please provide a name and room code.");

    } else {
      navigate(`/room/${value}`, { state: { userName: name } });
    }
  }, [navigate, value, name]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">{title}</h3>
            <form>
              <div className="form-group">
                <input
                  name={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="form-control mb-3"
                  id="name"
                  placeholder={Name}
                />
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  type="text"
                  className="form-control"
                  id="roomID"
                  placeholder={roomCode}
                />
              </div>
              <div className="text-center mt-3">
                <button
                  className="btn btn-primary btn-block"
                  onClick={handleJoinRoom}
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <button className="btn btn-primary btn-block bg-warning ">
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

export default JoinForm;



