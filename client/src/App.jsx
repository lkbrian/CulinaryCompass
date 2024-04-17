// import LoginForm from "./components/LoginForm.jsx";
import { Box } from "@chakra-ui/react";
import Home from "./components/Home.jsx";
import {BrowserRouter,Route,Routes} from "react-router-dom"
// import  Navbar  from "./components/Navbar.jsx";
import RecipeForm from "./components/RecipeForm.jsx";
import Recipes from "./components/Recipes.jsx";
import RecipeByID from "./components/RecipeByID.jsx";

function App() {
  return (
    <BrowserRouter>
    <Box>
    <Routes>
      <Route path="/"element={<Home/>}/>
      <Route path="/create" element={<RecipeForm/>}/>
      <Route path="/all_recipes" element={<Recipes/>}/>
      <Route path="/all_recipes/:id" element={<RecipeByID/>}/>
    </Routes>
      {/* <Navbar /> */}
      {/* <LoginForm/> */}
    </Box>
    </BrowserRouter>
  );
}

export default App;
