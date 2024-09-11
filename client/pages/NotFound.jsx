import React from 'react'

const NotFound = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>404</h1>
            <p style={styles.message}>Oops! Page not found.</p>
        </div>
    )
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f8f8f8',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontSize: '48px',
        fontWeight: 'bold',
        color: '#ff6b6b',
        marginBottom: '16px',
    },
    message: {
        fontSize: '24px',
        color: '#333',
    },
}

export default NotFound