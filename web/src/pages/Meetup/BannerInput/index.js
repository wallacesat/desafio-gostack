import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import { MdPhotoCamera } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '~/services/api';

import { Container } from './styles';

export default function BannerInput({ validateBanner }) {
  const { defaultValue, registerField } = useField('banner');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  if (ref.current) {
    validateBanner(ref.current.value);
  }

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'banner_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref.current]);

  async function handleChange(e) {
    try {
      const data = new FormData();
      data.append('file', e.target.files[0]);

      const response = await api.post('files', data);

      const { id, url } = response.data;

      setFile(id);
      setPreview(url);
    } catch (err) {
      toast.error(
        err.response && err.response.data
          ? err.response.data.error
          : 'Erro ao carregar imagem.'
      );
    }
  }

  return (
    <Container>
      <label htmlFor="banner">
        {preview ? (
          <img src={preview} alt="Banner meetup" />
        ) : (
          <div id="default-image">
            <MdPhotoCamera color="rgba(255, 255, 255, 0.2)" size={64} />
            <span>Selecionar imagem</span>
          </div>
        )}
        <input
          type="file"
          id="banner"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}
