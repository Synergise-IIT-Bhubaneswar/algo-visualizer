import styled from 'styled-components';


const Arrow = styled.div`
  border: solid #000000;
  border-width: 0 4px 4px 0;
  display: inline-block;
  padding: 4px;
  margin-right: 2px;
  margin-left: ${(props) => (props.isVisible ? '7px' : '0px')};
  transform: ${(props) =>
        props.isVisible ? 'rotate(-135deg)' : 'rotate(45deg)'};
  -webkit-transform: ${(props) =>
        props.isVisible ? 'rotate(-135deg)' : 'rotate(45deg)'};

  transition-duration: 0.3s;
  transition-property: border-color, transform;
`;

export default Arrow;
