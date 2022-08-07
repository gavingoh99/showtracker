export interface Show {
  show: {
    title: string;
    year: number;
    ids: {
      trakt: number;
      tmdb: number;
    };
    img: string;
  };
}

export interface TMDBShows {
  results: TMDBShow[];
}
export interface TMDBShow {
  name: string;
  overview: string;
  backdrop_path: string;
  id: number;
}
