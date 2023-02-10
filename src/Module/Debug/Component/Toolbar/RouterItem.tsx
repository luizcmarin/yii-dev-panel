import {Button} from '@mui/material';
import React from 'react';
import {DebugEntry} from '../../API/Debug';
import {Route} from '@mui/icons-material';

type RouterItemProps = {
    data: DebugEntry;
};

export const RouterItem = ({data}: RouterItemProps) => {
    if (data.router.matchedRoute === null) {
        return null;
    }
    return (
        <Button
            startIcon={<Route fontSize="small" />}
            color="info"
            variant="contained"
            sx={{
                height: '100%',
                textTransform: 'none',
                borderRadius: 0,
            }}
        >
            {data.router.matchedRoute}
        </Button>
    );
};
