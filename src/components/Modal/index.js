import * as React from 'react';
import { memo } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  height: '100vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
};

const BasicModal = ({ open, setOpen, title, children }) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          sx={{ borderBottom: '1px solid #c2b58a' }}
          py={2}
          px={2}
        >
          <Box></Box>
          <Typography variant='h6' component='h2'>
            {title}
          </Typography>
          <IconButton onClick={() => setOpen(false)}>
            <Close sx={{ color: '#c2b58a' }} />
          </IconButton>
        </Box>
        {children}
      </Box>
    </Modal>
  );
};
export default memo(BasicModal);
