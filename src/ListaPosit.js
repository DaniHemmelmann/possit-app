import React, { useEffect, useRef, useState } from "react";
import ItemPosit from "./ItemPosit";
import { v4 as uuid } from 'uuid';
import './style.css'; 

function ListaPosit() {

    const [posit, setPosit] = useState([]);
    const [importante, setImportante] = useState(false);
    const [error, setError] = useState("");
    const tituloRef = useRef();
    const descripcionRef = useRef();

    const KEY = 'posit-app-posit';

    // recuperar datos desde el localStorage
    useEffect(() => {
        const misPosit = JSON.parse(localStorage.getItem(KEY));
        if (misPosit) {
            setPosit(misPosit);
        }
    }, []);

    useEffect(() => {
        const json = JSON.stringify(posit);
        console.log(json);
        localStorage.setItem(KEY, json);
    }, [posit]);

    const agregarPosit = () => {
        const tituloValue = tituloRef.current.value;
        const descripcionValue = descripcionRef.current.value;
        
        if (descripcionValue === '') {
            setError('La descripción es obligatoria');
            return;
        }

        setPosit((prev) => {
            const nuevoPosit = {
                id: uuid(),
                titulo: tituloValue,
                descripcion: descripcionValue,
                importante: importante
            }
            return [...prev, nuevoPosit];
        });

        tituloRef.current.value = '';
        descripcionRef.current.value = ''; 
        setImportante(false); 
        setError("");
    };

    const toggleImportante = () => {
        setImportante(!importante);
    }

    return (
        <>
            <h1>Mis Pos it!</h1>
            <div className="input-group my-4">
                <input ref={tituloRef} className="form-control" placeholder="Título del posit"></input>
                <input ref={descripcionRef} className="form-control" placeholder="Descripción del posit"></input>
                <button
                    onClick={toggleImportante}
                    className={`btn-cuadro ms-2 ${importante ? 'importante' : 'no-importante'}`}>
                </button>
                <button onClick={agregarPosit} className="btn btn-primary ms-2">Agregar</button>
            </div>
            {error && <p className="error-message">{error}</p>}
            <ul className="posit-group">
                {posit.map((t) => (
                    <ItemPosit key={t.id} titulo={t.titulo} descripcion={t.descripcion} importante={t.importante}></ItemPosit>
                ))}
            </ul>
        </>
    );
}

export default ListaPosit;
