import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useCurrentPath } from '../hooks';

const SearchBar = forwardRef((props, ref) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const { navigate, pathname } = useCurrentPath();
  const [prevPath, setPrevPath] = useState<string>(pathname);
  const [isClosedByRef, setIsClosedByRef] = useState<boolean>(false);
  const closeBtn = document.querySelector('#searchBarCloseBtn') as HTMLElement;

  useImperativeHandle(ref, () => {
    return {
      shrinkSearchBar,
      setSearchKeyword,
      setIsClosedByRef,
    };
  });

  const shrinkSearchBar = () => {
    const searchBar = document.querySelector('.searchBar') as HTMLInputElement;
    const searchIcon = document.querySelector('.searchIcon') as HTMLElement;
    searchBar.classList.remove('expandedSearchBar');
    searchBar.classList.add('collapsedSearchBar');
    setTimeout(() => {
      searchBar.classList.add('none');
      searchIcon.classList.remove('none');
    }, 200);
  };

  useEffect(() => {
    if (searchKeyword === '') {
      if (!isClosedByRef) {
        navigate(prevPath);
      } else {
        setIsClosedByRef(false);
      }
      closeBtn?.classList.add('concealCloseBtn');
      document.querySelector('.wrapper')?.classList.remove('none');
    } else {
      const params = new URLSearchParams({ q: searchKeyword });
      navigate({ pathname: '/search', search: params.toString() });
      closeBtn?.classList.remove('concealCloseBtn');
      document.querySelector('.wrapper')?.classList.add('none');
    }
  }, [searchKeyword]);

  return (
    <div>
      <div
        className='wrapper absolute none top-0 bottom-0 left-0 right-0'
        onClick={() => {
          shrinkSearchBar();
          document.querySelector('.wrapper')?.classList.add('none');
        }}
      />

      <div
        id='searchBarContainer'
        className='searchBar collapsedSearchBar none flex opacity-60 p-1 text-white bg-black border border-white outline-transparent'
      >
        <label htmlFor='searchBar' className='material-symbols-outlined'>
          search
        </label>
        <input
          id='searchBar'
          className='searchBar opacity-60 text-white bg-black'
          placeholder='Titles'
          value={searchKeyword}
          onChange={(event: React.ChangeEvent) => {
            const searchBar = event.target as HTMLInputElement;
            const searchValue = searchBar.value;
            setSearchKeyword(searchValue);
          }}
        />
        <label
          id='searchBarCloseBtn'
          className='concealCloseBtn material-symbols-outlined'
          onClick={() => {
            setSearchKeyword('');
          }}
        >
          close
        </label>
      </div>
      {/* <input */}
      {/*   id='searchBar' */}
      {/*   className='searchBar collapsedSearchBar none opacity-60 p-1 text-white bg-black border border-white outline-transparent' */}
      {/*   placeholder='Titles' */}
      {/*   value={searchKeyword} */}
      {/*   onChange={(event: React.ChangeEvent) => { */}
      {/*     const searchBar = event.target as HTMLInputElement; */}
      {/*     const searchValue = searchBar.value; */}
      {/*     setSearchKeyword(searchValue); */}
      {/*   }} */}
      {/* /> */}
      <label
        htmlFor='searchBar'
        className='material-symbols-outlined text-white searchIcon'
        onClick={(event: React.MouseEvent) => {
          const searchBar = document.querySelector(
            '#searchBarContainer'
          ) as HTMLElement;
          const searchIcon = event.target as HTMLElement;
          searchIcon.classList.toggle('none');
          searchBar.classList.toggle('none');
          setTimeout(() => {
            searchBar.classList.toggle('collapsedSearchBar');
            searchBar.classList.toggle('expandedSearchBar');
          });
          const wrapper = document.querySelector('.wrapper') as HTMLElement;
          wrapper.classList.toggle('none');
        }}
      >
        search
      </label>
    </div>
  );
});
export default SearchBar;
