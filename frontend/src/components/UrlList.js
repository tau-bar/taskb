import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UrlList = () => {
  return (
    <List sx={{ border: 1, borderColor: 'primary.main', width: '100%', bgcolor: 'background.paper' }}>
      {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value}
            secondaryAction={
              <div>
              <IconButton edge="end" aria-label="edit">
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
              </div>
              
            }
            disablePadding
          >
            <ListItemButton role={undefined} dense>
              <ListItemText id={labelId} primary={`URL ${value}`} secondary={'actual url'}/>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

export default UrlList;