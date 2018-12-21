import React, { Component } from 'react';
import {withStyles} from "@material-ui/core/styles";
import {styles} from "./BasicLayout.styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Router from 'next/router';
import Hidden from "@material-ui/core/Hidden";
import {
    AccountCircle,
    Flash,
    Forum,
    Menu,
} from "mdi-material-ui";
import SideDrawer from "../SideDrawer/SideDrawer";
import SearchComponent from "../SearchComponent/SearchComponent";

class BasicLayout extends Component {
    state = {
        drawerOpen: false,
    }
    
    render() {
        const { classes, theme, children, currentPath, title, hideSearch, addDrug } = this.props;
        const { drawerOpen, anchorEl } = this.state;

        return (
            <div className={classes.root}>
                <SideDrawer toggleDrawer={() => this.setState({drawerOpen: false})}
                    drawerOpen={drawerOpen} 
                    currentPath={currentPath}
                />
                <AppBar elevation={5} position={"static"} classes={{root: classes.appBar}}>
                    <Toolbar >
                        <IconButton onClick={() => this.setState({drawerOpen: !drawerOpen})}>
                            <Menu style={{color: 'white'}}/>
                        </IconButton>
                        <div style={{flex: 1}}>
                            <h2 className={classes.title}>
                                {title}
                            </h2>
                        </div>
                        <Hidden smDown>
                            <div style={{flex: 2}}>
                                {!hideSearch && <SearchComponent addDrug={addDrug} />}
                            </div>
                            <div style={{flex: 1, marginLeft: 50}}>
                                
                            </div>
                        </Hidden>
                        <IconButton onClick={() => Router.push("/login/standard")}>
                            <AccountCircle style={{color: 'white'}}/>
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <div className={classes.childContainer}>
                    {children}
                </div>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(BasicLayout);