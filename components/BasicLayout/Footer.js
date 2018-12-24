import React, { Component } from 'react';
import {withStyles} from "@material-ui/core/styles";
import {styles} from "./Footer.styles";
import IconButton from "@material-ui/core/IconButton";
import Router from 'next/router';
import Button from '@material-ui/core/Button';
import Hidden from "@material-ui/core/Hidden";
import {
    AccountCircle,
    Cart,
    Forum,
    Menu,
    Facebook,
    Linkedin,
    Twitter,
    Email,
    Phone,
} from "mdi-material-ui";

class Footer extends Component {
    state = {
        drawerOpen: false,
    }
    
    render() {
        const { classes, theme } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.icons}>
                    <IconButton size='small' className={classes.iconButton}>
                        <Phone className={classes.icon} />
                    </IconButton>
                    <IconButton size='small' className={classes.iconButton}>
                        <Email className={classes.icon} />
                    </IconButton>
                    <IconButton size='small' className={classes.iconButton}>
                        <Facebook className={classes.icon} />
                    </IconButton>
                    <IconButton size='small' className={classes.iconButton}>
                        <Twitter className={classes.icon} />
                    </IconButton>
                    <IconButton size='small' className={classes.iconButton}>
                        <Linkedin className={classes.icon} />
                    </IconButton>
                </div>
                <div className={classes.copyright}>
                    Copyright © 2018 Newagesurfaces, Inc. All rights reserved.
                </div>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Footer);