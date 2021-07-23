import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/header';
import BigMovieCard, { AppButton } from '../../components/large-movie-card';
import Loading from '../../components/Loading';
import { MovieService } from '../../services/movies';
import { PaginationContainer } from './style';

const Home = observer(() => {
  const [loading, setloading] = useState(false);
  const [movies, setMovies] = useState<Array<any>>([]);
  const [isSearch, setisSearch] = useState(false);
  const movieService = new MovieService();
  const [currentPage, setcurrentPage] = useState(1);
  const [canGoNext, setCanGONext] = useState(false);
  const fetchMovies = () => {
    setloading(true);

    movieService
      .getMovies(currentPage)
      .then((res) => {
        console.log('movies ==>', res.data);
        if (res.data.length > 0) {
          setCanGONext(true);
        }
        setMovies(res.data);
      })
      .catch((err) => {
        console.log('error', err);
      })
      .finally(() => {
        setloading(false);
      });
  };

  useEffect(() => {
    fetchMovies();
  }, [currentPage]);
  const search = (e: any) => {
    if (e.target.value) {
      setloading(true);
      movieService
        .search(e.target.value)
        .then((res) => {
          console.log(res.data);
          if (res.data?.length) {
            setMovies(res.data);
          }
        })
        .catch((error) => {
          console.log('error ==>', error);
        })
        .finally(() => {
          setloading(false);
        });
    } else {
      setisSearch(false);
      fetchMovies();
    }
  };

  return (
    <>
      <Header showSearch onSearch={search} />
      <MoviesContainer>
        {movies?.map((item, index) => (
          <BigMovieCard
            key={item.id}
            title={
              item.show && item.show.name ? item.show.name : item.name || ''
            }
            movie={item.id}
            image={
              item.show && item.show.image && item.show.image?.medium
                ? item.show.image?.medium
                : item.image?.medium || ''
            }
          >
            {item.show && item.show.summary
              ? item.show.summary
              : item?.summary || ''}
          </BigMovieCard>
        ))}
      </MoviesContainer>
      <PaginationContainer>
        {currentPage > 1 && (
          <AppButton
            onClick={() => {
              setTimeout(function () {
                window.scrollTo(0, 0);
              }, 1);
              setcurrentPage(currentPage - 1);
            }}
          >
            previous
          </AppButton>
        )}
        {canGoNext && (
          <AppButton
            onClick={() => {
              setTimeout(function () {
                window.scrollTo(0, 0);
              }, 1);
              setcurrentPage(currentPage + 1);
            }}
          >
            Next
          </AppButton>
        )}
      </PaginationContainer>
      {loading && <Loading />}
    </>
  );
});
export default Home;

export const MoviesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 100px;
}
`;
