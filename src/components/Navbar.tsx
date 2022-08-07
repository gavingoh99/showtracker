import { Link, Outlet } from 'react-router-dom';
import { useRef } from 'react';
import SearchBar from './SearchBar';
import '../index.css';

export default function Navbar() {
  const searchBarRef = useRef<any>();
  const handleNavigation = () => {
    const { current } = searchBarRef;
    if (current !== undefined) {
      current.shrinkSearchBar();
      current.setIsClosedByRef(true);
      current.setSearchKeyword('');
      current.setIsClosedByRef(false);
    }
  };

  return (
    <div>
      <div className='flex justify-between p-5 pl-10 bg-gradient-to-b from-black to-transparent font-roboto'>
        <div className='flex flex-1 gap-10'>
          <div className='text-white '>Placeholder</div>
          <Link
            to='/'
            className='text-sm text-white'
            onClick={handleNavigation}
          >
            Home
          </Link>
          <Link
            to='/shows'
            className='text-sm text-white'
            onClick={handleNavigation}
          >
            TV Shows
          </Link>
          <Link
            to='/list'
            className='text-sm text-white'
            onClick={handleNavigation}
          >
            My List
          </Link>
        </div>
        <div className='flex w-1/4 justify-end gap-10 pr-10'>
          <SearchBar ref={searchBarRef} />
          <button className='material-symbols-outlined text-white'>
            notifications
          </button>
          <button className='material-symbols-outlined text-white'>
            account_circle
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
