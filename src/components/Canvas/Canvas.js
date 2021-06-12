import React, { ReactElement, useRef, useState } from 'react';
import StyledCanvas from './CanvasStyle';


const Canvas = props => {

    const canvasRef = useRef(null);
    return (
        <StyledCanvas
            ref={canvasRef}
        >
        </StyledCanvas>
    );
};

export default Canvas;
