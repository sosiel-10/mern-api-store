import { Box, useColorModeValue } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddPage from './pages/AddPage';
import Navbar from './components/Navbar';

function App() {
  return (
    //Box is like div in Chakra
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddPage />} />
      </Routes>
    </Box>
  )
}

export default App
