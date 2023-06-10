import React from 'react';
import { memo } from "react";
import BookItem from '../BookItem';
import { Grid } from '@mui/material';

const Books = ({ books, setDeletedItem, setChanged }) => {
  return (
    <Grid container spacing={2} mt={3} px={1}>
      {books.map((item) => (
        <Grid item xs={2}
          key={item.id}>
          <BookItem
            item={item}
            setDeletedItem={setDeletedItem}
            setChanged={setChanged}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default memo(Books);
