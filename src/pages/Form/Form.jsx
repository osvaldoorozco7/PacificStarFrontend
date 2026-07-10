import React from "react";

const Form = () => {
    return(

        <div className="main-container">
            <h1>Bitacora de mantenimiento preventivo</h1>

            <div className="formDate">
                <label htmlFor="">Fecha </label>
                <input type="datetime-local" name="" id="" />
            </div>

            <div>
                <label htmlFor="unidades">Unidad </label>
                <select name="unidades" id="unidades">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>

            <h2>Revisiones</h2>
            <div className="revisiones">
                <label htmlFor="revision">Primer revisión </label>
                <input type="time" name="primerRevision" id="" />
                <label htmlFor="primerTemp">Temperatura </label>
                <input type="text" name="" id="" />°C
                <br />
                <label htmlFor="revision">Segunda revisión </label>
                <input type="time" name="SegundaRevision" id="" />
                <label htmlFor="segundaTemp">Temperatura </label>
                <input type="text" name="" id="" />°C
                <br />
                <label htmlFor="revision">Tercer revisión </label>
                <input type="time" name="tercerRevision" id="" />
                <label htmlFor="primerTemp">Temperatura </label>
                <input type="text" name="" id="" />°C
            </div>

            <h2>Observaciones</h2>
            <input type="text" name="observaciones" id="observaciones" />

        </div>
    )
}

export default Form;