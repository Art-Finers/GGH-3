import React from "react";
import styled from '@emotion/styled';

const Button = styled.button`
    background-color: white; 
    position: relative;
    margin-top:18%;
    text-align:center;
    border-radius:4px;
    font-size:20px;
    padding:12px;
    width:300px;

    &:hover{
        background-color:black;
        transition-duration: 0.5s;
        color:white;
    }
`

export default function Massa() {
    return <a href="https://massa.net/"><Button>Massa</Button></a>;
  }

