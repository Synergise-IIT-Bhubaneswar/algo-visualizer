import styled from 'styled-components';

const StyledControlbar = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 150px;
  width: 100%;
  z-index: 998;
  top: ${(props) => (props.isVisible ? 5 : '-100px')};
  background-color: #808080;
  overflow-x: hidden; 
  transition-duration: 0.3s;
  transition-property: background-color, top;

  scrollbar-color: white transparent;
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: white;
  }
`;

export default StyledControlbar;
