import { TMDBShow } from '../types';
import { useNewPath } from '../hooks';

export default function SearchShowDisplay({ show }: { show: TMDBShow }) {
  const { navigate, newPath } = useNewPath(show?.id);
  return (
    <div className=' aspect-video relative'>
      <img
        src={`https://image.tmdb.org/t/p/original/${show.backdrop_path}`}
        alt='showImage'
      />
      <div
        className='flex justify-center items-center bg-black opacity-0 hover:opacity-60 transition-opacity duration-300 w-full h-full top-0 absolute'
        onClick={() => {
          window.scrollTo(0, 0);
          navigate(newPath);
        }}
      >
        <span className='text-white text-m font-roboto w-1/2 text-center whitespace-normal'>
          {show.name}
        </span>
      </div>
    </div>
  );
}
