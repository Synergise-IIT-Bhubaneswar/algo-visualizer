import React, { useState } from 'react'
import Header from '../UI/Header/Header'
import Canvas from '../Canvas/Canvas'
import AlgorithmOptions from '../UI/Menu/AlgorithmOptions'

const Layout = () => {
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(AlgorithmOptions[0])

    const selectAlgorithm = (algorithm) => {
        setSelectedAlgorithm(algorithm)
    }

    return (
        <div>
            <Header
                selectAlgorithm={selectAlgorithm}
                AlgorithmOptions={AlgorithmOptions}
                selectedAlgorithm={selectedAlgorithm}
            ></Header>
            <Canvas>
            </Canvas>
        </div>
    )
}


export default Layout;