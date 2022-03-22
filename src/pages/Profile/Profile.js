/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import URL_LINK from "../../api";
import "./Profile.scss";
import { useLocation, useNavigate } from "react-router-dom";
import User_icon from "../../assets/images/icon/user.png";
import { useSelector } from "react-redux";
import {
  UpdatePasswordAction,
  UpdateUser,
  UploadImage,
} from "../../actions/UserActions";
import { useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";
import _Alert from "../../components/Alert/_Alert";
import { RemoveToken, RemoveUser } from "../../actions";
import { FaVenus, FaMars } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import DivError from "../../components/Error/DivError";
function Profile() {
  const inputRef = useRef(null);

  const UserReducer = useSelector((state) => state.UserReducer);
  const SuccessReducer = useSelector((state) => state.SuccessReducer);
  const ErrorReducer = useSelector((state) => state.ErrorReducer);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [Nom, setNom] = useState(UserReducer.nom ? UserReducer.nom : "");
  const [Prenom, setPrenom] = useState(
    UserReducer.prenom ? UserReducer.prenom : ""
  );
  const [Mail, setMail] = useState(UserReducer.email ? UserReducer.email : "");
  const [Tel, setTel] = useState(UserReducer.tel ? UserReducer.tel : "");
  const [Date_naissance, setDate_naissance] = useState(
    UserReducer.date_naissance ? UserReducer.date_naissance : ""
  );
  const [Groupe, setGroupe] = useState(
    UserReducer.groupe_sang ? UserReducer.groupe_sang : ""
  );
  const [OldPassword, setOldPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");

  const [Image, setImage] = useState(null);
  const [LoadingImage, setLoadingImage] = useState(false);
  const [Poids, setPoids] = useState(
    UserReducer.poids ? UserReducer.poids : ""
  );
  const [Taille, setTaille] = useState(
    UserReducer.taille ? UserReducer.taille : ""
  );

  const [Error, setError] = useState(false);
  const [LogginOut, setLogginOut] = useState(false);
  const [ChangePassowrd, setChangePassowrd] = useState(false);
  const [Loading, setLoading] = useState(false);
  const Mois = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aout",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const Created_date = () => {
    const time = parseInt(UserReducer.created_at);
    var date = new Date(time);
    const m = date.getMonth();
    const y = date.getFullYear();
    return Mois[m] + " " + y;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const element = document.querySelector(".home");
    element.classList.remove("transition_opacity");
  }, []);

  const Prenom_uppercase = (prenom) => {
    return prenom.charAt(0).toUpperCase() + prenom.slice(1);
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  const handleSubmit = async () => {
    setLoadingImage(true);

    let formData = new FormData();
    formData.append("file", Image.data);
    formData.append("user", UserReducer._id);
    try {
      const res = await UploadImage(formData, dispatch);
      console.log(res);
      setLoadingImage(false);

      setImage(null);
    } catch (error) {
      console.log(error);
      setLoadingImage(false);
    }
  };

  const Logout = () => {
    dispatch(RemoveToken());
    dispatch(RemoveUser());
    window.location.replace("/login");
    // navigate("/login")
  };

  const Update = async () => {
    const user = {
      id: UserReducer._id,
      Nom,
      Prenom,
      Mail,
      Date_naissance,
      Tel,
      Groupe,
      Poids,
      Taille,
    };
    setLoading(true);
    try {
      const res = await UpdateUser(user, dispatch);

      if (res.status == 200) {
        setLoading(false);
        dispatch({
          type: "SetSuccess",
          payload: "Votre information a été enregistré avec succès",
        });
        dispatch({
          type: "SET_USER",
          payload: res.data,
        });
        window.scrollTo(0, 0);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const UpdatePassword = async () => {
    if (OldPassword == "" || NewPassword == "") {
      setError("Champs vides !");
      return;
    }
    setLoading(true);
    const res = await UpdatePasswordAction({
      userID: UserReducer._id,
      OldPassword,
      NewPassword,
    });

    if (res.status == 200) {
      setLoading(false);
      if (LogginOut) {
        SeDeconncter();
        return;
      }
      resetpass();
      dispatch({
        type: "SetSuccess",
        payload: "Mot de passe changé avec succés",
      });
    } else {
      setLoading(false);
      resetpass();
      dispatch({
        type: "SetError",
        payload: res.data,
      });
    }
  };

  const resetpass = () => {
    setOldPassword("");
    setNewPassword("");
    setChangePassowrd(false);
    window.scrollTo(0, 0);
  };

  const SeDeconncter = () => {
    dispatch(RemoveToken());
    dispatch(RemoveUser());
    window.location.replace("/login");
    // navigate("/login")
  };

  const UserImage = () =>{
   if (Image) return `url(${Image.preview})`
   if(UserReducer.image.length > 0) return `url("${URL_LINK}/uploads/${UserReducer.image}")` 
   else return `url(${User_icon})`
  }

  return (
    <>
      {ErrorReducer.length > 0 && (
        <_Alert variant={"danger"} text={ErrorReducer} close={true} />
      )}
      {SuccessReducer.length > 0 && (
        <_Alert variant={"success"} text={SuccessReducer} close={true} />
      )}
      <div className="Compte transition_opacity home">
        {
          <>
            <div className="side-row">
              <div className="side">
                <div
                  className="profile_pic"
                  style={{
                   backgroundImage:UserImage()  }}
                >
                  {!LoadingImage && (
                    <i
                      onClick={() => inputRef.current.click()}
                      className="fas fa-camera"
                    ></i>
                  )}
                  {!UserReducer.image && !Image && (
                    <img src={User_icon} alt="" />
                  )}
                </div>
                {Image && !LoadingImage && (
                  <button className="btn_upload mt-2" onClick={handleSubmit}>
                    Enregister
                  </button>
                )}
                {Image && LoadingImage && (
                  <button className="btn_upload mt-2" onClick={handleSubmit}>
                    <Spinner animation="border" variant="light" />
                  </button>
                )}

                <b className="mt-2" style={{ fontSize: 22 }}>
                  {UserReducer.nom + " " + UserReducer.prenom}
                </b>
 
                <hr />
                <p onClick={Logout} className="logout_text">
                  <i className="fas fa-sign-out-alt"></i>
                  Deconnéxion
                </p>
              </div>
            </div>
            <div className="content-row">
              <div className="content">
                <p className="username" style={{ fontSize: 25 }}>
                  Bonjour{" "}
                  <b style={{ fontSize: 30 }}>
                    {" "}
                    {Prenom_uppercase(UserReducer.prenom)}
                  </b>
                  {/* {UserReducer.sexe == "H" ? (
                    <FaMars style={{ color: "#2196f3" }} />
                  ) : (
                    <FaVenus style={{ color: "#f17732" }} />
                  )} */}
                </p>
                <p>
                  Membre depuis <b>{Created_date()}</b>
                </p>
                <hr />

                <h5>A propos</h5>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aspernatur itaque culpa explicabo error provident, inventore
                  laboriosam incidunt natus, amet ipsam, dolor libero nobis.
                  Aspernatur fuga magnam voluptatibus perferendis vitae! Minus!
                </p>
                <hr />
                <h5>Sécurité Compte</h5>

                <div className="form-wraper">
                  <div className="row_group">
                    <div className="form-group" style={{ marginRight: 0 }}>
                      <label htmlFor="">Adresse Mail</label>
                      <input
                        disabled
                        value={Mail}
                        onChange={(e) => setMail(e.target.value)}
                        type="mail"
                        className="form-control"
                        placeholder="Adresse mail"
                      />
                    </div>
                  </div>

                  {!ChangePassowrd ? (
                    <p
                      className="p-link"
                      onClick={() => setChangePassowrd(true)}
                    >
                      Changer votre mot passe ?
                    </p>
                  ) : (
                    <div>
                      {Error && (
                        <DivError
                          hideAlert={() => setError(false)}
                          message={Error}
                        />
                      )}
                      <div className="row_group">
                        <div className="form-group">
                          <label htmlFor="">Ancien mot de passe</label>
                          <input
                            value={OldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            type="password"
                            className="form-control odlpassword"
                            placeholder=""
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Nouveau Mot de passe</label>
                          <input
                            value={NewPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            type="password"
                            className="form-control"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                          onChange={(e) => setLogginOut(e.target.checked)}
                        />
                        <label className="form-check-label">
                          Se déconnecter ?
                        </label>
                      </div>
                      <br />
                      {!Loading ? (
                        <button
                          onClick={UpdatePassword}
                          className="btn btn-secondary"
                        >
                          Changer Mot de passe
                        </button>
                      ) : (
                        <p>Loading...</p>
                      )}
                    </div>
                  )}
                </div>

                <hr />
                <div className="form-wraper">
                  <h5 className="mb-4">Inforamtions du patient</h5>

                  <div className="row_group">
                    <div className="form-group">
                      <input
                        style={{
                          backgroundColor:
                            UserReducer.nom && UserReducer.nom == Nom
                              ? "#00a9dd26"
                              : "",
                        }}
                        value={Nom}
                        onChange={(e) => setNom(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Nom"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        style={{
                          backgroundColor:
                            UserReducer.prenom && UserReducer.prenom == Prenom
                              ? "#00a9dd26"
                              : "",
                        }}
                        value={Prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Prénom"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <PhoneInput
                      className="input-phone"
                      enableLongNumbers={false}
                      country={"fr"}
                      placeholder="Téléphone"
                      value={Tel}
                      onChange={(phone) => setTel(phone)}
                    />
                  </div>

                  <div className="row_group">
                    <div className="form-group">
                      <label htmlFor="">Date de naissance</label>
                      <input
                        style={{
                          backgroundColor:
                            UserReducer.date_naissance &&
                            UserReducer.date_naissance == Date_naissance
                              ? "#00a9dd26"
                              : "",
                        }}
                        value={Date_naissance}
                        onChange={(e) => setDate_naissance(e.target.value)}
                        type="date"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Groupe sanguin</label>
                      <select
                        style={{
                          backgroundColor:
                            UserReducer.groupe_sang &&
                            UserReducer.groupe_sang == Groupe
                              ? "#00a9dd26"
                              : "",
                          height: 60,
                        }}
                        value={Groupe}
                        onChange={(e) => setGroupe(e.target.value)}
                        className="form-select"
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="">Je ne sais pas</option>
                      </select>
                    </div>
                  </div>
                  <div className="row_group">
                    <div className="form-group">
                      <label htmlFor="">Taille (cm)</label>
                      <input
                        style={{
                          backgroundColor:
                            UserReducer.taille && UserReducer.taille == Taille
                              ? "#00a9dd26"
                              : "",
                        }}
                        onChange={(e) => setTaille(e.target.value)}
                        value={Taille}
                        type="number"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Poids (kg)</label>
                      <input
                        style={{
                          backgroundColor:
                            UserReducer.poids && UserReducer.poids == Poids
                              ? "#00a9dd26"
                              : "",
                        }}
                        value={Poids}
                        onChange={(e) => setPoids(e.target.value)}
                        type="number"
                        className="form-control"
                      />
                    </div>
                  </div>
       
                </div>
                <input
                  style={{ display: "none" }}
                  ref={inputRef}
                  accept="image/png, image/jpg, image/jpeg"
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                />
                {(Nom != UserReducer.nom ||
                  Prenom != UserReducer.prenom ||
                  Poids != UserReducer.poids ||
                  Taille != UserReducer.taille ||
                  Tel != UserReducer.tel ||
                  Date_naissance != UserReducer.date_naissance ||
                  Groupe != UserReducer.groupe_sang) &&
                  !Loading && (
                    <button
                      style={{ float: "right" }}
                      onClick={Update}
                      className="btn btn-secondary"
                    >
                      Enregistrer
                    </button>
                  )}
              </div>
            </div>
          </>
        }
      </div>
    </>
  );
}

export default Profile;
