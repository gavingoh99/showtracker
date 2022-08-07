import { useNavigate, useLocation } from 'react-router-dom';
export function useNewPath(showId: number | undefined) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const newPath = pathname === '/' ? `/${showId}` : `${pathname}/${showId}`;
  return { navigate, newPath };
}
export function useCurrentPath() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return { navigate, pathname };
}
