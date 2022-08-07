import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { TMDBShow } from '../types';
export default function ShowInformation() {
  const [show, setShow] = useState<TMDBShow>();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const urlParams = pathname.split('/');
  const showId = urlParams[urlParams.length - 1];
  const fetchShow = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${showId}?api_key=c5ba87200850160b504002559ab8c750`
    );
    const show = await response.json();
    setShow(show);
  };
  useEffect(() => {
    if (showId !== '' && !isNaN(+showId)) {
      fetchShow();
      document.querySelector('.showInfo')?.classList.toggle('none');
    }
  }, [showId]);
  return (
    <div>
      <div className='showInfo none'>
        {show !== undefined && (
          <>
            <div
              className='z-10 fixed top-0 left-0 bottom-0 right-0 bg-black opacity-60'
              onClick={() => {
                document.querySelector('.showInfo')?.classList.toggle('none');
                navigate(-1);
              }}
            />
            <dialog
              open
              className='p-0 rounded-md font-roboto bg-white shadow-md w-1/2 h-full mt-5 z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
            >
              <button
                className='text-3xl m-1 absolute top-0 right-0 z-10 text-white material-symbols-outlined'
                onClick={() => {
                  document.querySelector('.showInfo')?.classList.toggle('none');
                  navigate(-1);
                }}
              >
                cancel
              </button>
              <img
                className='rounded-t-md'
                src={`https://image.tmdb.org/t/p/original/${show.backdrop_path}`}
                alt='showImage'
              />
              <div className='p-5'>
                <div className='text-3xl'>{show.name}</div>
                <div className='text-md'>{show.overview}</div>
              </div>
            </dialog>
          </>
        )}
      </div>
      <Outlet />
    </div>
  );
}
