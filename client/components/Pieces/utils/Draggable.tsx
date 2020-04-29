import * as React from "react";
import styled from "styled-components";

interface DragContainerProps {
  x: number;
  y: number;
}
const DragContainer = styled.div.attrs<DragContainerProps>(({ x, y }) => ({
  style: {
    transform: `translate(${x}px, ${y}px)`,
  },
}))<DragContainerProps>`
  cursor: grab;

  position: relative;
`;

const Draggable: React.FC<
  { initialX: number; initialY: number } & React.HTMLAttributes<HTMLDivElement>
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
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) {
      return;
    }

    const { clientX, clientY } = e;
    setPos({ x: clientX - grabDelta.x, y: clientY - grabDelta.y });
  };

  const handleMouseUp = (e: MouseEvent) => {
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
    <DragContainer onMouseDown={handleMouseDown} x={pos.x} y={pos.y}>
      {children}
    </DragContainer>
  );
};

export default Draggable;
