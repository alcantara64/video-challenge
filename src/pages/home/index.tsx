import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import Header from '../../components/header';
import BigMovieCard from '../../components/large-movie-card';
import Loading from '../../components/Loading';
import Search from '../../components/search';
import { defaultTheme } from '../../components/theme';
import { MovieService } from '../../services/movies';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PageContainer } from './style';

const Home = observer(() => {
  const [loading, setloading] = useState(false);
  const [movies, setMovies] = useState<Array<any>>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(20);
  const [moviesToShow, setmoviesToShow] = useState<Array<any>>([]);
  const fetchMovies = () => {
    setloading(true);
    const movieService = new MovieService();
    movieService
      .getMovies()
      .then((res) => {
        console.log('movies ==>', res.data.length);

        setMovies(res.data);
        setmoviesToShow(res.data.slice(0, 20));
        console.log(res.data.length);
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
  }, []);
  const callNext = () => {
    const newEndIndex = endIndex + 20;
    const newArray = [
      ...moviesToShow,
      ...movies.slice(endIndex + 1, newEndIndex),
    ];
    setmoviesToShow(newArray);
    console.log('next is called', movies.length);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <PageContainer id="pageContainer">
        <Header />

        {moviesToShow?.map((item) => (
          <BigMovieCard
            title={
              item._embedded && item._embedded.show && item._embedded.show.name
                ? item._embedded.show.name
                : item.name
            }
            image={
              item._embedded &&
              item._embedded.show &&
              item._embedded.show.image &&
              item._embedded.show.image?.medium
                ? item._embedded.show.image?.medium
                : item.image?.medium || ''
            }
          >
            {item._embedded &&
            item._embedded.show &&
            item._embedded.show.summary
              ? item._embedded.show.summary
              : item?.summary}
          </BigMovieCard>
        ))}
      </PageContainer>

      {loading && <Loading />}
    </ThemeProvider>
  );
});
export default Home;
