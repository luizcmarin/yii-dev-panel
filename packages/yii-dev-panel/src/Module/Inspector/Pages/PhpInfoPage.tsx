import * as React from "react";
import { useEffect, useRef } from "react";
import { useGetPhpInfoQuery } from "@yiisoft/yii-dev-panel/Module/Inspector/API/Inspector";
import { Box } from "@mui/material";

export const PhpInfoPage = () => {
    const getPhpInfoQuery = useGetPhpInfoQuery();
    const containerRef = useRef<HTMLDivElement>();

    useEffect(() => {
        if (getPhpInfoQuery.data) {
            const shadowContainer =
                containerRef.current?.shadowRoot ?? containerRef.current?.attachShadow({mode: 'open'});

            const shadowRootElement = document.createElement('div');
            shadowRootElement.innerHTML = getPhpInfoQuery.data || '';
            shadowContainer?.appendChild(shadowRootElement);
        }
    }, [getPhpInfoQuery.data]);

    return <>{!getPhpInfoQuery.isLoading && getPhpInfoQuery.data && <Box ref={containerRef} />}</>;
};
