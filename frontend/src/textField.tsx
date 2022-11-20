import React from 'react';
import useState from "react";
import "./App.css";


const TextField = () => (
  <form action="/" method="get">
      <label htmlFor="header-search">
          <span className="visually-hidden">Chargement d'un sample vers Samply</span>
      </label>
      <input
          type="text"
          id="header-search"
          placeholder="URL to sample"
          name="s" 
      />
      <button type="submit">Chargement</button>
  </form>
);

export default TextField;