import useSWR, { SWRConfiguration, SWRResponse } from 'swr'
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_GATEWAY || ''
axios.defaults.headers.common['x-api-key'] = process.env.NEXT_PUBLIC_API_KEY || ''

export type Request = AxiosRequestConfig | null

interface Return<Data, Error>
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

interface ServerErrorResponse {
    data: {
        error: {
            message: string
        }
    }
}

export const getErrorMessage = (error: Error): string => {
    if (axios.isAxiosError(error)) {
        const { code } = error

        // No status? This sucks. Return a generic message.
        if (!code) {
            return 'No status code returned. Something really bad happened.'
        }

        const { response } = error

        // No response? At least we have a status code.
        if (!response) {
            return `Failed to fetch data with status code: ${code}`
        }

        const { data } = response as ServerErrorResponse

        // We got server data and a status code
        return data.error.message
    }

    return 'Everything failed'
}
