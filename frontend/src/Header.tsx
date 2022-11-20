import React from "react";
import styled from "@emotion/styled";

import LogoComponent from "./LogoComponent";
import Player from "./Player";

const HeaderStyle = styled.header`
    background-color: #282c34;
    min-height: 10vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
`;

export default function Header() {
    return (
        <HeaderStyle>
            <LogoComponent />
            <h1> | </h1>
            <Player />
        </HeaderStyle>
        );
}