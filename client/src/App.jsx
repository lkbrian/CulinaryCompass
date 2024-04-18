import { Box } from "@chakra-ui/react";
import Home from './components/Home.jsx'
import { BrowserRouter, Routes ,Route} from "react-router-dom";
// import  Navbar  from "./components/Navbar.jsx";
import RecipeForm from "./components/RecipeForm.jsx";
import Recipes from "./components/Recipes.jsx";
import RecipeByID from "./components/RecipeByID.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SessionProvider } from './components/SessionContext.jsx';
import Home from './components/Home';
import RecipeForm from './components/RecipeForm';
import Recipes from './components/Recipes';
import RecipeByID from './components/RecipeByID';
import LandingPage from './components/LandingPage';
import UserProfile from './components/UserProfile';

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
        </Routes>
        
      </SessionProvider>
    </Router>
  );
}

export default App;
