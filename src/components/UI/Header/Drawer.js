import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft/";
import TimelineIcon from '@material-ui/icons/Timeline'
import AddNodeIcon from '@material-ui/icons/Add'
import ListItemIcon from "@material-ui/core/ListItemIcon";
import UndirectedEdgeIcon from '@material-ui/icons/RemoveOutlined'
import DirectedEdgeIcon from '@material-ui/icons/KeyboardBackspaceOutlined'
import BookIcon from '@material-ui/icons/Book'
import IconButton from "@material-ui/core/IconButton";
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography';
import Menu from '../Menu/Menu'
import AlgorithmOptions from '../Menu/AlgorithmOptions'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'

const drawerWidth = 450;
const useStyles = makeStyles((theme) => ({

    hide: {
        display: "none"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end"
    },

}));
const CustomDrawer = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [algorithmMenuAnchor, setAlgorithmMenuAnchor] = useState(null)
    const algorithmMenuOpen = Boolean(algorithmMenuAnchor)
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(AlgorithmOptions[1])

    const openAlgorithmMenu = (e) => {
        setAlgorithmMenuAnchor(e.currentTarget)
    }

    const closeAlgorithmMenu = () => {
        setAlgorithmMenuAnchor(null)
    }

    const selectAlgorithm = (algorithm) => {
        setSelectedAlgorithm(algorithm)
    }
    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={props.open}
            classes={{
                paper: classes.drawerPaper
            }}
        >
            <div className={classes.drawerHeader}>
                <Typography variant="h5" align="center" color="primary">
                    CONTROL PANEL
                </Typography>
                <IconButton onClick={props.handleDrawerClose}>
                    {/* {theme.direction === "ltr" ? ( */}
                    <ChevronLeftIcon />
                    {/* ) : ( */}
                    {/* <ChevronRightIcon /> */}
                    {/* )} */}
                </IconButton>
            </div>
            <Divider />
            <List>

                <ListItem>
                    <ListItemIcon>
                        <TimelineIcon fontSize="large" />
                    </ListItemIcon>
                    <ListItemText primary="Select Algorithm" />
                    <Menu
                        selectOption={selectAlgorithm}
                        selectedOption={selectedAlgorithm}
                        open={algorithmMenuOpen}
                        anchor={algorithmMenuAnchor}
                        close={closeAlgorithmMenu}
                        options={AlgorithmOptions}
                        click={(e) => openAlgorithmMenu(e)}></Menu>
                </ListItem>

                <Divider />
                <ListItem>
                    <ListItemIcon>
                        <BookIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Some Description About Algorithm"
                        secondary="asfasfmc.ngkresjg jrgbkjrvgkjcrngjkergbkjergbjkdf vdn vjdsbgjkergbjdsv dsjgbkjsb vjnd djfg jh vdjnjdhg jdfv jdhrgvb d jdrhg jvh"
                    >

                    </ListItemText>
                </ListItem>

                <Divider />
                <ListItem>
                    <ListItemIcon>
                        <AddNodeIcon fontSize="large" />
                    </ListItemIcon>
                    <ListItemText primary="Add a New Node"></ListItemText>
                    <IconButton>
                        <AddNodeIcon />
                    </IconButton>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <UndirectedEdgeIcon fontSize="large" />
                    </ListItemIcon>
                    <ListItemText primary="Add Undirected Edge From"></ListItemText>
                    <Menu selectedOption="1" options={['1', '2', '3']}></Menu>
                    <ListItemText primary="To"></ListItemText>
                    <Menu selectedOption="1" options={['1', '2', '3']}></Menu>
                    <IconButton disabled>
                        <AddNodeIcon />
                    </IconButton>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <DirectedEdgeIcon fontSize="large" />
                    </ListItemIcon>
                    <ListItemText primary="Add Directed Edge From"></ListItemText>
                    <Menu selectedOption="1" options={['1', '2', '3']}></Menu>
                    <ListItemText primary="To"></ListItemText>
                    <Menu selectedOption="1" options={['1', '2', '3']}></Menu>
                    <IconButton disabled>
                        <AddNodeIcon />
                    </IconButton>
                </ListItem>
                <Divider />

            </List>
            {/* <Grid container spacing="1">
                <Grid justify="center">
                    Select Algorithm - <Menu open={algorithmMenuOpen} options={AlgorithmOptions}></Menu>
                </Grid>

            </Grid> */}

        </Drawer>
    )
}

export default CustomDrawer;