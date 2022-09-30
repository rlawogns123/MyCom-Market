import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Login from './pages/Login';
import Heading from './components/Heading';
import SignUp from './pages/SignUp';
import Upload from './pages/Upload';
import ProductDetail from './pages/ProductDetail';
import Edit from './pages/Edit';

function App() {
  return (
    <>
      <Heading />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/product/:productNum" element={<ProductDetail />} />
        <Route path="/edit/:productNum" element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
