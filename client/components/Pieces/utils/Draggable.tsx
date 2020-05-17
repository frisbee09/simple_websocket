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

export interface DraggableEvent {
  x: number;
  y: number;
}

export interface DraggableEventHandler {
  (e: DraggableEvent): any;
}

export interface DraggableProps extends React.HTMLAttributes<HTMLDivElement> {
  x: number;
  y: number;
  onMoveStart?: DraggableEventHandler;
  onMoveEnd?: DraggableEventHandler;
  onMove: DraggableEventHandler;
}

const Draggable: React.FC<DraggableProps> = ({
  id,
  x,
  y,
  onMoveStart,
  onMove,
  onMoveEnd,
  children,
  ...rest
}) => {
  const [isDragging, setDragging] = React.useState<boolean>(false);
  const [grabDelta, setGrabDelta] = React.useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove, {
        passive: true,
      });
      window.addEventListener("touchmove", handleTouchMove, {
        passive: true,
      });
      window.addEventListener("mouseup", stopDragging);
      window.addEventListener("touchend", stopDragging);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchend", stopDragging);
    };
  }, [isDragging]);

  const handleTouchMove = (e: TouchEvent) => {
    e.stopPropagation();
    if (!isDragging) {
      return;
    }

    const { clientX, clientY } = e.changedTouches[0];
    onMove({ x: clientX - grabDelta.x, y: clientY - grabDelta.y });
  };

  const stopDragging = () => {
    setDragging(false);
  };

  const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
    if (!isDragging) {
      return;
    }
    onMove({ x: clientX - grabDelta.x, y: clientY - grabDelta.y });
  };

  const handleDragEnd = (e: any) => {
    if (onMoveEnd) {
      onMoveEnd({ x, y });
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);

    const { clientX, clientY } = e;
    const currentGrabDelta = { x: clientX - x, y: clientY - y };
    setGrabDelta(currentGrabDelta);

    if (onMoveStart) {
      onMoveStart({ x, y });
    }

    onMove({
      x: clientX - currentGrabDelta.x,
      y: clientY - currentGrabDelta.y,
    });
  };

  const handleTouchDown = (e: React.TouchEvent<HTMLDivElement>) => {
    setDragging(true);

    const { clientX, clientY } = e.changedTouches[0];
    const currentGrabDelta = { x: clientX - x, y: clientY - y };
    setGrabDelta(currentGrabDelta);

    if (onMoveStart) {
      onMoveStart({ x, y });
    }

    onMove({
      x: clientX - currentGrabDelta.x,
      y: clientY - currentGrabDelta.y,
    });
  };

  return (
    <DragContainer
      {...rest}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchDown}
      onMouseUp={handleDragEnd}
      onTouchEnd={handleDragEnd}
      x={x}
      y={y}
      isDragging={isDragging}
    >
      {children}
    </DragContainer>
  );
};

export default Draggable;
