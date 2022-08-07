import { useState, useEffect } from 'react';
import { TMDBShow } from '../types';
import { getRandomShow } from '../utilities';
import { useNewPath } from '../hooks';

export default function RandomShowDisplay() {
  const [randomShow, setRandomShow] = useState<TMDBShow>();
  const { navigate, newPath } = useNewPath(randomShow?.id);
  const configureRandomShow = async () => {
    const show = await getRandomShow();
    setRandomShow(show);
  };

  useEffect(() => {
    configureRandomShow();
  }, []);
  if (randomShow === undefined) return null;
  return (
    <div className='h-full'>
      <img
        src={`https://image.tmdb.org/t/p/original${randomShow.backdrop_path}`}
        alt='randomShowImage'
        className='absolute top-0 -z-10 opacity-80 bg-cover bg-top w-full h-full'
      />
      <div className='flex h-full justify-start items-center'>
        <div className='flex flex-col w-1/3 h-full justify-center pl-10'>
          <div className='bg-black p-10 opacity-0 hover:opacity-60 transition-opacity ease=in-out duration-500 font-roboto'>
            <div className='text-white'>
              <div className='text-3xl'>{randomShow.name}</div>
              <div className='text-xl'>{randomShow.overview}</div>
            </div>
            <div className='flex justify-start gap-5 '>
              <button
                className='hover:bg-gray-100 p-3 border bg-white rounded-md'
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate(newPath);
                }}
              >
                <div className='flex items-center gap-3'>
                  <span className='material-symbols-outlined'>info</span>
                  <span>More Info</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
