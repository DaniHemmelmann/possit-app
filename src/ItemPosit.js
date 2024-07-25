import React from 'react';
import './style.css'; 

function ItemPosit({ titulo, descripcion, importante }) {
    return (
        <li className={`item-posit ${importante ? 'importante' : ''}`}>
            <h3>{titulo}</h3>
            <p>{descripcion}</p>
        </li>
    );
}

export default ItemPosit;