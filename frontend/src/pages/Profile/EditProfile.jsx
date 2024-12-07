import "./EditProfile.css";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { upload } from "../../utils/config";

import { profile, updateProfile, resetMessage } from "../../slices/userSlice";

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
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name,
    };

    if (bio) userData.bio = bio;
    if (password) userData.password = password;
    if (profileImage) userData.profileImage = profileImage;

    const formData = new FormData();
    for (const key in userData) {
      formData.append(key, userData[key]);
    }

    await dispatch(updateProfile(formData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 3000);
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
          <input type="text" value={name || ""} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          <span>Email</span>
          <input type="email" value={email || ""} disabled />
        </label>
        <label>
          <span>Bio</span>
          <textarea value={bio || ""} onChange={(e) => setBio(e.target.value)} rows="4" />
        </label>
        <label>
          <span>Senha</span>
          <input
            type="password"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {!loading && <input type="submit" value="Atualizar" />}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </form>
    </div>
  );
}

export default EditProfile;
