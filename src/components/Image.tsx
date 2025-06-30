import React, { useState } from 'react';

const ImageUploader: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label htmlFor="image" className="Buttonn">Foto</label>
      <input 
        className="Image"
        type="file" 
        accept="image/*" 
        onChange={handleImageUpload} />
      {image && <img src={image} alt="Imagem selecionada" style={{ maxWidth: '100px'}}  />}
    </div>
  );
};

export default ImageUploader;