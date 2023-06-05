import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/authContext";
import { Navigate, Link, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Switch from "../Components/Switch";
import service from "../service/service.js";

function ProviderProfile() {
  const { user } = useContext(AuthContext);
  const [provider, setProvider] = useState(null);
  const [userServiceProvided, setUserServiceProvided] = useState([]);
  const [commentary, setCommentary] = useState("");
  const [allCommentaries, setAllCommentaries] = useState([]);
  const [displayedCommentaries, setDisplayedCommentaries] = useState([]);
  const params = useParams();

  async function getProvider() {
    try {
      const response = await service.get(`/user/${params.provider}`);
      await setProvider(response.data.oneUser);
      console.log("this is the response", response);
      console.log("this is the provider", params.provider);
      setUserServiceProvided(response.data.userService);
    } catch (error) {
      console.log(error);
    }
  }
  async function getCommentaries() {
    try {
      const response = await service.get("/commentary");
      setAllCommentaries(response.data);
      const filteredCommentaries = allCommentaries.filter((elem) => {
        console.log("this is the elem", elem);
        return elem.commented === provider._id;
      });
      setDisplayedCommentaries(filteredCommentaries);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await service.post("/commentary", {
        commented: provider,
        commentary,
      });
      getCommentaries();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProvider();
    getCommentaries();
    console.log("those are the diplayed commentaries", displayedCommentaries);
  }, []);

  if (provider) {
    return (
      <>
        <div>
          <Navbar />
          <h1 style={{ paddingTop: "8vh" }}>{provider.name}'s Page</h1>
          <Link to={`/request/${provider._id}`}>MAKE A REQUEST</Link>
          {provider.skills &&
            provider.skills.map((elem) => {
              return <div key={elem._id}>{elem.name}</div>;
            })}
          <h2>Services rendus</h2>
          {userServiceProvided && userServiceProvided.length !== 0 ? (
            userServiceProvided.map((elem) => {
              return <div key={elem._id}>{elem.name}</div>;
            })
          ) : (
            <div>That bitch didn't provide any service yet</div>
          )}
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="commentaries">Leave a commentary</label>
            <input
              type="text"
              onChange={(event) => setCommentary(event.target.value)}
            />
            <button>Post your commentary</button>
          </form>
        </div>
        <div>
          <h3>Commentaries about {provider.name}</h3>
          <div>
            {displayedCommentaries.map((elem) => {
              return <div key={elem._id}>{elem.commentary}</div>;
            })}
          </div>
        </div>
      </>
    );
  }
}

export default ProviderProfile;