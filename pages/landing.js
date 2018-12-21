import React, { Component } from 'react';
import {withStyles} from "@material-ui/core/styles";
import {styles} from "./styles/shared.styles";
import BasicLayout from "../components/BasicLayout/BasicLayout";

class Landing extends Component {
    state = {
        drawerOpen: false,
    }

    static async getInitialProps({req, res, pathname, query}) {
        if(req) {
            // const cookies = req.headers.cookie;
            // let cookie = "";
            // if (typeof cookies === 'string') {
            //     const cookiesJSON = jsHttpCookie.parse(cookies);
            //     cookie = cookiesJSON.mtsession;
            // }
            
            // const reportData = await HttpService.get(`/data/${cookie}`);
            // const specimen = reportData;

            return {
                currentPath: pathname,
            };
        } else {
            return {}
        }
    }
    render() {
        const { classes, theme, currentPath } = this.props;

        return (
            <BasicLayout currentPath={currentPath} title={"Place an Order"}>
                
            </BasicLayout>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Landing);