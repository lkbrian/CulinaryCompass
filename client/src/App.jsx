import { Box } from "@chakra-ui/react";
import Home from './components/Home.jsx'
import { BrowserRouter, Route } from "react-router-dom";
// import  Navbar  from "./components/Navbar.jsx";
import RecipeForm from "./components/RecipeForm.jsx";

function App() {
  return (
    <BrowserRouter>
      <Box>
        <Route path="/" component={Home} />
        <Route path="/create" component={RecipeForm} />
        {/* Add more Route components for other routes if needed */}
        {/* <Navbar /> */}
        {/* <LoginForm/> */}
      </Box>
    </BrowserRouter>
  );
}

export default App;
