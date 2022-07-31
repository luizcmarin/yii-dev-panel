import * as React from 'react';
import {useEffect, useState} from 'react';
import {Outlet} from "react-router";
import {Autocomplete, TextField} from "@mui/material";
import {useGetDebugQuery} from "../../API/Debug";
import format from 'date-fns/format'
import {fromUnixTime} from "date-fns";
import {useDispatch} from "react-redux";
import {changeEntryAction} from "../../Provider/Debug/DebugEntryContext";

function formatDate(unixTimeStamp: number) {
    return format(fromUnixTime(unixTimeStamp), 'do MMM hh:mm:ss');
}

export const DebugLayout = () => {
    const dispatch = useDispatch()
    const {data, isLoading, isSuccess} = useGetDebugQuery('');
    const [selectedEntry, setSelectedEntry] = useState(null);

    useEffect(() => {
        if (isSuccess && data!.data && data!.data.length) {
            const entry = data!.data[0];
            setSelectedEntry(entry);
            dispatch(changeEntryAction(entry))
        }
    }, [isSuccess])

    if (isLoading) {
        return <>Loading..</>
    }
    function getOptions(entry: any) {
        if ('console' in entry) {
            return [formatDate(entry.console.request.startTime), entry.command.input].join(' ')
        }
        if ('web' in entry) {
            return [formatDate(entry.web.request.startTime), entry.request.method, entry.request.path].join(' ')
        }
        return entry.id
    }

    return (
        <>
            <Autocomplete
                freeSolo
                value={selectedEntry}
                options={data!.data}
                getOptionLabel={getOptions}
                renderInput={(params) => <TextField {...params} label="Record"/>}
                onChange={(event, value) => {
                    setSelectedEntry(value);
                    dispatch(changeEntryAction(value));
                }}
                sx={{my: 1}}
            />
            <Outlet/>
        </>
    );
};