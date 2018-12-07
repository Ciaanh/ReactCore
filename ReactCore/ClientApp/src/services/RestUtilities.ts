export interface IErrorContent {
    error: string;
    error_description: string;
    [key: string]: string;
}

export interface IRestResponse<T> {
    is_error?: boolean;
    error_content?: IErrorContent,
    content?: T
};

export default class RestUtilities {

    public static get<T>(url: string): Promise<IRestResponse<T>> {
        return RestUtilities.request<T>('GET', url);
    }

    public static delete(url: string): Promise<IRestResponse<void>> {
        return RestUtilities.request<void>('DELETE', url);
    }

    public static put<T>(url: string, data: object | string): Promise<IRestResponse<T>> {
        return RestUtilities.request<T>('PUT', url, data);
    }

    public static post<T>(url: string, data: object | string): Promise<IRestResponse<T>> {
        return RestUtilities.request<T>('POST', url, data);
    }

    private static request<T>(method: string, url: string, data?: object | string): Promise<IRestResponse<T>> {

        // let isJsonResponse: boolean = false;
        let isBadRequest = false;
        let body = data;
        const headers = new Headers();

        headers.set('Accept', 'application/json');

        if (data) {
            if ((typeof data === 'object')) {
                headers.set('Content-Type', 'application/json');
                body = JSON.stringify(data);
            } else {
                headers.set('Content-Type', 'application/x-www-form-urlencoded');
            }
        }

        return fetch(url, {
            body: body as string,
            headers,
            method,
        }).then((response: any) => {
            if (response.status === 401) {
                // Unauthorized; redirect to sign-in
                window.location.replace(`/`);
            }

            isBadRequest = (response.status === 400);

            const responseContentType = response.headers.get("content-type");
            if (responseContentType && responseContentType.indexOf("application/json") !== -1) {
                // isJsonResponse = true;
                return response.json();
            } else {
                return response.text();
            }
        }).then((responseContent: any) => {
            const response: IRestResponse<T> = {
                content: isBadRequest ? null : responseContent,
                error_content: isBadRequest ? responseContent : null,
                is_error: isBadRequest
            };
            return response;
        });
    }
}
