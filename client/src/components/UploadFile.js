import { useState } from 'react';

import api from '../utils/api';
import Button from './Button';
import Input from './Input';
import styles from './UploadFile.module.css';

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('file', file);
    formData.append('title', title);

    try {
      await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
    setFileUrl(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileSelect} />
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <Input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <Button submit>Upload File</Button>
      </form>
      {file && <img className={styles.img} src={fileUrl} alt={title} />}
    </div>
  );
};

export default UploadFile;
