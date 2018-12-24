import React, { Component } from 'react';
import {withStyles} from "@material-ui/core/styles";
import {styles} from "./BasicLayout.styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Router from 'next/router';
import Button from '@material-ui/core/Button';
import Footer from './Footer';
import Hidden from "@material-ui/core/Hidden";
import {
    AccountCircle,
    Cart,
    Forum,
    Menu,
} from "mdi-material-ui";
// import SideDrawer from "../SideDrawer/SideDrawer";

class BasicLayout extends Component {
    state = {
        drawerOpen: false,
    }

    navigate = (route) => {
        if(window) {
            window.location.href = route;
        } 
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
                <AppBar elevation={9} position={"static"} classes={{root: classes.appBar}}>
                    <Toolbar >
                        <IconButton onClick={() => this.setState({drawerOpen: !drawerOpen})}
                            className={classes.leftButton}
                        >
                            {/* <Menu style={{color: 'white'}}/> */}
                            <img src="/static/logo-only.png" height={70} />
                        </IconButton>
                        <div className={classes.titleWrapper}>
                            <Button className={`${classes.title} ${currentPath === '/products' ? 'active' : ''}`}
                                onClick={() => this.navigate('/products')}
                            >
                                Products
                            </Button>
                            <Button className={`${classes.title} ${currentPath === '/quotes' ? 'active' : ''}`}
                                onClick={() => this.navigate('/quotes')}
                            >
                                Quotes
                            </Button>
                            <Button className={`${classes.title} ${currentPath === '/orders' ? 'active' : ''}`}
                                onClick={() => this.navigate('/orders')}
                            >
                                Orders
                            </Button>
                            <Button className={`${classes.title} ${currentPath === '/prices' ? 'active' : ''}`}
                                onClick={() => this.navigate('/prices')}
                            >
                                Prices
                            </Button>
                            <Button className={`${classes.title} ${currentPath === '/shipping' ? 'active' : ''}`}
                                onClick={() => this.navigate('/shipping')}
                            >
                                Shipping
                            </Button>
                        </div>
                        <IconButton onClick={() => Router.push("/login")}
                            className={classes.button}
                        >
                            <Cart style={{color: 'white'}}/>
                        </IconButton>
                        <IconButton onClick={() => Router.push("/login")}
                            className={classes.rightButton}
                        >
                            <AccountCircle style={{color: 'white'}}/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <div className={classes.childContainer}>
                    {children}
                    <Footer />
                </div>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(BasicLayout);