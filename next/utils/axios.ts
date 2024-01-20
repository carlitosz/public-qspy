import useSWR, { SWRConfiguration, SWRResponse } from 'swr'
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_GATEWAY || ''
axios.defaults.headers.common['x-api-key'] = process.env.NEXT_PUBLIC_API_KEY || ''

export type Request = AxiosRequestConfig | null

export interface Return<Data, Error>
    extends Pick<SWRResponse<AxiosResponse<Data>, AxiosError<Error>>, 'isValidating' | 'error' | 'mutate'> {
    data: Data | undefined
    response: AxiosResponse<Data> | undefined
}

export interface Config<Data = unknown, Error = unknown>
    extends Omit<SWRConfiguration<AxiosResponse<Data>, AxiosError<Error>>, 'fallbackData'> {
    fallbackData?: Data
}

export const useRequest = <Data = unknown, Error = unknown>(
    request: Request,
    { fallbackData, ...config }: Config<Data, Error> = {}
): Return<Data, Error> => {
    const {
        data: response,
        error,
        isValidating,
        mutate
    } = useSWR<AxiosResponse<Data>, AxiosError<Error>>(request, () => axios.request<Data>(request!), {
        ...config,
        fallbackData:
            fallbackData &&
            ({
                status: 200,
                statusText: 'InitialData',
                config: request!,
                headers: {},
                data: fallbackData
            } as AxiosResponse<Data>)
    })

    return {
        data: response && response.data,
        response,
        error,
        isValidating,
        mutate
    }
}

export const getErrorMessage = (error: Error): { code: string; message: string } => {
    let code = 'UNKNOWN_CODE'
    let message = 'An unknown error has occurred.'

    if (axios.defaults.baseURL === '') {
        return {
            code: '',
            message: 'Missing API_GATEWAY in .env configuration'
        }
    }

    if (axios.defaults.headers.common['x-api-key'] === '') {
        return {
            code: '',
            message: 'Missing API_KEY in .env configuration'
        }
    }

    if (axios.isAxiosError(error)) {
        if ('code' in error) {
            code = error.code
        }

        if ('message' in error) {
            message = error.message
        }
    }

    return { code, message }
}
