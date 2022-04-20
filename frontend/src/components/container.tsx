import styled from "styled-components";

const Container = styled.div`
  width: 760px;
  margin: auto;
  background-color: transparent;
  border-radius: 5px;
  padding: 20px;
  @media(max-width: 768px){
    width: 350px;
  }
`;

export default Container;