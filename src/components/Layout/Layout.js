import React, { useState } from 'react'
import Controlbar from '../UI/Controlbar/Controlbar'
import Header from '../UI/Header/Header'
const Layout = () => {
    return (
        <div>
            <Header></Header>
            <Controlbar isVisible={true}></Controlbar>
        </div>
    )
}


export default Layout;