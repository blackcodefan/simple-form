import styled from "styled-components";

interface Props {
    fontSize?: string;
    color?: string;
    textAlign?: string;
}

export const H1 = styled.h1<Props>`
  font-size: ${ props => props.fontSize || '35px'};
  color: ${ props => props.color || 'inherit'};
  text-align: ${ props => props.textAlign || 'center'};
`;