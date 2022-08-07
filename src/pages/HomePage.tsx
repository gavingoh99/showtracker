import { useState, useEffect } from 'react';
import RandomShowDisplay from '../components/RandomShowDisplay';
import Carousel from '../components/Carousel';
import { TMDBShow } from '../types';
import { fetchTrendingShows, fetchAnticipatedShows } from '../utilities';

export default function HomePage() {
  const [trendingShows, setTrendingShows] = useState<TMDBShow[]>([]);
  const [anticipatedShows, setAnticipatedShows] = useState<TMDBShow[]>([]);

  const configureTrendingShows = async () => {
    const shows = await fetchTrendingShows();
    setTrendingShows(shows);
  };
  const configureAnticipatedShows = async () => {
    const shows = await fetchAnticipatedShows();
    setAnticipatedShows(shows);
  };

  useEffect(() => {
    configureTrendingShows();
    configureAnticipatedShows();
  }, []);

  return (
    <div className='h-screen w-screen'>
      <RandomShowDisplay />
      <Carousel name='Trending Now' shows={trendingShows} />
      <Carousel name='Anticipated Shows' shows={anticipatedShows} />
    </div>
  );
}
