import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";
import ProfilePage from "./Pages/ProfilePage";
import Search from "./Pages/Search";
import Personal from "./Pages/SkillsCategories/Personal";
import Professional from "./Pages/SkillsCategories/Professional";
import Home from "./Pages/SkillsCategories/Home";
import Transportation from "./Pages/SkillsCategories/Transportation";
import HealthAndWellness from "./Pages/SkillsCategories/HealthAndWellness";
import Creative from "./Pages/SkillsCategories/Creative";
import Educational from "./Pages/SkillsCategories/Educational";
import Discussion from "./Pages/Discussion";
import SearchResults from "./Pages/SearchResults";
import ModifySkills from "./Pages/modifySkills";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/personal" element={<Personal />} />
        <Route path="/professional" element={<Professional />} />
        <Route path="/health-and-wellness" element={<HealthAndWellness />} />
        <Route path="/home" element={<Home />} />
        <Route path="/transportation" element={<Transportation />} />
        <Route path="/creative" element={<Creative />} />
        <Route path="/educational" element={<Educational />} />
        <Route path="/discussion" element={<Discussion />} />
        <Route path="/search-result/:query" element={<SearchResults />} />
        <Route path="/modifySkills" element={<ModifySkills />}></Route>
      </Routes>
    </>
  );
}

export default App;
