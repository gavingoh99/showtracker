import { useDebounce } from 'use-debounce';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TMDBShow } from '../types';
import SearchShowDisplay from '../components/SearchShowDisplay';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [debouncedSearchParams] = useDebounce(searchParams.get('q'), 1000);
  const [searchedShows, setSearchedShows] = useState<TMDBShow[]>([]);
  const fetchShowsBasedOnKeywords = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=c5ba87200850160b504002559ab8c750&language=en-US&page=1&query=${debouncedSearchParams}&include_adult=false`
    );
    const shows = await response.json();
    setSearchedShows(shows.results);
  };
  useEffect(() => {
    if (debouncedSearchParams !== null) {
      fetchShowsBasedOnKeywords();
    }
  }, [debouncedSearchParams]);

  if (debouncedSearchParams === null) return null;

  return (
    <div className='p-10'>
      <div className='grid grid-cols-4 gap-5 h-full w-full'>
        {searchedShows.map((show) => (
          <SearchShowDisplay show={show} />
        ))}
      </div>
    </div>
  );
}
