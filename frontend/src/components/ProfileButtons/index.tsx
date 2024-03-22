import { Box, IconButton as MuiIconButton, Avatar, Menu, MenuItem, Divider, ListItemIcon, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useNavigate } from "react-router-dom";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { useAuth } from '../../context/auth';

import PersonIcon from '@mui/icons-material/Person';

const IconButton = styled(MuiIconButton)(({ theme }) => {
  return {
    maxHeight: 40,
    '&:not(:last-child)': {
      marginRight: theme.spacing(1.25)
    }
  }
})

export default function ProfileButtons({ variant } : { variant: 'light' | 'dark'}) {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const firstLetter = (user?.FirstName ?? '')[0] ?? 'Y' 

  const avatarSize = variant === 'light' ? 42 : 32

  return(
  <React.Fragment>
  <Box sx={{color: variant === 'dark' ? "white" : 'primary.light', display: 'flex', height: '100%'}}>
        <IconButton onClick={() => navigate('/')} color="inherit" aria-label="messages">
          <ChatBubbleIcon />
        </IconButton>
        <IconButton onClick={() => navigate('/')} color="inherit" aria-label="notifications">
          <NotificationsIcon />
        </IconButton>
          <IconButton
            onClick={handleClick}
            aria-label="my profile"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            disableRipple
          >
        <Avatar sx={{bgcolor: 'secondary.light', height: avatarSize, width: avatarSize}} variant="rounded">
          {firstLetter}
        </Avatar>
        </IconButton>
    </Box>
    <Menu
    anchorEl={anchorEl}
    id="account-menu"
    open={open}
    onClose={handleClose}
    onClick={handleClose}
    PaperProps={{
      elevation: 0,
      sx: {
        minWidth: 200,
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        marginTop: variant === 'light' ? 1.2 : 0.9,
        '& .MuiAvatar-root': {
          width: 32,
          height: 32,
          ml: -0.5,
          mr: 1,
        },
        '&:before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          top: variant === 'light' ? 2 : 0,
          right: variant === 'light' ? 24 : 19,
          width: 10,
          height: 10,
          bgcolor: 'background.paper',
          transform: 'translateY(-50%) rotate(45deg)',
          zIndex: 0,
        },
      },
    }}
    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
  >
    <Box sx={{px: 2, py: 0.75, display: 'flex'}}>
      <Avatar sx={{bgcolor: 'secondary.light'}} variant="rounded">
        {firstLetter}
      </Avatar>
      <Box sx={{mx: 0.5}}>
        <Typography sx={{fontSize: 14, fontWeight: 'bold'}}>{user?.FirstName} {user?.LastName}</Typography>
        <Typography variant="body2" sx={{fontSize: 12}}>@{user?.Username}</Typography>
      </Box>
    </Box>
    <Divider sx={{my: 1}} />
    <MenuItem>
      <ListItemIcon>
        <PersonIcon fontSize="small" />
      </ListItemIcon>
      About Me
    </MenuItem>
    <MenuItem>
      <ListItemIcon>
        <SettingsIcon fontSize="small" />
      </ListItemIcon>
      Settings
    </MenuItem>
    <Divider sx={{my: 1}} />
    <MenuItem onClick={() => logout()}>
      Logout
    </MenuItem>
  </Menu>
  </React.Fragment>
    )
}