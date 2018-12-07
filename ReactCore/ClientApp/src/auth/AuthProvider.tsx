import * as React from 'react';

import RestUtilities, { IRestResponse } from '../services/RestUtilities';

import { AuthContext, IAuthState } from './AuthContext';

export class AuthProvider extends React.Component<any, IAuthState> {

    constructor(props: any) {
        super(props);

        this.state = {
            isSignedIn: false,

            login: this.login.bind(this),

            logout: this.logout.bind(this),
        };

    }

    public render(): JSX.Element {
        return (
            <AuthContext.Provider value={{ authContext: { ...this.state } }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }


    private login(username: string): Promise<IRestResponse<boolean>> {
        const data = `username=${username}`;

        return RestUtilities.post<boolean>('/api/auth/login', data)
            .then((response: IRestResponse<boolean>) => {
                if (!response.is_error && response.content !== undefined) {
                    const newState = { ...this.state, isSignedIn: response.content };
                    this.setState(newState);
                }
                return response;
            });
    }

    private logout(): void {
        const newState = { ...this.state, isSignedIn: false };
        this.setState(newState);
    }
}
