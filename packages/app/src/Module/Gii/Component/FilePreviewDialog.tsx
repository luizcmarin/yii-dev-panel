import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {CodeHighlight} from '@yii-dev-panel/sdk/Component/CodeHighlight';
import {GiiFile} from '@yii-dev-panel/app/Module/Gii/Types/FIle.types';

export type FilePreviewDialogProps = {
    open: boolean;
    file: GiiFile;
    onClose: () => void;
};

export function FilePreviewDialog(props: FilePreviewDialogProps) {
    const {onClose, file, open} = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth="md">
            <DialogTitle>{file.relativePath}</DialogTitle>
            <CodeHighlight language={file.type} code={file.content} />
        </Dialog>
    );
}
