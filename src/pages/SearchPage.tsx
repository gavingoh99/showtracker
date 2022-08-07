import { useDebounce } from 'use-debounce';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TMDBShow } from '../types';
import SearchShowDisplay from '../components/SearchShowDisplay';
import { fetchShowsBasedOnKeywords } from '../utilities';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [debouncedSearchParams] = useDebounce(searchParams.get('q'), 1000);
  const [searchedShows, setSearchedShows] = useState<TMDBShow[]>([]);
  const configureSearchedShows = async (debouncedSearchParams: string) => {
    const shows = await fetchShowsBasedOnKeywords(debouncedSearchParams);
    setSearchedShows(shows);
  };
  useEffect(() => {
    if (debouncedSearchParams !== null) {
      configureSearchedShows(debouncedSearchParams);
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
