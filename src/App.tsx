import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Shows from './pages/Shows';
import List from './pages/List';
import SearchPage from './pages/SearchPage';
import Navbar from './components/Navbar';
import ShowInformation from './components/ShowInformation';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route path='list' element={<List />} />
          <Route element={<ShowInformation />}>
            <Route index element={<HomePage />} />
            <Route path='shows/*' element={<Shows />} />
            <Route path='search' element={<SearchPage />} />
            <Route path='*' element={<HomePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
