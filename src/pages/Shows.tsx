import { useState, useEffect } from 'react';
import Carousel from '../components/Carousel';
import RandomShowDisplay from '../components/RandomShowDisplay';
import { fetchDiscoverShows, fetchTopShows } from '../utilities';
import { TMDBShow } from '../types';

export default function Shows() {
  const [discoverShows, setDiscoverShows] = useState<TMDBShow[]>([]);
  const [topShows, setTopShows] = useState<TMDBShow[]>([]);

  const configureTopShows = async () => {
    const shows = await fetchTopShows();
    setTopShows(shows);
  };
  const configureDiscoverShows = async () => {
    const shows = await fetchDiscoverShows();
    setDiscoverShows(shows);
  };
  useEffect(() => {
    configureDiscoverShows();
    configureTopShows();
  }, []);

  return (
    <div className='w-screen h-screen'>
      <RandomShowDisplay />
      <Carousel name='Discover Shows' shows={discoverShows} />
      <Carousel name='Top Shows' shows={topShows} />
    </div>
  );
}
