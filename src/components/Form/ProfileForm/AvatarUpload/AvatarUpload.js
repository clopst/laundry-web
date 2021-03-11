import React, { useState } from 'react';
import { message, Popover, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const AvatarUpload = (props) => {
  // const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(props.imageUrl ?? null);
  const [image, setImage] = useState(null);
  
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Anda hanya bisa upload file JPG/PNG');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Ukuran gambar harus lebih kecil dari 2MB');
    }

    if (isJpgOrPng && isLt2M) {
      getBase64(file, imageUrl => {
        setImageUrl(imageUrl);
        setImage(file);
        props.handleImage(file);
      });
    }

    return false;
  }

  // const handleChange = info => {
  //   console.log('info', info);

  //   if (info.file.status === 'uploading') {
  //     setLoading(true);
  //     return;
  //   }
  //   if (info.file.status === 'done') {
  //     // Get this url from response in real world.
  //     getBase64(info.file.originFileObj, imageUrl => {
  //       setImageUrl(imageUrl);
  //       setLoading(false);
  //     });
  //   }
  // }
  
  const uploadButton = (
    <Popover content="Upload foto profil">
      <div>
        {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    </Popover>
  );

  return (
    <Upload
      name={props.name}
      fileList={image ? [image] : []}
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      beforeUpload={beforeUpload}
      // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      // onChange={handleChange}
    >
      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  );
}

export default AvatarUpload;

