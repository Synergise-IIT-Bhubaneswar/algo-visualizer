import styled from 'styled-components';


const StyledHeader = styled.div`
  z-index: 999;
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000000;
  color: #ffffff;
  transition-duration: 0.3s;
  transition-property: background-color;

  @media (max-width: 550px) {
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    height: 90px;
  }
`;

export default StyledHeader;
