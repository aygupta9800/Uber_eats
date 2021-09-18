import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { makeStyles } from '@material-ui/core/styles';
import {
    ListItemText,
    Avatar,
    Divider,
    Toolbar,
    ListItemIcon,
    List,
    Box,
    AppBar,
    ListItem,
    IconButton,
} from '@material-ui/core';
import {
    Home
} from '@material-ui/icons';
import MobileeRightMenuSlider from '@material-ui/core/Drawer';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';

import avatar from '../images/dish_icon.jpeg';
import app_logo from '../images/logo_appbar.svg';

// CSS styles
const useStyles = makeStyles(theme=>({
    sidebarContainer: {
        background: '#F9F9F9',
        height: '100%',
        width: '100%',
        minWidth: '250px',
        paddingTop: '60px'
    },
    icon: {
        display: 'block',
        margin: '0.4rem auto',
        marginBottom: '3rem',
        width: theme.spacing(12),
        height: theme.spacing(12),
        borderRadius: 0,
    },
    listItemStyle: {
        color: 'black'
    }
}));

const menuItems = [
    {
        itemIcon: <Home />,
        itemText: 'Dashboard',
        itemPath: '/'
    },
    {
        itemIcon: <Home />,
        itemText: 'Orders',
        itemPath: '/'
    },
    {
        itemIcon: <Home />,
        itemText: 'Menu',
        itemPath: '/'
    },
    {
        itemIcon: <ConfirmationNumberIcon />,
        itemText: 'Tickets',
        itemPath: '/tickets'
    },
    {
        itemIcon: <Home />,
        itemText: 'Login',
        itemPath: '/login'
    },
]

const Navigationbar = () => {
    const classes = useStyles();

    const [state, setState] = useState({ right: false })

    const toggleSlider = (slider, open) => () => {
        setState({...state, [slider]: open});
    };

    const sidebarList = slider => (
        <Box component='div'
            className={classes.sidebarContainer}
            onClick={toggleSlider(slider, false)}
        >
            <Avatar className={classes.icon} src={avatar} alt='' />
            <Divider />
            <List>
                {menuItems.map((listItem, key) => (
                    <ListItem button key={key} component={Link} to={listItem.itemPath}>
                        <ListItemIcon className={classes.listItemStyle}>{listItem.itemIcon}</ListItemIcon>
                        <ListItemText className={classes.listItemStyle} primary={listItem.itemText} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    return (
        <>
            <Box component='nav'>
                <AppBar position='fixed' style={{background: 'white'}}>
                    <Toolbar style={{display: 'flex', width: '100%'}}>
                        <MobileeRightMenuSlider open={state.right}
                            onClose={toggleSlider('right', false)}
                            anchor='right'>
                            {sidebarList('right')}
                        </MobileeRightMenuSlider>
                        <img src={app_logo} width={'124'} height={'82'} alt='' />
                        <IconButton onClick={toggleSlider('right', true)} style={{ position: 'absolute', right: '2%'}}>
                            <DehazeIcon style={{color: 'black'}} />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default Navigationbar;