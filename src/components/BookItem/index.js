import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { memo } from "react";
import { Box } from '@mui/system';
import { Close, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { deleteBookById, getBookById, updateBook } from '../../http/BookApi';
import BasicModal from '../Modal';
import { Button, TextField } from '@mui/material';
import FileUpload from './../FileUpload';

const BookItem = ({ item, setDeletedItem, setChanged }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [book, setBook] = React.useState(null);
  
  const deletedItem = async () => {
    try {
      setDeletedItem(true);
      await deleteBookById(item.id);
    } catch (e) {
      console.log(e);
    }
  };

  const getBook = async () => {
    try {
      const allbooks = await getBookById(item.id);
      setBook(allbooks);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    getBook();
     // eslint-disable-next-line
  }, []);

  const [name, setName] = React.useState(book?.name);
  const [description, setDescription] = React.useState(book?.description);
  const [price, setPrice] = React.useState(book?.price || '');
  const [discount, setDiscount] = React.useState(book?.discount);
  const [image, setImage] = React.useState(book?.image);

  const inputStyles = {
    '& .MuiInputLabel-root': { color: '#c2b58a' }, //styles the label
    '& .MuiOutlinedInput-root': {
      '& > fieldset': { borderColor: '#c2b58a' }
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
      '& > fieldset': { borderColor: '#c2b58a' }
    }
  };

  const updateOneBook = async () => {
    try {
      await updateBook(book.id, {
        name,
        description,
        price,
        discount,
        image
      });
      setChanged(true);
      setOpen(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Card sx={{ maxWidth: 270, border: '1px solid #e7e7e7' }}>
      <CardHeader
        avatar={
          <Box
            display='flex'
            alignItems='center'
            justifyContent={'center'}
            sx={{ bgcolor: '#ea4b3e', borderRadius: 20, width: 50 }}
          >
            <Typography sx={{ color: 'white', fontSize: 12 }}>
              -{item.discount}%
            </Typography>
          </Box>
        }
        action={
          <Box>
            <IconButton aria-label='settings' onClick={() => setOpen(true)}>
              <Edit />
            </IconButton>
            <IconButton aria-label='settings' onClick={deletedItem}>
              <Close />
            </IconButton>
          </Box>
        }
      />
      <CardMedia
        onClick={() => navigate(`/${item.id}`)}
        sx={{ cursor: 'pointer' }}
        component='img'
        height='180'
        image={
          item.image ||
          'https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149334862.jpg?w=2000'
        }
        alt='Paella dish'
      />
      <CardContent>
        <Box display='flex' justifyContent={'space-between'}>
          <Typography variant='body2' color='text.secondary'>
            {item.description}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {item.price - Math.floor((item.price * item.discount) / 100)}
          </Typography>
        </Box>
      </CardContent>

      <BasicModal open={open} setOpen={setOpen} title={'Edit Book'}>
        {book && (
          <Box component='form'>
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
                    defaultValue={name || book?.name}
                    onChange={(e) => setName(e.target.value)}
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
                    defaultValue={description || book?.description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Box>
                <Box display={'flex'} alignItems={'center'} gap={3}>
                  <TextField
                    label='price'
                    id='price'
                    type='number'
                    required
                    sx={inputStyles}
                    defaultValue={price || book?.price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <TextField
                    label='discount'
                    id='discount'
                    min={0}
                    max={100}
                    type='number'
                    sx={inputStyles}
                    defaultValue={discount || book?.discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </Box>
              </Box>
              <FileUpload setImage={setImage} image={image || book?.image} />
            </Box>
          </Box>
        )}
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
            onClick={updateOneBook}
            type='submit'
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
      </BasicModal>
    </Card>
  );
};


export default memo(BookItem);
