import {Button, Tooltip} from '@mui/material';
import React from 'react';
import {DebugEntry} from '../../API/Debug';
import {formatBytes} from '../../../Inspector/Component/TreeView/helper';

type MemoryItemProps = {
    data: DebugEntry;
};

export const MemoryItem = ({data}: MemoryItemProps) => {
    return (
        <Tooltip title={`${(data.web || data.console).memory.peakUsage.toLocaleString(undefined)} bytes`} arrow>
            <Button
                color="info"
                variant="contained"
                sx={{
                    whiteSpace: 'nowrap',
                    textTransform: 'none',
                    borderRadius: 0,
                }}
            >
                {formatBytes((data.web || data.console).memory.peakUsage)}
            </Button>
        </Tooltip>
    );
};
