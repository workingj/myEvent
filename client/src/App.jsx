import { Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import NotFound from './components/NotFound.jsx';

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>

        <Route path='*' element={<NotFound />}></Route>
     </Routes>
    </>
  );
}
