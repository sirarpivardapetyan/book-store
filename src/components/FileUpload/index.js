import React, { useState } from 'react';
import { memo } from "react";
import { Button, CardMedia, Typography } from '@mui/material';
import { Box } from '@mui/system';

const FileUpload = ({ setImage, image = '' }) => {
  const [drag, setDrag] = useState(true);

  const dragStartHandle = (e) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandle = (e) => {
    e.preventDefault();
    setDrag(false);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileRead = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    setImage(base64);
  };

  const onDragHandle = async (e) => {
    e.preventDefault();
    let file = e.dataTransfer.files[0];
    const base64 = await convertBase64(file);
    setImage(base64);
  };

  return (
    <Box>
      <input
        style={{ display: 'none' }}
        id='contained-button-file'
        onChange={(e) => handleFileRead(e)}
        type='file'
      />
      {drag && !image ? (
        <label htmlFor='contained-button-file'>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            sx={{ backgroundColor: '#fefaf6', width: 200, height: 150 }}
            onDragStart={(e) => dragStartHandle(e)}
            onDragLeave={(e) => dragLeaveHandle(e)}
            onDragOver={(e) => dragStartHandle(e)}
            onDrop={(e) => onDragHandle(e)}
          >
            <Typography
              width={180}
              textAlign={'center'}
              textTransform={'uppercase'}
              variant='p'
              fontWeight={'500'}
            >
              click here or drag and drop to upload the image
            </Typography>
          </Box>
        </label>
      ) : image ? (
        <Box width={300}>
          <CardMedia
            component='img'
            height='300'
            image={image}
            alt='Paella dish'
          />
          <Box display={'flex'} alignItems={'center'} gap={3} mt={2}>
            <Button
              sx={{
                backgroundColor: '#e55656',
                color: 'white',
                boxShadow: 'none',
                fontSize: 10,
                '&:hover': { backgroundColor: '#d3cdc9' }
              }}
            >
              <Typography
                onClick={() => setImage(true)}
                width={180}
                textAlign={'center'}
                textTransform={'uppercase'}
                variant='p'
                fontWeight={'500'}
              >
                Remove
              </Typography>
            </Button>

            <label
              htmlFor='contained-button-file'
              style={{
                border: '1px solid #f1eee4',
                color: 'black',
                boxShadow: 'none',
                fontSize: 10,
                padding: '10px 45px',
                cursor: 'pointer'
              }}
            >
              <Typography
                width={180}
                textAlign={'center'}
                textTransform={'uppercase'}
                variant='p'
                fontWeight={'500'}
              >
                Replease
              </Typography>
            </label>
          </Box>
        </Box>
      ) : (
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          sx={{ backgroundColor: '#fefaf6', width: 200, height: 150 }}
          onDragStart={(e) => dragStartHandle(e)}
          onDragLeave={(e) => dragLeaveHandle(e)}
          onDragOver={(e) => dragStartHandle(e)}
        >
          <Typography
            width={180}
            textAlign={'center'}
            textTransform={'uppercase'}
            variant='p'
            fontWeight={'500'}
          >
            drag file to upload
          </Typography>
        </Box>
      )}
    </Box>
  );
};
export default memo(FileUpload);
