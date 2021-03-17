import { MovieCard } from './MovieCard';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import '../styles/content.scss';

interface Movie {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface ContentProps {
  selectedGenre: {
    title: string;
    id: number;
  }
}

export default function Content({selectedGenre}: ContentProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    const selectedGenreId = selectedGenre.id || 1;

    api.get<Movie[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

  }, [selectedGenre.id]);
  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key={movie.Title} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}
