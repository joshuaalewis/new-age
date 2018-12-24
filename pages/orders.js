import React, { Component } from 'react';
import {withStyles} from "@material-ui/core/styles";
import {styles} from "./styles/shared.styles";
import BasicLayout from "../components/BasicLayout/BasicLayout";

class Orders extends Component {
    state = {}

    static async getInitialProps({req, res, pathname, query}) {
        if(req) {
            return {
                currentPath: pathname,
            };
        } else {
            return {}
        }
    }

    render() {
        const { classes, theme, currentPath } = this.props;
        const { } = this.state;

        return (
            <BasicLayout currentPath={currentPath}>
                Orders
            </BasicLayout>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Orders);