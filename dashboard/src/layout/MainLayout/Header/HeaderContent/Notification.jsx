import { useRef, useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Badge,
  Box,
  ClickAwayListener,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Popper,
  Typography,
  useMediaQuery
} from '@mui/material';

// project import
import MainCard from '../../../../components/MainCard';
import Transitions from '../../../../components/@extended/Transitions';

// assets
import { BellOutlined, CloseOutlined, MessageOutlined } from '@ant-design/icons';
import axios from '../../../../../node_modules/axios/index';

// sx styles
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

const actionSX = {
  mt: '6px',
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

const Notification = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const [readNotifications, setReadNotifications] = useState(new Set());

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    if (!open) {
      setNewNotificationCount(0); // Reset new notification count when popper is opened
    }
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleNotificationClick = (id) => {
    if (!readNotifications.has(id)) {
      setReadNotifications((prevReadNotifications) => {
        const newReadNotifications = new Set(prevReadNotifications);
        newReadNotifications.add(id);
        return newReadNotifications;
      });
      setNewNotificationCount((prevCount) => Math.max(prevCount - 1, 0));
    }
  };

  const iconBackColorOpen = 'grey.300';
  const iconBackColor = 'grey.100';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_Antrian);
        const newData = response.data.data;
        setNotifications(newData);
        setNewNotificationCount(newData.length);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton
        disableRipple
        color="secondary"
        sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Badge badgeContent={newNotificationCount} color="primary">
          <BellOutlined />
        </Badge>
      </IconButton>
      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? -5 : 0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                width: '100%',
                minWidth: 285,
                maxWidth: 420,
                [theme.breakpoints.down('md')]: {
                  maxWidth: 285
                }
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  title="Notification"
                  elevation={0}
                  border={false}
                  content={false}
                  secondary={
                    <IconButton size="small" onClick={handleToggle}>
                      <CloseOutlined />
                    </IconButton>
                  }
                >
                  <List
                    component="nav"
                    sx={{
                      p: 0,
                      '& .MuiListItemButton-root': {
                        py: 0.5,
                        '& .MuiAvatar-root': avatarSX,
                        '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                      }
                    }}
                  >
                    {notifications.map((data) => (
                      <div key={data._id}>
                        <ListItemButton onClick={() => handleNotificationClick(data._id)} sx={{ bgcolor: readNotifications.has(data._id) ? 'grey.100' : 'white' }}>
                          <ListItemAvatar>
                            <Avatar
                              sx={{
                                color: 'primary.main',
                                bgcolor: 'primary.lighter'
                              }}
                            >
                              <MessageOutlined />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography variant="h6">
                                <Typography component="span" variant="subtitle1">
                                  {data.user?.name}
                                </Typography>{' '}
                                telah mengambil antrian {data.nomer_antrian}
                              </Typography>
                            }
                          />
                          <ListItemSecondaryAction>
                            <Typography variant="caption" noWrap>
                              {formatDate(data.createdAt)}
                            </Typography>
                          </ListItemSecondaryAction>
                        </ListItemButton>
                        <Divider />
                      </div>
                    ))}
                    <ListItemButton sx={{ textAlign: 'center', py: `${12}px !important` }}>
                      <ListItemText
                        primary={
                          <Typography variant="h6" color="primary">
                            View All
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </List>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Notification;
