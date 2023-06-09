import {PaletteMode, ThemeProvider, createTheme, useMediaQuery} from '@mui/material';
import {LinkProps} from '@mui/material/Link';
import React, {PropsWithChildren} from 'react';
import {Link as RouterLink, LinkProps as RouterLinkProps} from 'react-router-dom';

const LinkBehavior = React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'> & {href: RouterLinkProps['to']}>(
    (props, ref) => {
        const {href, ...other} = props;

        if (typeof href !== 'string' || href === '#') {
            return <a href={'#'} ref={ref} {...other} />;
        }

        if (href.startsWith('http://') || href.startsWith('https://')) {
            return <a href={href} ref={ref} {...other} />;
        }

        // Map href (MUI) -> to (react-router)
        return <RouterLink ref={ref} to={href} {...other} />;
    },
);

export const DefaultThemeProvider = ({children}: PropsWithChildren) => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const mode: PaletteMode = prefersDarkMode ? 'dark' : 'light';

    const theme = createTheme({
        palette: {
            mode: mode,
            primary: {
                main: '#00617B',
            },
            secondary: {
                main: '#873C00',
            },
        },
        components: {
            MuiLink: {
                defaultProps: {
                    component: LinkBehavior,
                } as LinkProps,
            },
            MuiButtonBase: {
                defaultProps: {
                    LinkComponent: LinkBehavior,
                },
            },
        },
    });

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
