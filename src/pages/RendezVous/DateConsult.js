/* eslint-disable */
import React, { useEffect, useState } from "react";

function DateConsult(props) {
  const [DateVal, setDateVal] = useState(new Date());
  const [TimeVal, setTimeVal] = useState("07:00");
  const [Error, setError] = useState(null);
  useEffect(() => {
    document.getElementById("datePicker").valueAsDate = new Date();
    const hour = ("0" + new Date().getHours()).slice(-2);
    const min = ("0" + new Date().getMinutes()).slice(-2);
  }, []);

  useEffect(() => {
    console.log(DateVal)
    if (
      new Date(DateVal).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
    )
      document.getElementById("datePicker").valueAsDate = new Date();
  }, [DateVal]);

  useEffect(() => {
    if (
      new Date(DateVal).setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0)
    ) {
      const hour = ("0" + new Date().getHours()).slice(-2);
      const min = ("0" + new Date().getMinutes()).slice(-2);
      const time = hour + "" + min;
 
    }
  }, [TimeVal]);

  const VerifyTime = (num) =>{
    if (new Date(DateVal).setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0)) {
      return (num > new Date().getHours())
    }
   else{
     return true
   }
 
  }
  

  return (
    <div>
      <h3 className="title">3- Date du rendez-vous</h3>
      <div className="row_group">
        <div className="form-group">
          <label htmlFor="">Date du consultation</label>
          <input
            id="datePicker"
            onChange={(e) => {
              props.setDate_consul(e.target.value);
              setDateVal(e.target.value);
            }}
            type="date"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Heure du consultation</label>
          <select
            onChange={(e) => {
              props.setHeure_consul(e.target.value);
              setTimeVal(e.target.value);
            }}
            style={{ height: 60 }}
            className="form-select"
          >
            { VerifyTime(7) && <option value="07:00">07:00</option>}
            { VerifyTime(7) && <option value="07:30">07:30</option>}
            {VerifyTime(8) &&<option value="08:00">08:00</option>}
            {VerifyTime(8) &&<option value="08:30">08:30</option>}
            {VerifyTime(9) &&<option value="09:00">09:00</option>}
            {VerifyTime(9) &&<option value="09:30">09:30</option>}
            {VerifyTime(10) &&<option value="10:00">10:00</option>}
            {VerifyTime(10) &&<option value="10:30">10:30</option>}
            {VerifyTime(11) &&<option value="11:00">11:00</option>}
            {VerifyTime(11) &&<option value="11:30">11:30</option>}
            {VerifyTime(12) &&<option value="12:00">12:00</option>}
            {VerifyTime(12) &&<option value="12:30">12:30</option>}
            {VerifyTime(13) &&<option value="13:00">13:00</option>}
            {VerifyTime(13) &&<option value="13:30">13:30</option>}
            {VerifyTime(14) &&<option value="14:00">14:00</option>}
            {VerifyTime(14) &&<option value="14:30">14:30</option>}
            {VerifyTime(15) &&<option value="15:00">15:00</option>}
            {VerifyTime(15) &&<option value="15:30">15:30</option>}
            {VerifyTime(16) &&<option value="16:00">16:00</option>}
            {VerifyTime(16) &&<option value="16:30">16:30</option>}
            {VerifyTime(17) &&<option value="17:00">17:00</option>}
            {VerifyTime(17) &&<option value="17:30">17:30</option>}
            {VerifyTime(18) &&<option value="18:00">18:00</option>}
            {VerifyTime(18) &&<option value="18:30">18:30</option>}
            {VerifyTime(19) &&<option value="19:00">19:00</option>}
            {VerifyTime(19) &&<option value="19:30">19:30</option>}
            {VerifyTime(20) &&<option value="20:00">20:00</option>}
            {VerifyTime(20) &&<option value="20:301">20:30</option>}
            {VerifyTime(21) &&<option value="21:00">21:00</option>}
            {VerifyTime(21) &&<option value="21:30">21:30</option>}
            {VerifyTime(22) &&<option value="22:001">22:00</option>}
            {VerifyTime(22) &&  <option value="22:30">22:30</option>}
            {VerifyTime(23) &&  <option value="23:30">23:30</option>}
             
          </select>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="">Spécialité du medecin souhaitée</label>
        <select
          onChange={(e) => props.setMedecin(e.target.value)}
          style={{ height: 60 }}
          className="form-select"
        >
          <option value="Généraliste">Généraliste</option>
          <option value="Pediatre">Pediatre</option>
          <option value="Psychiatre">Psychiatre</option>
          <option value="Psychologue">Psychologue</option>
          <option value="Densitse">Densitse</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="">Dites-nous comment vous vous sentez?</label>
        <textarea
          onChange={(e) => props.setEtat_Patient(e.target.value)}
          name=""
          className="form-control"
          id=""
          cols="30"
          rows="10"
        ></textarea>
      </div>
    </div>
  );
}

export default DateConsult;
