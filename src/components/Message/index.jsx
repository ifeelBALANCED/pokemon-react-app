import React from 'react';
import {Alert, AlertIcon} from "@chakra-ui/react";

export const Message = ({message}) => {
    return (
        <Alert status="error" className="alert">
            <AlertIcon />
            {message}
        </Alert>
    );
};


