export const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#fbfbfb',
    },
    appFrame: {
        height: 430,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    title: {
        fontWeight: 300, 
        marginLeft: 30,
        [theme.breakpoints.down('sm')]: {
            fontSize: 18,
            textAlign: 'center',
            marginRight: 20,
            marginLeft: 20,
        }
    },
    appBar: {
        background: `linear-gradient(to bottom right, ${theme.palette.primary[600]}, ${theme.palette.primary[400]})`,
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
        height: 'calc(100% - 90px)',
        margin: '0'
    }
});