import { useEffect, useState } from 'react';
import { Row, Col, Container, Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/header';
import { AppButton, RenderSummary } from '../../components/large-movie-card';
import Loading from '../../components/Loading';
import LoginSignUP from '../../components/LoginSignUp';
import { MovieService } from '../../services/movies';
import NotificationService from '../../services/NotificationService';
import './index.css';
const MoviesDetail = (props: any) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState<any>(null);
  const [showLogin, setShowlogin] = useState<any>(false);
  const movieService = new MovieService();
  const fetchMovie = () => {
    setLoading(true);

    const id = props.match?.params?.id;
    if (!id) {
      history.push('/');
    }
    movieService
      .getMovie(id)
      .then((res) => {
        console.log('props in detail', res.data);
        setMovie(res.data);
      })
      .catch((error) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const addToFavourite = () => {
    const token = localStorage.getItem('token');
    if (token) {
      movieService
        .addToFavorite(token, movie)
        .then(() => {
          NotificationService.show('Added to favorite successfully', 'success');
        })
        .catch((err) => {
          NotificationService.show(err.message, 'error');
        });
    } else {
      //NotificationService.show('please login to add favorite', 'error');
      setShowlogin(true);
    }
  };
  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <>
      <Header />
      <Container className="detailed-container">
        <DetailRow>
          <Col lg={6} md={12} sm={12}>
            <H2> {movie?.name}</H2>
            <div className="star-rating">
              <span className="fa fa-star-o" data-rating="1"></span>
              <span className="fa fa-star-o" data-rating="2"></span>
              <span className="fa fa-star-o" data-rating="3"></span>
              <span className="fa fa-star-o" data-rating="4"></span>
              <span className="fa fa-star-o" data-rating="5"></span>
              <input
                type="hidden"
                name="whatever1"
                className="rating-value"
                value="2.56"
              />
            </div>
            <RenderSummary text={movie?.summary} />
            {showLogin && (
              <LoginSignUP
                onHide={() => {
                  setShowlogin(false);
                }}
              ></LoginSignUP>
            )}
            <AppButton
              onClick={() => {
                addToFavourite();
              }}
            >
              Add To Favorite
            </AppButton>
          </Col>
          <Col lg={6}>
            <Image src={movie?.image?.original} alt="  details" height="600" />
          </Col>
        </DetailRow>
        {loading && <Loading />}
      </Container>
    </>
  );
};
const DetailRow = styled(Row)`
  margin-top: 30px;
  justify-content: center;
`;
const H2 = styled.h2`
  padding-top: 30%;
  color: ${(props) => props.theme.buttonColor};
`;

export default MoviesDetail;
