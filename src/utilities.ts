export const fetchTrendingShows = async () => {
  const response = await fetch('https://api.trakt.tv/shows/trending', {
    headers: {
      'Content-Type': 'application/json',
      'trakt-api-version': '2',
      'trakt-api-key':
        'fddbd8b86439fc18df9a7daef3c046348597cee300abaffb92818bd93ed43392',
    },
  });
  const fetchedShows = await response.json();
  const trendingShows = [];
  for (const fetchedShow of fetchedShows) {
    const imageResponse = await fetch(
      `https://api.themoviedb.org/3/tv/${fetchedShow.show.ids.tmdb}?api_key=c5ba87200850160b504002559ab8c750`
    );
    const trendingShow = await imageResponse.json();
    trendingShows.push(trendingShow);
  }
  return trendingShows;
};

export const fetchAnticipatedShows = async () => {
  const response = await fetch('https://api.trakt.tv/shows/anticipated', {
    headers: {
      'Content-Type': 'application/json',
      'trakt-api-version': '2',
      'trakt-api-key':
        'fddbd8b86439fc18df9a7daef3c046348597cee300abaffb92818bd93ed43392',
    },
  });
  const fetchedShows = await response.json();
  const anticipatedShows = [];
  for (const fetchedShow of fetchedShows) {
    const imageResponse = await fetch(
      `https://api.themoviedb.org/3/tv/${fetchedShow.show.ids.tmdb}?api_key=c5ba87200850160b504002559ab8c750`
    );
    const anticipatedShow = await imageResponse.json();
    anticipatedShows.push(anticipatedShow);
  }
  return anticipatedShows;
};

export const fetchDiscoverShows = async () => {
  const response = await fetch(
    'https://api.themoviedb.org/3/discover/tv?api_key=c5ba87200850160b504002559ab8c750&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0'
  );
  const shows = await response.json();
  return shows.results;
};

export const fetchTopShows = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=c5ba87200850160b504002559ab8c750&language=en-US&page=1`
  );
  const shows = await response.json();
  return shows.results;
};

export const getRandomShow = async () => {
  const pageNumber = Math.floor(Math.random() * 20) + 1;
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=c5ba87200850160b504002559ab8c750&sort_by=popularity.desc&page=${pageNumber}&timezone=America%2FNew_York&include_null_first_air_dates=false&with_original_language=en&with_watch_monetization_types=flatrate&with_status=0&with_type=0`
  );
  const shows = await response.json();
  const itemNumber = Math.floor(Math.random() * shows.results.length);
  return shows.results[itemNumber];
};
