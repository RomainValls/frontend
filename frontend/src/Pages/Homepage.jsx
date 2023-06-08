import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { AuthContext } from "../Context/authContext";
import service from "../service/service";

function Homepage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [wallet, setWallet] = useState(0);

  async function getWallet() {
    try {
      const wallet = await service.get("/wallet");
      console.log("this is the wallet", wallet);
      setWallet(wallet.data.barterBucks);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getWallet();
  }, [user]);

  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: "5vh" }}>
        <h1 className="title">
          Welcome to{" "}
          <span>
            <img src="../../public/Pictures/Barter-black.png" alt="" />
          </span>{" "}
          !
        </h1>
        <div className="homepage-indications">
          <h2 className="indications">
            Trade services, earn BarterBucks, and embrace the spirit of
            collaboration with Barter!
          </h2>
        </div>
      </div>

      {user ? (
        <div>
          <div className="homepage-text-content">
            You have{" "}
            <span style={{ color: "#006D77", fontWeight: "900" }}>
              {wallet}
            </span>{" "}
            BarterBucks ! Go ahead and click <Link to="/search">here</Link> to
            look for someone available to help you out !
          </div>
          <div className="homepage-text-content">
            You can also <Link to="/profile">visit your profile</Link> and
            update your skills and your availability for other users to request
            your help.
          </div>
          <div className="homepage-text-content">
            Enjoy and have a great time with your community !
          </div>
        </div>
      ) : (
        <div>
          <div className="homepage-text-content">
            You are not logged in yet. <Link to="/login">Log in</Link> to come
            back to your community.
          </div>
          <div className="homepage-text-content">
            If you don't have an account yet, <Link to="/signup">sign up</Link>{" "}
            to join a thriving community, help others, get BarterBucks and ask
            around for any kind of services !
          </div>
        </div>
      )}
    </div>
  );
}

export default Homepage;
