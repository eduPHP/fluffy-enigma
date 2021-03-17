import { useEffect, useState } from 'react';
import { api } from './services/api';
import './styles/global.scss';

import SideBar from './components/SideBar';
import Content from './components/Content';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    const selectedGenreId = selectedGenre.id || 1;

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenre.id]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar setSelectedGenre={setSelectedGenre} selectedGenreId={selectedGenre.id} />

      <Content selectedGenre={selectedGenre} />
    </div>
  )
}
