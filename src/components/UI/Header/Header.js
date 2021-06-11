import React, { ReactElement } from 'react';
import StyledHeader from './HeaderStyle';


const Header = props => {
    const openUrl = (url) => {
        window.open(url, '_blank')?.focus();
    };

    return (
        <StyledHeader>
            Algo-Visualizer
        </StyledHeader>
    );
};

export default Header;
