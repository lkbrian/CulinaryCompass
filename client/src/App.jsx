
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SessionProvider } from "./components/SessionContext.jsx";
import RecipeForm from "./components/RecipeForm";
import Recipes from "./components/Recipes";
import RecipeByID from "./components/RecipeByID";
import LandingPage from "./components/LandingPage";
import UserProfile from "./components/UserProfile";
import Collections from "./components/Collections.jsx";
import Favorite from './components/Favorite.jsx'

function App() {
  return (
    <Router>
      <SessionProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/create" element={<RecipeForm />} />
          <Route path="/all_recipes" element={<Recipes />} />
          <Route path="/user=?username" element={<UserProfile />} />
          <Route path="/all_recipes/:id" element={<RecipeByID />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/favorites" element={<Favorite />} />
        </Routes>
      </SessionProvider>
    </Router>
  );
}

export default App;
