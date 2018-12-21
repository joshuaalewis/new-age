import React, { Component } from 'react';
import {withStyles} from "@material-ui/core/styles";
import {styles} from "./styles/shared.styles";
import BasicLayout from "../components/BasicLayout/BasicLayout";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class Landing extends Component {
    state = {
        drawerOpen: false,
        hoveringOn: null,
        products: [
            {
                name: 'Vanity Tops',
                description: 'Description about vanity tops that explains more info to the customer',
                image: '/static/prod-vanitytops.jpg',
                active: true,
                hovering: false,
            },
            {
                name: 'Shower Base',
                description: 'Description about vanity tops that explains more info to the customer',
                image: '/static/prod-showerbase.jpg',
                active: true,
                hovering: false,
            },
            {
                name: 'Custom Radiance Piece',
                description: 'Description about vanity tops that explains more info to the customer',
                image: '/static/prod-radiancepiece.jpg',
                active: true,
                hovering: false,
            },
            {
                name: 'Custom Solid Surface',
                description: 'Description about vanity tops that explains more info to the customer',
                image: '/static/prod-surfacepiece.jpg',
                active: true,
                hovering: false,
            },
            {
                name: 'Seat and Bench',
                description: 'Description about vanity tops that explains more info to the customer',
                image: '/static/prod-seatandbench.jpg',
                active: true,
                hovering: false,
            },
            {
                name: 'Threshold',
                description: 'Description about vanity tops that explains more info to the customer',
                image: '/static/prod-threshold.jpg',
                active: true,
                hovering: false,
            },
        ]
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

    toggleHoverOn(id) {
        this.setState({
            hoveringOn: id
        })
    }

    toggleHoverOff(id) {
        this.setState({
            hoveringOn: id
        })
    }

    render() {
        const { classes, theme, currentPath } = this.props;
        const { products, hoveringOn } = this.state;

        return (
            <BasicLayout currentPath={currentPath}>
                <Grid container spacing={0} style={{padding: 50, width: '70%', margin: '0 auto'}}>
                    {products && products.map((product, key) => {
                        const hovering = hoveringOn === key
                        return (
                            <Grid item xs={12} sm={12} md={4}>
                                <Card className={classes.card} 
                                    key={key} 
                                    style={hovering ? {marginTop: 7} : {}}
                                    elevation={hovering ? 15 : 5} 
                                    onMouseEnter={() => this.toggleHoverOn(key)}
                                    onMouseLeave={() => this.toggleHoverOff(key)}
                                >
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={product.image}
                                            title={product.name}
                                            style={{opacity: 0.8}}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {product.name}
                                            </Typography>
                                            <Typography component="p">
                                                {product.description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            Share
                                        </Button>
                                        <Button size="small" color="primary">
                                            Learn More
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </BasicLayout>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Landing);