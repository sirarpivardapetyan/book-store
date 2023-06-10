import { Search } from '@mui/icons-material';
import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { memo } from "react";
import BasicModal from '../Modal';
import { createBook } from '../../http/BookApi';
import FileUpload from '../FileUpload';

const SearchBar = ({ open, setOpen, search, setSearch }) => {
  const [image, setImage] = React.useState('');

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const name = e.target.name.value;
      const description = e.target.description.value;
      const price = +e.target.price.value;
      const discount = e.target.discount.value;
      await createBook({
        name,
        description,
        price,
        discount,
        image: image
      });
      setOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  const inputStyles = {
    '& .MuiInputLabel-root': { color: '#c2b58a' }, 
    '& .MuiOutlinedInput-root': {
      '& > fieldset': { borderColor: '#c2b58a' }
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
      '& > fieldset': { borderColor: '#c2b58a' }
    }
  };
  return (
    <Box
      p={2}
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <OutlinedInput
        defaultValue={search}
        onChange={(e) => setSearch(e.target.value)}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton aria-label='toggle password visibility'>
              <Search sx={{ color: '#c2b58a' }} />
            </IconButton>
          </InputAdornment>
        }
        sx={{
          '&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: '#c2b58a'
          },
          '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#c2b58a'
          },
          '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
            {
              borderColor: '#c2b58a'
            },
          padding: 0,
          height: '40px'
        }}
      />

      <Button
        variant='contained'
        onClick={() => setOpen(true)}
        sx={{
          backgroundColor: '#f5ece7',
          color: 'black',
          boxShadow: 'none',
          '&:hover': { backgroundColor: '#d3cdc9' }
        }}
      >
        <Typography variant='p' fontWeight={'500'}>
          Add Book
        </Typography>
      </Button>
      <BasicModal open={open} setOpen={setOpen} title={'Add Book'}>
        <Box component='form' onSubmit={onSubmit}>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            px={5}
            alignItems={'center'}
          >
            <Box>
              <Box mb={3}>
                <TextField
                  label='name'
                  id='name'
                  type='text'
                  fullWidth
                  required
                  maxLength={200}
                  sx={inputStyles}
                />
              </Box>
              <Box mb={3}>
                <TextField
                  label='description'
                  id='description'
                  type='text'
                  fullWidth
                  required
                  maxLength={400}
                  variant='outlined'
                  sx={inputStyles}
                />
              </Box>
              <Box display={'flex'} alignItems={'center'} gap={3}>
                <TextField
                  label='price'
                  id='price'
                  type='number'
                  required
                  sx={inputStyles}
                />
                <TextField
                  label='discount'
                  id='discount'
                  min={0}
                  max={100}
                  type='number'
                  sx={inputStyles}
                />
              </Box>
            </Box>
            <FileUpload setImage={setImage} />
          </Box>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            sx={{ borderTop: '1px solid #f5ece7' }}
          >
            <Button
              onClick={() => setOpen(false)}
              sx={{
                backgroundColor: 'transparent',
                color: 'black',
                boxShadow: 'none',
                fontSize: 20,
                padding: '15px 50px'
              }}
            >
              Cancel
            </Button>

            <Button
              type='SUBMIT'
              sx={{
                backgroundColor: '#f7f7f7',
                color: 'black',
                boxShadow: 'none',
                fontSize: 20,
                padding: '15px 100px'
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </BasicModal>
    </Box>
  );
};

export default memo(SearchBar);
