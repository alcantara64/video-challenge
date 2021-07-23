import { Button, Card, Container, Image } from 'react-bootstrap';
import styled from 'styled-components';
import './index.css';
import { useHistory } from 'react-router';

const BigMovieCard: React.FC<IBigMovieCardProps> = ({
  title,
  image,
  children,
  movie,
}) => {
  const history = useHistory();
  return (
    <CardContainer url="">
      <AppCard style={{ width: '18rem' }}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <H6>{title}</H6>
          <Card.Text>
            <RenderSummary
              id="card-text"
              text={children?.slice(0, 65)}
              FavoriteButton
            />
            {children?.length > 65 ? (
              <ReadMoreText> read more </ReadMoreText>
            ) : null}
          </Card.Text>
          <AppButton
            onClick={() =>
              history.push(`/details/${movie}`, { selectedMovie: movie })
            }
            className="action-button"
          >
            View
          </AppButton>
        </Card.Body>
      </AppCard>
    </CardContainer>
  );
};

export default BigMovieCard;

const AppCard = styled(Card)`
  :hover {
    border-color: #eb5a55;
    box-shadow: 1px #eb5a55;
  }
`;
const ReadMoreText = styled.p`
  cursor: grabbing;
  font-style: italic;
  color: ${(props) => props.theme.buttonColor};
`;

const CardContainer = styled.div<{ url: string }>`
  margin-top: 15px;
  flex: 1 0 21%;
`;

const H6 = styled(Card.Title)`
  color: white;
`;
export const AppButton = styled(Button)`
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.buttonColor};
  border-color: ${(props) => props.theme.buttonColor};
  :hover {
    border-color: #eb5a55;
    background-color: ${(props) => props.theme.buttonColor};
  }
  &:focus {
    border-color: #eb5a55;
    background-color: ${(props) => props.theme.buttonColor};
    box-shadow: 0 0 0 0.25rem ${(props) => props.theme.buttonColor};
  }
`;

const FavoriteButton = styled(Button)`
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: #af991a;
  border-color: black;
  :hover {
    border-color: #af991a;
    background-color: #af991a;
  }
  &:focus {
    border-color: #af991a;
    background-color: #af991a;
    box-shadow: 0 0 0 0.25rem ${(props) => props.theme.buttonColor};
  }
`;

const ImageContainer = styled(Container)`
  position: relative;
`;

const MoviesTitleColor = styled.span`
  color: white;
  font: bold 34px/45px Helvetica, Sans-Serif;
  letter-spacing: -1px;
  background: rgb(0, 0, 0); /* fallback color */
  background: rgba(0, 0, 0, 0.7);
  padding: 10px;
`;
interface IBigMovieCardProps {
  title: string;
  image: string;
  children: string;
  movie: any;
}
export const RenderSummary = (props: any) => {
  return (
    <span
      dangerouslySetInnerHTML={{ __html: props?.text || <p>Not availabe</p> }}
    ></span>
  );
};
