import React, { useRef, useState } from "react";
import "./ImageUpload.css";

const ImageUpload = (props) => {
  const [previewImage, setPreviewImage] = useState(null);
  const handleImageBoxClick = (e) => {
    imageFileInput.current.click();
  };
  const handleImageUpload = (e) => {
    props.onImageChange(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const imageFileInput = useRef();

  return (
    <div className="image-upload">
      <input
        type="file"
        id={props.id}
        style={{ display: "none" }}
        ref={imageFileInput}
        accept=".jpg,.png,.jpeg"
        onChange={handleImageUpload}
      />
      <div className="image-preview">
        {previewImage && <img src={previewImage} alt="" />}
        {!previewImage && <p>No image has been uploaded</p>}
      </div>
      <div className="image-upload-box" onClick={handleImageBoxClick}>
        Upload image
      </div>
    </div>
  );
};

export default ImageUpload;
