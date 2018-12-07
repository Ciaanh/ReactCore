import * as React from "react";
import { IRestResponse } from "../services/RestUtilities";

export interface IAuthResponse {
    token: string;
}

export interface IAuthState {
    isSignedIn: boolean;

    login: (username: string) => Promise<IRestResponse<IAuthResponse>>,

    logout: () => void,
}

export interface IAuthContext {
    authContext: IAuthState;
}

export const AuthContext = React.createContext<IAuthContext>(
    {
        authContext: {
            isSignedIn: false,
            login: () => new Promise((resolve, reject) => null),
            // tslint:disable-next-line:no-empty
            logout: () => { },
        }
    }
)

export const withAuth = <P extends object>(Component: React.ComponentType<P>) =>
    class WithAuth extends React.Component<P & IAuthContext> {
        public render(): JSX.Element {
            return (
                <AuthContext.Consumer>
                    {(contexts) => <Component {...this.props} {...contexts} />}
                </AuthContext.Consumer>
            );
        }
    };
