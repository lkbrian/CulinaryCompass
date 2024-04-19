import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SessionProvider } from "./components/SessionContext.jsx";
import Home from "./components/Home";
import RecipeForm from "./components/RecipeForm";
import Recipes from "./components/Recipes";
import RecipeByID from "./components/RecipeByID";
import LandingPage from "./components/LandingPage";
import UserProfile from "./components/UserProfile";
import Collection from "./components/Collection.jsx";
import Favorite from './components/Favorite.jsx'

function App() {
  return (
    <Router>
      <SessionProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<RecipeForm />} />
          <Route path="/all_recipes" element={<Recipes />} />
          <Route path="/home/:username" element={<UserProfile />} />
          <Route path="/all_recipes/:id" element={<RecipeByID />} />
          <Route path="/collections" element={<Collection />} />
          <Route path="/favourites" element={<Favorite/>}/>
        </Routes>
      </SessionProvider>
    </Router>
  );
}

export default App;
