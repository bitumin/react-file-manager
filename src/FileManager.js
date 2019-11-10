import React, {createRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Typography from "@material-ui/core/Typography";
import FileArea from "./FileArea";
import Grid from "@material-ui/core/Grid";
import ContentEditable from "react-contenteditable";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding:'45px',
    },
    fab: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

const dummyFilesData = {
    filemanager: {
        id: 13,
        name: 'Policies and whatnot',
        fileareas: [
            {
                id: 18,
                sortorder: 1,
                name: 'My lil pony',
                files: [
                    {
                        name: 'mylilpony.pdf',
                        uploadedat: 1234567890,
                        active: 0,
                    },
                    {
                        name: 'mylilpony.docx',
                        uploadedat: 2234567890,
                        active: 1,
                    }
                ]
            },
            {
                id: 91,
                sortorder: 2,
                name: 'Star wards',
                files: [
                    {
                        name: 'mystarwars.xls',
                        uploadedat: 2234567890,
                        active: 0,
                    },
                    {
                        name: 'superstarwars.docx',
                        uploadedat: 3234367890,
                        active: 1,
                    },
                    {
                        name: 'diestarwars.pdf',
                        uploadedat: 4234367890,
                        active: 0,
                    }
                ]
            },
            {
                id: 532,
                sortorder: 3,
                name: 'Empty one',
                files: []
            },
        ]
    }
};

export default function FileManager() {
    const classes = useStyles();
    const [managerName, setManagerName] = useState(dummyFilesData.filemanager.name);
    const [fileAreas, setFileAreas] = useState(dummyFilesData.filemanager.fileareas);
    const contentEditableRef = createRef();

    const addNewFileArea = () => {
        setFileAreas([...fileAreas, {
            id: (Math.floor(Math.random() * 1000000)),
            sortorder: fileAreas[fileAreas.length - 1].sortorder + 1,
            name: '',
            files: []
        }]);
    };

    const handleManagerNameChange = (e) => {
        setManagerName(e.target.value);
    };

    const handleSaveManagerName = (e) => {
        console.log('saving ' + managerName);
        // TODO persist in backend.
    };

    const handleManagerNameKeyPress = (e) => {
        if(e.charCode === 13) { // 13 = Enter key
            // Prevent adding a new line
            e.preventDefault();
            // Force blur
            e.target.blur();
        }
    };

    return (
        <div className={classes.root}>
            <Grid
                container
                direction="row"
                justify="space-between"
            >
                <Grid item>
                    <Typography variant="h4" component="h1">
                        <ContentEditable
                            innerRef={contentEditableRef}
                            html={managerName}
                            onChange={handleManagerNameChange}
                            onBlur={handleSaveManagerName}
                            onKeyPress={handleManagerNameKeyPress}
                        />
                    </Typography>
                </Grid>
                <Grid item>
                    <Fab onClick={addNewFileArea}
                         color="primary"
                         aria-label="add"
                         className={classes.fab}>
                        <AddIcon/>
                    </Fab>
                </Grid>
            </Grid>
            <Grid
                container
                direction="row"
                alignItems="center"
                spacing={2}
            >
                {fileAreas.map((filearea => {
                    return <FileArea
                        id={filearea.id}
                        key={filearea.id}
                        name={filearea.name}
                        sortorder={filearea.sortorder}
                        files={filearea.files}
                    />
                }))}
            </Grid>
        </div>
    );
}
