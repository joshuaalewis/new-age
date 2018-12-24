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
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import HttpService from '../services/HttpService';
import {
    DotsVertical
} from 'mdi-material-ui';

class Products extends Component {
    state = {
        drawerOpen: false,
        hoveringOn: null,
        selectedProduct: null,
        selectedCategory: null,
        categoryChain: [],
        optionChain: [],
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
            const products = await HttpService.get('/products')
            const categories = await HttpService.get('/categories')
            
            return {
                currentPath: pathname,
                products: products ? products.results : [],
                categories: categories ? categories.results : []
            }

        } else {
            return {}
        }
    }

    handleProduct(product) {
        this.setState({selectedProduct: product})
        
    }

    handleAddCategory(category) {
        this.setState({
            categoryChain: [
                ...this.state.categoryChain,
                category
            ],
            selectedCategory: category
        })
    }

    handlePopCategory() {
        const chain = [ ...this.state.categoryChain ];
        chain.pop();

        this.setState({
            categoryChain: chain,
            selectedCategory: chain.length > 0 ? { ...chain[chain.length - 1] } : null
        })
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

    getMainImage(element) {
        return element && element.images && element.images.filter(i => i.caption === "main")[0]
    }

    getRootCategories(categories) {
        return categories ? categories.filter(c => c.parent_id === null) : []
    }

    getChildCategories(selected, categories) {
        return selected && categories ? categories.filter(c => c.parent_id === selected.id) : []
    }

    categoryProducts(category, products) {
        if(!category || !products) return null;
        return products.filter(p => p.category_index && p.category_index.id && p.category_index.id.includes(category.id)) || null
    }

    renderSelectTitle() {
        if(this.state.selectedProduct) {
            return this.state.selectedProduct.meta_keywords
        } else if(!this.state.selectedProduct && this.state.selectedCategory) {
            return this.state.selectedCategory.meta_keywords
        } else {
            return "something else"
        }
    }

    render() {
        const { classes, theme, currentPath, products, categories } = this.props;
        const { hoveringOn, selectedProduct, selectedCategory, categoryChain, optionChain } = this.state;
        const renderedCategories = selectedCategory ? this.getChildCategories(selectedCategory, categories) : this.getRootCategories(categories);
        const renderedProducts = selectedCategory && this.categoryProducts(selectedCategory, products)
        const shouldRenderProducts = renderedProducts && renderedProducts.length > 0
        const rootCategory = categoryChain[0];
        const selectTitle = this.renderSelectTitle();

        return (
            <BasicLayout currentPath={currentPath}>
                <div style={rootCategory ? {paddingBottom: 150} : {minHeight: 'calc(100vh - 100px)', paddingBottom: 60}}>

                    {/* root category banner area */}
                    {rootCategory && 
                        <Card className={classes.card} style={{marginTop: 20,}}>
                            <CardActionArea onClick={() => this.handlePopCategory()}>
                                <CardMedia
                                    className={classes.media}
                                    image={this.getMainImage(rootCategory) && this.getMainImage(rootCategory).file.url}
                                    title={rootCategory.name}
                                    style={{opacity: 0.8}}
                                />
                                <CardContent style={{minHeight: 130}}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {rootCategory.name}
                                    </Typography>
                                    <Typography component="p">
                                        {rootCategory.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    }

                    {rootCategory && 
                    <Paper className={classes.selectText}>
                        {selectTitle}
                    </Paper>}

                    {/* area under banner */}
                    <Grid container spacing={0} style={!rootCategory ? {padding: 50, width: '70%', margin: '0 auto'} : {padding: 10}}>

                        

                        {/* high level category selection (step 1) */}
                        {!rootCategory && renderedCategories && renderedCategories.reverse().map((category, key) => {
                            const hovering = hoveringOn === key
                            const mainImage = this.getMainImage(category);
                            return (
                                <Grid item xs={12} sm={12} md={4}>
                                    <Card className={`${classes.card} ${rootCategory ? 'small' : ''}`} 
                                        key={key} 
                                        style={hovering ? {marginTop: 7} : {}}
                                        elevation={hovering ? 15 : 5} 
                                        // onMouseEnter={() => this.toggleHoverOn(key)}
                                        // onMouseLeave={() => this.toggleHoverOff(key)}
                                    >
                                        <CardActionArea onClick={() => this.handleAddCategory(category)}>
                                            <CardMedia
                                                className={`${classes.media} ${rootCategory ? 'small' : ''}`}
                                                image={mainImage && mainImage.file.url}
                                                title={category.name}
                                                style={{opacity: 0.8}}
                                            />
                                            <CardContent style={{minHeight: 130}}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {category.name}
                                                </Typography>
                                                <Typography component="p">
                                                    {category.description}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button size="small" color="primary">
                                                Select
                                            </Button>
                                            <Button size="small" color="primary">
                                                Learn More
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        })}

                        {/* second or third level category selection (steps 2 or 3) */}
                        {rootCategory && renderedCategories.map((category, key) => {
                            return (
                                <Grid item xs={12} sm={12} md={4} key={key} 
                                    style={{
                                        backgroundColor: 'white', 
                                        border: `1px solid ${theme.palette.grey[200]}`, 
                                        overflow: 'hidden', 
                                        maxHeight: 260, 
                                        cursor: 'pointer',
                                        position: 'relative',
                                    }}
                                    onClick={() => this.handleAddCategory(category)}
                                >
                                    <img
                                        className={classes.img}
                                        src={this.getMainImage(category) && this.getMainImage(category).file.url}
                                        // title={category.name}
                                        style={{opacity: 0.8}}
                                    />
                                    <span style={{position: 'absolute', top: '48%', right: '40px'}}>{category.name}</span>
                                </Grid>
                            )
                        })}

                        {/* product list (step 3 or 4) */}
                        <Grid container style={{width: '70%', margin: '0 auto', paddingTop: 50}}>
                            {renderedProducts && renderedProducts.map((product, key) => {
                                const hovering = hoveringOn === key
                                const mainImage = this.getMainImage(product);
                                return (
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Card className={classes.card} 
                                            key={key} 
                                            style={hovering ? {marginTop: 7} : {}}
                                            elevation={hovering ? 15 : 5} 
                                            // onMouseEnter={() => this.toggleHoverOn(key)}
                                            // onMouseLeave={() => this.toggleHoverOff(key)}
                                        >
                                            <CardActionArea onClick={() => this.handleProduct(product)} style={{padding: '15px 15px 30px'}}>
                                                <CardHeader
                                                    action={
                                                        <IconButton>
                                                            <DotsVertical />
                                                        </IconButton>
                                                    }
                                                    title={product.meta_description}
                                                    subheader={product.name}
                                                />
                                                    {/* <Typography gutterBottom variant="h5" component="h2">
                                                        {product.name}
                                                    </Typography>
                                                    <Typography component="p">
                                                        {product.summary}
                                                    </Typography> */}
                                                {/* </CardHeader> */}
                                            </CardActionArea>
                                            {/* <CardActions>
                                                <Button size="small" color="primary">
                                                    Select
                                                </Button>
                                                <Button size="small" color="primary">
                                                    Learn More
                                                </Button>
                                            </CardActions> */}
                                        </Card>
                                    </Grid>
                                )
                            })}
                        </Grid>

                        {/* {selectedProduct &&
                            <Card className={classes.card} style={{maxWidth: 300}}>
                                <CardActionArea onClick={() => this.setState({selectedProduct: null})}>
                                    <CardMedia
                                        className={classes.media}
                                        image={this.getMainImage(selectedProduct) && this.getMainImage(selectedProduct).file.url}
                                        title={selectedProduct.name}
                                        style={{opacity: 0.8}}
                                    />
                                    <CardContent style={{minHeight: 130}}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {selectedProduct.name}
                                        </Typography>
                                        <Typography component="p">
                                            {selectedProduct.summary}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Remove
                                    </Button>
                                    <Button size="small" color="primary">
                                        Learn More
                                    </Button>
                                </CardActions>
                            </Card>
                        } */}
                    </Grid>
                </div>
            </BasicLayout>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Products);