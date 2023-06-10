import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById } from '../../http/BookApi';
import { CardMedia, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

const BookPage = () => {
  let { id } = useParams();
  const [book, setBook] = useState({});

  const getBook = async () => {
    try {
      const allbooks = await getBookById(id);
      setBook(allbooks);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBook();
     // eslint-disable-next-line
  }, []);

  return (
    <Grid container spacing={2} mt={3} px={1}>
      <Grid item xs={4}>
        <CardMedia
          component='img'
          height='300'
          image={
            book.image ||
            'https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149334862.jpg?w=2000'
          }
          alt='Paella dish'
        />
      </Grid>
      <Grid item xs={8}>
        <Typography variant='h6' component='div'>
          {book.name}
        </Typography>
        <Box
          p={2}
          display={'flex'}
          alignItems={'center'}
          gap={1}
          sx={{
            backgroundColor: '#ecd7ca',
            width: 'fit-content',
            borderRadius: 5
          }}
        >
          <del>{book.price}</del>
          <Typography variant='p' fontSize={12} color={'red'}>
            {book.price - Math.floor((book.price * book.discount) / 100)}
          </Typography>
        </Box>

        <Typography variant='p'>{book.description}</Typography>
      </Grid>
    </Grid>
  );
};

export default BookPage;
