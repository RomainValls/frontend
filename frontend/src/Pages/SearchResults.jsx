import React, { useContext, useEffect, useState } from "react";
import service from "../service/service.js";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { AuthContext } from "../Context/authContext.jsx";

function SearchResults() {
  const { user } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [availableBrowsedUsers, setAvailableBrowsedUsers] = useState([]);
  const params = useParams();

  async function getAllUsers() {
    const response = await service.get("/user");
    setAllUsers(response.data);
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (user && allUsers.length > 0) {
      const usersBrowsing = allUsers.filter((elem) => {
        console.log("this is the elem", elem);
        return elem._id !== user._id && elem.skills.includes(params.query);
      });
      setSelectedUsers(usersBrowsing);
    }
    if (selectedUsers.length > 0) {
      const availableUsers = selectedUsers.filter((elem) => {
        return elem.availability === true;
      });
      setAvailableBrowsedUsers(availableUsers);
    }
  }, [allUsers, params]);

  if (availableBrowsedUsers.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: "10vh" }}>
        <div className="indications">
          <h3>Pick whomever</h3>
        </div>
        {availableBrowsedUsers.length > 0 &&
          availableBrowsedUsers.map((elem) => {
            const url = `/provider-profile/${elem._id}`;
            const url2 = `/request/${elem._id}/${params.query}`;
            return (
              <div className="results" key={elem._id}>
                <Link key={elem._id} to={url}>
                  <div>See {elem.name}'s profile</div>
                </Link>
                <Link to={url2}>
                  <div className="request-container">
                    <div>Request</div>
                    <img
                      src="../../public/Icons/arrow-right.png"
                      alt="make a request"
                      className="arrow-right"
                    />
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default SearchResults;
