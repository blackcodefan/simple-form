import styled from "styled-components";

const Container = styled.div`
  width: 760px;
  margin: auto;
  min-height: 50vh;
  background-color: transparent;
  border-radius: 5px;
  padding: 20px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 40%;
  
  @media(max-width: 768px){
    width: 350px;
    top: 50%;
  }
`;

export default Container;