export const themedStyles = theme => ({
    root: {
      width: '100%',
      height: '100vh',
      textAlign: 'center',
      backgroundColor: '#ffffff33'
    },
    backgroundRoot: {
        position: 'fixed',
        backgroundImage: `url('/static/about-bg.jpg')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        filter: 'blur(10px)',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        zIndex: -1,
    },
});