export const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#f3f3f3',
    },
    card: {
        margin: 10,
    },
    media: {
        height: 300,
    },
    subheader: {
        borderRadius: 30,
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        padding: '15px 20px',
        fontSize: 20,
        width: '15%',
        minWidth: 270,
        margin: '0 auto'
    },
    blip: {
        fontSize: 14,
        padding: 30,
        textAlign: 'center',
        color: theme.palette.grey[500]
    },
    highlights: {
        textAlign: 'center', 
        padding: '80px 0', 
        width: '70%',
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: {
            padding: '10px 0'
        }
    },
    appFrame: {
        height: 430,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        background: `linear-gradient(to bottom right, ${theme.palette.primary[600]}, ${theme.palette.primary[400]})`,
        zIndex: 2200,
    },
    hoverButton: {
        position: 'absolute',
        bottom: 40,
        right: -10,
        zIndex: 50,
        color: 'white'
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
        padding: '10px 10px',
        marginBottom: 50,
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
    },
    textField: {
        border: `1px solid ${theme.palette.grey[400]}`,
        borderRadius: 10,
        padding: 5,
        width: '100%',
        '&.active': {
            backgroundColor: 'white',
        },
        '&.open': {
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0
        }
    },
    inputWrapper: {
        margin: `0 auto`,
        width: '60%',
        position: 'relative',
    },
    textPart: {
        display: 'inline',
        fontWeight: 200,
        '&.highlight': {
            fontWeight: 400,
        }
    },
    drugIcon: {
        paddingRight: 5,
        width: 22,
        marginBottom: -4,
        height: 22,
    },
    whiteBorderBox: {
        border: `1px solid ${theme.palette.grey[400]}`, 
        borderRadius: 10, 
        minHeight: 400,
        backgroundColor: 'white',
        position: 'relative',
        textAlign: 'center',
        paddingTop: 40,
    },
    sectionTitleBox: {
        position: 'absolute',
        top: -36,
        left: 60,
        width: 200,
        padding: 20,
        borderRadius: 15,
        fontSize: 16,
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        textAlign: 'center',
    }
});