import React, { useEffect, useState } from "react";
import service from "../../service/service.js";
import Navbar from "../../Components/Navbar";
import { Link } from "react-router-dom";

function Transportation() {
  const [skills, setSkills] = useState([]);

  async function getAllSkills() {
    const response = await service.get("/skills");
    setSkills(response.data);
  }

  useEffect(() => {
    getAllSkills();
  }, []);

  if (skills.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="titles" style={{ paddingTop: "5vh" }}>
        <h2 className="titles">Transportation Services</h2>
      </div>
      <div className="indications">
        <h4>Which skill are you interrested in ?</h4>
      </div>
      <div className="bullet-points">
        {skills.map((elem) => {
          if (elem.serviceCategory === "Transportation") {
            const url = `/search-result/${elem._id}`;
            return (
              <Link key={elem._id} to={url}>
                <div className="skill-container transportationBorder">
                  {elem.name}
                </div>
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
}

export default Transportation;
