import React, {PropsWithChildren} from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './app/store';
import App from './App';
import './index.css';
import {BrowserRouter, useNavigate} from "react-router-dom";
import {Auth0Provider, Auth0ProviderOptions} from '@auth0/auth0-react';

const container: HTMLElement | null = document.getElementById('root');

if (!container) {
    throw new Error("Root container not found");
}

const Auth0ProviderWithRedirectCallback = ({
    children,
    ...props
}: PropsWithChildren<Auth0ProviderOptions>) => {
    const navigate = useNavigate();

    const onRedirectCallback = () => {
        const path = localStorage.getItem('previousPath');
        localStorage.removeItem('previousPath');
        navigate(path? path : window.location.origin);
    };

    return (
        <Auth0Provider onRedirectCallback={onRedirectCallback} {...props}>
            {children}
        </Auth0Provider>
    );
};

const root = createRoot(container);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Auth0ProviderWithRedirectCallback
                    domain={process.env.REACT_APP_AUTH0_DOMAIN as string}
                    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID as string}
                    authorizationParams={{
                        redirect_uri:window.location.origin,
                        audience: process.env.REACT_APP_AUTH0_AUDIENCE as string
                    }} 
                >
                    <App/>
                </Auth0ProviderWithRedirectCallback>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);