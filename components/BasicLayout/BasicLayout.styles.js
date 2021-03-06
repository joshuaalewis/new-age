export const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#fbfbfb',
        position: 'relative',
    },
    appFrame: {
        height: 430,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    titleWrapper: {
        width: '100%',
        textAlign: 'center'
    },
    title: {
        fontWeight: 400, 
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        marginLeft: 5,
        marginRight: 5,
        textAlign: 'center',
        display: 'inline',
        [theme.breakpoints.down('sm')]: {
            fontSize: 18,
            textAlign: 'center',
            marginRight: 20,
            marginLeft: 20,
        },
        '&.active': {
            border: '1px solid #ffffff99'
        }
    },
    button: {
        marginRight: 10,
    },
    leftButton: {
        marginLeft: '10%',
    },
    rightButton: {
        marginRight: '10%',
    },
    appBar: {
        background: `linear-gradient(to bottom right, ${theme.palette.primary[500]}, ${theme.palette.primary[500]})`,
        zIndex: 2200,
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: 250,
        height: '100%',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    wrapper: {
        padding: '20px 10px',
        marginBottom: 100
    },
    sectionHeader: {
        textAlign: 'center',
        padding: 10,
        fontSize: 18,
        fontWeight: 500,
    },
    buttonWrapper: {
        textAlign: 'center',
        padding: '10px 50px',
    },
    extendedButton: {
        width: 180
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'contentShift-left': {
        marginLeft: 0,
    },
    'contentShift-right': {
        marginRight: 0,
    },
    childContainer: {
        height: 'calc(100vh - 80px)',
        margin: '0',
        overflowY: 'auto',
    }
});