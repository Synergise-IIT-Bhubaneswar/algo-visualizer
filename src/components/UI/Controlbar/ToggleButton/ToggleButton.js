import styled from 'styled-components';

const ToggleButton = styled.div.attrs(props => ({
  width: 18,
  isVisible: props.isVisible ?? false,
}))`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: ${(props) => (props.isVisible ? `200px` : `50px`)};
  left: 50%;
  z-index: 998;
  width: ${(props) => `${props.width * 2.1}px`};
  height: ${(props) => `${props.width}px`};
  border-radius: ${(props) => `${props.width}px`};
  background-color: #808080;
  transition-duration: 0.3s;
  cursor: pointer;

  border-radius: ${(props) => `${props.width * 2}px`};
`;

export default ToggleButton;
