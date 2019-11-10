import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    paper: {
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
    },
}));

export default function FileArea(props) {
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar>Dw</Avatar>
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        <Typography noWrap>{props.name || 'Please, choose a name'}</Typography>
                        <Typography noWrap variant="caption">{props.files.length} versions</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}
