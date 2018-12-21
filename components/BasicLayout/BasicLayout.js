import React, { Component } from 'react';
import {withStyles} from "@material-ui/core/styles";
import {styles} from "./BasicLayout.styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Router from 'next/router';
import Button from '@material-ui/core/Button';
import Hidden from "@material-ui/core/Hidden";
import {
    AccountCircle,
    Flash,
    Forum,
    Menu,
} from "mdi-material-ui";
// import SideDrawer from "../SideDrawer/SideDrawer";

class BasicLayout extends Component {
    state = {
        drawerOpen: false,
    }
    
    render() {
        const { classes, theme, children, currentPath, title } = this.props;
        const { drawerOpen, anchorEl } = this.state;

        return (
            <div className={classes.root}>
                {/* <SideDrawer toggleDrawer={() => this.setState({drawerOpen: false})}
                    drawerOpen={drawerOpen} 
                    currentPath={currentPath}
                /> */}
                <AppBar elevation={2} position={"static"} classes={{root: classes.appBar}}>
                    <Toolbar >
                        <IconButton onClick={() => this.setState({drawerOpen: !drawerOpen})}
                            className={classes.leftButton}
                        >
                            {/* <Menu style={{color: 'white'}}/> */}
                            <img src="/static/logo-only.png" height={50} />
                        </IconButton>
                        <div className={classes.titleWrapper}>
                            <Button className={classes.title}>
                                Products
                            </Button>
                            <Button className={classes.title}>
                                Quotes
                            </Button>
                            <Button className={classes.title}>
                                Orders
                            </Button>
                            <Button className={classes.title}>
                                Prices
                            </Button>
                            <Button className={classes.title}>
                                Shipping
                            </Button>
                        </div>
                        
                        <IconButton onClick={() => Router.push("/login")}
                            className={classes.rightButton}
                        >
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