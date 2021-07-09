import { useState, useEffect } from "react";
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        margin: "10vh 0 0 50vw",
    },
    disabledButton: {
        backgroundColor: '#808080'
    },
    paper: {
        margin: theme.spacing(1),
        zIndex: "1000",
        width: "100vw",
        overflow: "scroll",
        maxHeight: "80vh",
        backgroundColor: "#000000"
    },
    list: {
        display: 'flex',
        justifyContent: "center",
        margin: "auto auto",
        '& > *': {
            margin: theme.spacing(1),
        },
    },

    nodes: {
        display: 'flex',
        flexDirection: "column",
        '& > *': {
            margin: theme.spacing(0.2),
        },
    }

}));



const AdjList = props => {
    const eds = []
    const classes = useStyles();
    const nodes = props.nodeIndices.map((key) => (
        <ButtonGroup
            orientation="vertical"
            color="secondary"
            aria-label="vertical outlined primary button group"
        >
            <Button key={key + "123"}>{props.nodeIndices.indexOf(key)}</Button>
            {/* {nodes} */}
        </ButtonGroup>
    ))
    const [edges, setEdges] = useState(null)
    // const [open, setOpen] = useState(true)
    // const getOtherNodeID = (id, key) => {
    //     props.edgeRefs.get(id).current.getOtherVertexID(key)
    // }
    useEffect(() => {
        const newEdges = props.nodeIndices.map(key => {
            // props.adjList.get(key).map(id => //console.log(uuidValidate(id))
            //     console.log(props.nodeIndices.indexOf(id))
            // )
            // console.log(props.nodeIndices.indexOf(key))
            // console.log(key)
            let children
            if (props.adjList.get(key).length === 0) {
                children = (null)
                // children = (<Button disabled classes={{ disabled: classes.disabledButton }}>\</Button>);
                // console.log("Children NULL")
            }
            else {
                children = props.adjList.get(key).map(id => {
                    const otherID = props.edgeRefs.get(id).current.getOtherVertexID(key)//getOtherNodeID(id, key)
                    console.log(otherID)
                    return (<Button key={id}>
                        {props.nodeIndices.indexOf(otherID)}
                    </Button>)
                })
            }

            //return (
            return (
                <ButtonGroup
                    key={key}
                    orientation="horizontal"
                    color="primary"
                    aria-label="horizontal contained primary button group"
                // variant="contained"
                >
                    {/* <Button>1233</Button> */}
                    {children}
                    <Button disabled classes={{ disabled: classes.disabledButton }}>\</Button>
                </ButtonGroup >)
            // return
            //)

        })

        setEdges(newEdges)
    }, [props])


    return (
        <>
            <div className={classes.container}>
                <Fade in={props.open}>
                    <Paper elevation={4} className={classes.paper}>
                        <div className={classes.list}>
                            {/* <ButtonGroup
                orientation="vertical"
                color="primary"
                aria-label="vertical outlined primary button group"
            > */}
                            <div className={classes.nodes}>

                                {nodes}
                            </div>

                            {/* </ButtonGroup> */}
                            <div className={classes.nodes}>

                                {edges}
                            </div>
                        </div>
                    </Paper>
                </Fade>
            </div>

        </>
    );
}

export default AdjList;