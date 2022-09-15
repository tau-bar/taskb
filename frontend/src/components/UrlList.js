import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { PRODUCTION_BASE_URL } from '../utils/const';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';

const EditModal = ({ open, handleUpdate, onClose }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [newUrl, setNewUrl] = useState('');

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Update URL:
        </Typography>
        <TextField
                onChange={(e) => setNewUrl(e.target.value)}
                sx={{ my:2 }}
                fullWidth
                id="newUrl"
                label="New URL"
                name="newUrl"
        />
        <Button
            fullWidth
            onClick={() => {
              handleUpdate(newUrl)
              onClose()
            }}
            variant="contained"
            sx={{ width: 200, mt: 3, mb: 2 }}
          >
            Update
          </Button>
      </Box>
    </Modal>
  )
}

const UrlList = ({ list, handleDelete, handleEdit }) => {
  const [open, setOpen] = useState(false);
  const [editCode, setEditCode] = useState('');
  const [editIdx, setEditIdx] = useState(-1);

  const handleClickEdit = (ec, idx) => {
    setOpen(true);
    setEditCode(ec);
    setEditIdx(idx);
  }

  return (
    <List sx={{ border: 1, borderColor: 'primary.main', width: '100%', bgcolor: 'background.paper' }}>
      <EditModal open={open} handleUpdate={(newUrl) => handleEdit(editCode, editIdx, newUrl)} onClose={() => setOpen(false)}/>
      {list.map((value, idx) => {
        const url = `${PRODUCTION_BASE_URL}/api/url/${value.urlCode}`;
        const labelId = `checkbox-list-label-${value.id}`;

        return (
          <ListItem
            key={value.id}
            secondaryAction={
              <div>
              <IconButton edge="end" aria-label="edit" onClick={() => handleClickEdit(value.urlCode, idx)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(value.urlCode, idx)}>
                <DeleteIcon />
              </IconButton>
              </div>
              
            }
            disablePadding
          >
            <ListItemButton role={undefined} dense>
              <ListItemText id={labelId} primary={<a href={url}>{url}</a>} secondary={value.longUrl}/>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

export default UrlList;