import React from 'react';
import { Button } from '@material-ui/core';

const BaseButton = ({ fetchData, children }) => {
    return (
        <>
            <Button variant="contained" color="primary" onClick={fetchData}>
                {children}
            </Button>
        </>
    )
}

export default BaseButton;
