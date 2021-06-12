import styled from 'styled-components';

const StyledCanvas = styled.div`
  position: relative;
  height: calc(100vh);
  width: 96vw;
  margin-left: 2vw;
  max-width: 100%;
  max-height: 100%;
-moz-box-shadow: 3px 10px 69px #999399;
-webkit-box-shadow: 3px 10px 69px #999399;
box-shadow: 3px 10px 69px #999399;
  background-color: #f8f8ff;
  transition-duration: 0.3s;
  transition-property: background-color;

  @media (max-width: 550px) {
    height: calc(100vh - 90px);
  }
`;

export default StyledCanvas;
