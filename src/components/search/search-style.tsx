import styled, { css}  from 'styled-components';


export const SearchContainer = styled.div`
margin-top: 40px;
${(props:any) => props.theme.primary && css`
  color : ${props.theme.primary}`
  
}

    
`