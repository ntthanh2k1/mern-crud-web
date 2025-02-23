import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";

function App() {
  return (
    <>
      <Box minH={"100vh"}>
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post" element={<PostPage />} />
        </Routes>
      </Box>
    </>
  );
};

export default App;
