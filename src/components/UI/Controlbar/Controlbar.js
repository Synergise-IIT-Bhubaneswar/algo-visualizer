import React, { ReactElement, useState } from 'react';
import StyledControlbar from './ControlbarStyle'
import Arrow from './ToggleButton/Arrow'
import ToggleButton from './ToggleButton/ToggleButton'

const Controlbar = props => {
    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => {
        setIsVisible((prev) => !prev);
    };


    return (
        <StyledControlbar isVisible={isVisible}>
            <ToggleButton isVisible={isVisible} onClick={() => toggleVisibility()}>
                <Arrow isVisible={isVisible}></Arrow>
            </ToggleButton>
        </StyledControlbar>
    );
};

export default Controlbar;
