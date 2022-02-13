/* eslint-disable */
import React, { useEffect, useState } from "react";
import DivError from "../../components/Error/DivError";

function FormConsult(props) {
  const [Array, setArray] = useState([]);
  const [Error, setError] = useState(null);
  const [y, setY] = useState(window.scrollY);
  const asymptote = (asym, id) => {
    const arr = Array;
    if (!arr.includes(asym)) {
      arr.push(asym);
    } else {
      arr.splice(arr.indexOf(asym), 1);
    }
    if (arr.length > 3) {
      arr.splice(arr.indexOf(asym), 1);
      const element = document.querySelector(`#${id}`);
      element.click();
      setError("Trois symptômes maximum");
      window.scrollTo(0, 0);
      return;
    }
    setError(false);
    setArray(arr);

    props.setAsymptotes(Array);
  };
 

  return (
    <div className="asymptote">
      <h3 className="title">2- Les symptômes</h3>
      {Error && (
        <div className="alert_hide">
          <DivError hideAlert={() => setError(false)} message={Error} />
        </div>
      )}
      <div className="form_check">
        <label className="form-check-label">Troubles respiratoires</label>
        <div className="form-check form-switch">
          <input
            onChange={() => asymptote("Troubles respiratoires", "Troubles")}
            className="form-check-input"
            type="checkbox"
            id="Troubles"
          />
        </div>
      </div>
      <div className="form_check">
        <label className="form-check-label">Douleurs thoraciques</label>
        <div className="form-check form-switch">
          <input
            onChange={() => asymptote("Douleurs thoraciques", "thoraciques")}
            className="form-check-input"
            type="checkbox"
            id="thoraciques"
          />
        </div>
      </div>
      <div className="form_check">
        <label className="form-check-label">Maux de tête</label>
        <div className="form-check form-switch">
          <input
            onChange={() => asymptote("Maux de tête", "Mauxdetête")}
            className="form-check-input"
            type="checkbox"
            id="Mauxdetête"
          />
        </div>
      </div>
      <div className="form_check">
        <label className="form-check-label">Maux du ventre</label>
        <div className="form-check form-switch">
          <input
            onChange={() => asymptote("Maux du ventre", "Mauxduventre")}
            className="form-check-input"
            type="checkbox"
            id="Mauxduventre"
          />
        </div>
      </div>
      <div className="form_check">
        <label className="form-check-label">Fiévre</label>
        <div className="form-check form-switch">
          <input
            onChange={() => asymptote("Fiévre", "Fiévre")}
            className="form-check-input"
            type="checkbox"
            id="Fiévre"
          />
        </div>
      </div>

      <div className="form_check">
        <label className="form-check-label">Fatigue</label>
        <div className="form-check form-switch">
          <input
            onChange={() => asymptote("Fatigue", "Fatigue")}
            className="form-check-input"
            type="checkbox"
            id="Fatigue"
          />
        </div>
      </div>
      <div className="form_check">
        <label className="form-check-label">Douleurs musculaires</label>
        <div className="form-check form-switch">
          <input
            onChange={() => asymptote("Douleurs musculaires", "musculaires")}
            className="form-check-input"
            type="checkbox"
            id="musculaires"
          />
        </div>
      </div>
      <div className="form_check">
        <label className="form-check-label">Vomissements</label>
        <div className="form-check form-switch">
          <input
            onChange={() => asymptote("Vomissements", "Vomissements")}
            className="form-check-input"
            type="checkbox"
            id="Vomissements"
          />
        </div>
      </div>
      <div className="form_check">
        <label className="form-check-label">Diarrhées</label>
        <div className="form-check form-switch">
          <input
            onChange={() => asymptote("Diarrhées", "Diarrhées")}
            className="form-check-input"
            type="checkbox"
            id="Diarrhées"
          />
        </div>
      </div>
    </div>
  );
}

export default FormConsult;
