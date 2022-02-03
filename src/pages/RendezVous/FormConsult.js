import React, { useState } from "react";

function FormConsult(props) {
  const [Array, setArray] = useState([]);
  const asymptote = (asym) => {
    const arr = Array;
    if (!arr.includes(asym)) {
      arr.push(asym);
    } else {
      arr.splice(arr.indexOf(asym), 1);
    }
    setArray(arr);
    props.setAsymptotes(Array)
  };
  return (
    <div className="asymptote">
      <h3 className="title">2- Les asymptotes</h3>
      <div className="form_check">
        <label className="form-check-label">Troubles respiratoires</label>
        <div className="form-check form-switch">
          <input
            onChange={() => asymptote("Troubles respiratoires")}
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckChecked"
          />
        </div>
      </div>
      <div className="form_check">
        <label className="form-check-label">Douleurs thoraciques</label>
        <div className="form-check form-switch">
          <input
            onChange={() => asymptote("Douleurs thoraciques")}
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckChecked"
          />
        </div>
      </div>
      <div className="form_check">
        <label className="form-check-label">Maux de tête</label>
        <div className="form-check form-switch">
          <input
            onChange={() => asymptote("Maux de tête")}
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckChecked"
          />
        </div>
      </div>
      <div className="form_check">
        <label className="form-check-label">Maux du ventre</label>
        <div className="form-check form-switch">
          <input
            onChange={() => asymptote("Maux du ventre")}
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckChecked"
          />
        </div>
      </div>
      <div className="form_check">
        <label className="form-check-label">Fiévre</label>
        <div className="form-check form-switch">
          <input
            onChange={() => asymptote("Fiévre")}
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckChecked"
          />
        </div>
      </div>

      <div className="form_check">
        <label className="form-check-label">Fatigue</label>
        <div className="form-check form-switch">
          <input
            onChange={() => asymptote("Fatigue")}
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckChecked"
          />
        </div>
      </div>
      <div className="form_check">
        <label className="form-check-label">Douleurs musculaires</label>
        <div className="form-check form-switch">
          <input
            onChange={() => asymptote("Douleurs musculaires")}
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckChecked"
          />
        </div>
      </div>
      <div className="form_check">
        <label className="form-check-label">Vomissements</label>
        <div className="form-check form-switch">
          <input
            onChange={() => asymptote("Vomissements")}
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckChecked"
          />
        </div>
      </div>
      <div className="form_check">
        <label className="form-check-label">Diarrhées</label>
        <div className="form-check form-switch">
          <input
            onChange={() => asymptote("Diarrhées")}
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckChecked"
          />
        </div>
      </div>
    </div>
  );
}

export default FormConsult;
