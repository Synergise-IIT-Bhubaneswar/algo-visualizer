import { useState, useEffect } from "react";
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        margin: "10vh auto auto 80vw",
        '& > *': {
            margin: theme.spacing(1),
        },
    },

    nodes: {
        display: 'flex',
        flexDirection: "column"
    }

}));



const AdjList = props => {
    const eds = []
    const classes = useStyles();
    const nodes = props.nodeIndices.map((key) => (<Button key={key}>{props.nodeIndices.indexOf(key)}</Button>))
    const [edges, setEdges] = useState(null)
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
                children = (<Button>{"NULL"}</Button>);
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
                    variant="contained"
                >
                    {/* <Button>1233</Button> */}
                    {children}
                </ButtonGroup >)
            // return
            //)

        })

        setEdges(newEdges)
    }, [props])


    return (
        <div className={classes.root}>
            <ButtonGroup
                orientation="vertical"
                color="primary"
                aria-label="vertical outlined primary button group"
            >
                {nodes}
            </ButtonGroup>
            <div className={classes.nodes}>

                {edges}
            </div>
        </div>
    );
}

export default AdjList;