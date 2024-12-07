import "./EditProfile.css";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { upload } from "../../utils/config";

import { profile, resetMessage } from "../../slices/userSlice";

import Message from "../../components/Message";

function EditProfile() {
  const dispatch = useDispatch();

  const { user, loading, error, message } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
    }
  }, [user]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleFile = (e) => {
    const image = e.target.files[0];

    setPreviewImage(image);
    setProfileImage(image);
  };
  return (
    <div id="edit-profile">
      <h2>Edite seus dados</h2>
      <p className="subtitle">Adicone sua imagem de perfil e conte mais sobre você...</p>
      {(user.profileImage || previewImage) && (
        <img
          className="profile-image"
          src={
            previewImage
              ? URL.createObjectURL(previewImage)
              : `${upload}/users/${user.profileImage}`
          }
          alt={user.name}
        />
      )}
      <form onSubmit={handleSubmit}>
        <label>
          <span>Imagem de perfil</span>
          <input type="file" id="image" onChange={handleFile} />
        </label>
        <label>
          <span>Nome</span>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          <span>Email</span>
          <input type="email" value={email} disabled />
        </label>
        <label>
          <span>Bio</span>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows="4" />
        </label>
        <label>
          <span>Senha</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          <span>Confirme a senha</span>
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </label>
        <input type="submit" value="Atualizar" />
      </form>
    </div>
  );
}

export default EditProfile;
