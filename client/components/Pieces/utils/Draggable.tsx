import * as React from "react";
import styled, { css } from "styled-components";

interface DragContainerProps {
  x: number;
  y: number;
  isDragging: boolean;
}
const DragContainer = styled.div.attrs<DragContainerProps>(({ x, y }) => ({
  style: {
    transform: `translate(${x}px, ${y}px)`,
  },
}))<DragContainerProps>`
  cursor: grab;

  position: relative;
  display: inline-block;
  ${(props) =>
    props.isDragging &&
    css`
      filter: brightness(1.2);
    `}
`;

const Draggable: React.FC<
  { initialX?: number; initialY?: number } & React.HTMLAttributes<
    HTMLDivElement
  >
> = ({ onDragStart, onDragEnd, initialX, initialY, children }) => {
  const [isDragging, setDragging] = React.useState<boolean>(false);

  const [grabDelta, setGrabDelta] = React.useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [pos, setPos] = React.useState<{ x: number; y: number }>({
    x: initialX || 0,
    y: initialY || 0,
  });

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      return;
    }

    const { clientX, clientY } = e.changedTouches[0];
    setPos({ x: clientX - grabDelta.x, y: clientY - grabDelta.y });
  };

  const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
    if (!isDragging) {
      return;
    }
    setPos({ x: clientX - grabDelta.x, y: clientY - grabDelta.y });
  };

  const handleMouseUp = (e: any) => {
    setDragging(false);

    if (onDragEnd) {
      onDragEnd(e as any);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);

    const { clientX, clientY } = e;
    const currentGrabDelta = { x: clientX - pos.x, y: clientY - pos.y };
    setGrabDelta(currentGrabDelta);
    setPos({
      x: clientX - currentGrabDelta.x,
      y: clientY - currentGrabDelta.y,
    });

    if (onDragStart) {
      onDragStart(e as any);
    }
  };

  return (
    <DragContainer
      onMouseDown={handleMouseDown}
      x={pos.x}
      y={pos.y}
      isDragging={isDragging}
    >
      {children}
    </DragContainer>
  );
};

export default Draggable;
