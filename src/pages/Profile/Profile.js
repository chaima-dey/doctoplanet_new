/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import url from "../../api";
import "./Profile.scss";
import { useLocation, useNavigate } from "react-router-dom";
import User_icon from "../../assets/images/icon/user.png";
import { useSelector } from "react-redux";
import { UpdateUser, UploadImage } from "../../actions/UserActions";
import { useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";
import _Alert from "../../components/Alert/_Alert"
import { RemoveToken, RemoveUser } from "../../actions";
function Profile() {
  const inputRef = useRef(null);
 
  const UserReducer = useSelector((state) => state.UserReducer);
  const SuccessReducer = useSelector((state) => state.SuccessReducer);
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
  const [Groupe, setGroupe] = useState(UserReducer.groupe_sang ? UserReducer.groupe_sang : "");
 
  const [Image, setImage] = useState(null);
  const [LoadingImage, setLoadingImage] = useState(false);
  const [Poids, setPoids] = useState(UserReducer.poids ? UserReducer.poids : "");
  const [Taille, setTaille] =useState(UserReducer.taille ? UserReducer.taille : "");

  useEffect(()=>{ 
   
    return ()=>{
      dispatch({
        type: "SetSuccess",
        payload: false,
      });
    }
  } ,[])
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
      id : UserReducer._id,
      Nom,
      Prenom,
      Mail,
      Date_naissance,
      Tel,
      Groupe,
      Poids,
      Taille
    }
    try {
      const res = await UpdateUser(user,dispatch);
    if(res.status == 200)
    {
      
      dispatch({
        type: "SetSuccess",
        payload: true,
      });
        dispatch({
        type: "SET_USER",
        payload: res.data,
      });
      window.scrollTo(0, 0);
    }
    
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
     {SuccessReducer && <_Alert variant={"success"} text={"Votre profil a été mise à jour avec succès"} />
}
    <div className="Compte transition_opacity home">
  
      {
        <>
          <div className="side-row">
            <div className="side">
              <div
                className="profile_pic"
                style={{
                  backgroundImage:
                    !Image && UserReducer.image
                      ? `url(${url}/uploads/${UserReducer.image}) `
                      : Image
                      ? `url(${Image.preview})`
                      : "",
                }}
                
              >

                {!LoadingImage && (
                  <i
                    onClick={() => inputRef.current.click()}
                    className="fas fa-camera"
                  ></i>
                )}
                {!UserReducer.image && !Image && <img src={User_icon} alt="" />}
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
              {/* <p className="adresse_text" style={{ color: "gray" }}>
              <i className="fas fa-thumbtack "></i>
                 {UserReducer.adresse} </p> */}
              <hr />
              <p onClick={Logout} className="logout_text">
              <i className="fas fa-sign-out-alt"></i>
                Deconnéxion</p>
            </div>
          </div>
          <div className="content-row">
            <div className="content">
              <p style={{ fontSize: 25 }}>
                Bonjour{" "}
                <b style={{ fontSize: 30 }}>
                  {" "}
                  {Prenom_uppercase(UserReducer.prenom)}
                </b>
              </p>
              <p>
                Membre depuis <b>{Created_date()}</b>
              </p>
              <hr />
              <h5>A propos de</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur itaque culpa explicabo error provident, inventore
                laboriosam incidunt natus, amet ipsam, dolor libero nobis.
                Aspernatur fuga magnam voluptatibus perferendis vitae! Minus!
              </p>

              <hr />
              <div className="form-wraper">
                <h5 className="title mb-4">1- Inforamtions du patient</h5>
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
                  <input
                    style={{
                      backgroundColor:
                        UserReducer.email && UserReducer.email == Mail
                          ? "#00a9dd26"
                          : "",
                    }}
                    value={Mail}
                    onChange={(e) => setMail(e.target.value)}
                    type="mail"
                    className="form-control"
                    placeholder="Adresse mail"
                  />
                </div>
                <div className="form-group">
                  <input
                    style={{
                      backgroundColor:
                        UserReducer.tel && UserReducer.tel == Tel
                          ? "#00a9dd26"
                          : "",
                    }}
                    value={Tel}
                    onChange={(e) => setTel(e.target.value)}
                    type="number"
                    className="form-control"
                    placeholder="Téléphone mobile"
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
                    }}
                    value={Groupe}
                      onChange={(e) => setGroupe(e.target.value)}
                      style={{ height: 60 }}
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
                        UserReducer.taille &&
                        UserReducer.taille == Taille
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
                        UserReducer.poids &&
                        UserReducer.poids == Poids
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
                {/* <div className="form-group">
                  <label htmlFor="">Adresse</label>
                  <input
                    value={Adresse}
                    style={{
                      backgroundColor:
                        UserReducer.adresse && Adresse == UserReducer.adresse
                          ? "#00a9dd26"
                          : "",
                    }}
                    onChange={(e) => setAdresse(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Adresse"
                  />
                </div> */}
              </div>
              <input
                style={{ display: "none" }}
                ref={inputRef}
                accept="image/png, image/jpg, image/jpeg"
                type="file"
                name="file"
                onChange={handleFileChange}
              />
             {
           (     Nom != UserReducer.nom  ||
           Prenom != UserReducer.prenom  ||
           Poids != UserReducer.poids  ||
            Taille != UserReducer.taille  ||
            Tel != UserReducer.tel  ||
             Date_naissance != UserReducer.date_naissance || 
               Groupe != UserReducer.groupe_sang )
&&
          
                <button
                style={{ float: "right" }}
                onClick={Update}
                className="btn btn-secondary"
              >
                Enregistrer
              </button>
             }
            </div>
          </div>
        </>
      }
    </div>
    </>
  );
}

export default Profile;
