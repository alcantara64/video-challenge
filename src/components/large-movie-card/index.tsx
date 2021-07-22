import { Button, Card, Container, Image } from 'react-bootstrap';
import styled from 'styled-components';
import './index.css';

const BigMovieCard: React.FC<IBigMovieCardProps> = ({
  title,
  image,
  children,
}) => {
  const RenderSummary = (props: any) => {
    return (
      <span
        dangerouslySetInnerHTML={{ __html: props.text || <p>Not availabe</p> }}
      ></span>
    );
  };
  return (
    <CardContainer url={image} className="container">
      <ImageContainer>
        <Image src={image} height="20%" alt="title" rounded />

        <H2>
          {' '}
          <MoviesTitleColor>{title.toUpperCase()}</MoviesTitleColor>
        </H2>
        <RenderSummary text={children} />
        <AppButton
          onClick={() => {
            console.log('cliked');
          }}
        >
          View
        </AppButton>
      </ImageContainer>
    </CardContainer>
  );
};

export default BigMovieCard;

const CardContainer = styled.div<{ url: string }>`
  margin-top: 15px;
`;

const H2 = styled.h2`
  color: white;
  top: 10px;
  position: absolute;
  padding: 0px 0px 0px 31px;
  font-size: 32px;
`;
const AppButton = styled(Button)`
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
}
