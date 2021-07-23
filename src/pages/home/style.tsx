import { Container } from 'react-bootstrap';
import styled from 'styled-components';
enum VARIANT {
  LIGHT,
  DARK,
}
interface IProps {
  variant?: VARIANT;
}

export const PageContainer = styled.div<IProps>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  
}
  ${(props) => {
    switch (props.variant) {
      case VARIANT.LIGHT:
        return `
          color: ${props.theme.palette.secondary.contrastText};
          background-color: ${props.theme.palette.secondary.main};
        `;
      case VARIANT.DARK:
      default:
        return `
          color: ${props.theme.palette.primary.contrastText};
          background-color: #000000};
        `;
    }
  }};
`;

export const ScrollContainer = styled.div`
  height: 100vh;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
`;
