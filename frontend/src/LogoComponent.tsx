import React from 'react'
import logo from './samply.png'

import styled from '@emotion/styled'

const Logo = styled.img`
    height: 20vmin;
    pointer-events: none;
`

export default function LogoComponent() {
    return (
        <Logo src={logo} alt="logo" />
    )
}