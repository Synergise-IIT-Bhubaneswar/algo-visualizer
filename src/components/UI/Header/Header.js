import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CustomDrawer from "./Drawer";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: "60px",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  visualizeButtonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2, 1, 2),
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [nodeIndices, setNodeIndices] = useState([])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const startVisualizing = () => {
    props.startVisualizing()
    props.canvasRef.current.startVisualizing()
  }
  useEffect(() => {
    const newNodeIndices = [];
    for (let i = 0; i < props.canvasRef.current.state.noOfVertices; i++) {
      newNodeIndices.push(i);
    }
    console.log("useEff");
    setNodeIndices(newNodeIndices);
  }, [
    props.canvasRef.current
      ? props.canvasRef.current.state.noOfVertices
      : props.canvasRef.current,
  ]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <ChevronRightIcon />
            <ChevronRightIcon />
            <ChevronRightIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Algo-Visualizer
          </Typography>
          <Grid
            className={classes.visualizeButtonContainer}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => startVisualizing()}
              disabled={props.isVisualizing || (props.startNode === "Start Node" || nodeIndices.length === 0)}
            >
              VISUALIZE&nbsp;
              {props.isVisualizing && (
                <CircularProgress size={20} color="inherit" />
              )}
            </Button>

          </Grid>
          <Button color="inherit">Github</Button>
        </Toolbar>
      </AppBar>
      <CustomDrawer
        startNode={props.startNode}
        selectStartNode={props.selectStartNode}
        selectAlgorithm={props.selectAlgorithm}
        AlgorithmOptions={props.AlgorithmOptions}
        selectedAlgorithm={props.selectedAlgorithm}
        open={open}
        handleDrawerClose={handleDrawerClose}
        canvasRef={props.canvasRef}
      />
    </div>
  );
};

export default Header;
