export const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: `${theme.palette.primary[50]}44`,
        color: theme.palette.primary[800],
        textAlign: 'center',
    },
    icons: {
        padding: 10,
    },
    iconButton: {
        border: `1px solid ${theme.palette.primary[600]}99`,
        margin: 10,
        width: 40,
        height: 40,
    },
    icon: {
        color: `${theme.palette.primary[600]}99`,
        height: 20,
        width: 20,
        marginTop: -3,
    },
    copyright: {
        fontSize: 11,
        padding: '0 10px 40px'
    },
});