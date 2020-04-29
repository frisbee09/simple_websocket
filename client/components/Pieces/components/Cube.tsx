import styled from "styled-components";
import * as React from "react";
import Draggable from "../utils/Draggable";

interface CubeProps {
  red?: boolean;
  blue?: boolean;
  green?: boolean;
  yellow?: boolean;
  black?: boolean;
  color?: string;
}

interface CubeContainerProps extends CubeProps {}
const CubeContainer = styled.div<CubeContainerProps>`
  background: red;

  height: 10px;
  width: 10px;

  border-radius: 2px;
  border-width: 2px;
  border-color: black;
`;

const Cube: React.FC<{}> = ({}) => {
  return (
    <Draggable initialX={0} initialY={0}>
      <CubeContainer red></CubeContainer>
    </Draggable>
  );
};

export default Cube;
