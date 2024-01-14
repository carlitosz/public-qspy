import React from 'react'
import ExclamationTriangleIcon from '@heroicons/react/24/solid/ExclamationTriangleIcon'

export type AlertType = 'danger' | 'success'

interface AlertProps {
    message?: string
    title: string
    type: AlertType
}

const Alert = ({ message, title, type }: AlertProps): JSX.Element => {
    return (
        <div className={`p-4 border border-${type} rounded-md bg-component`} role="alert">
            <div className={`flex items-center text-${type}`}>
                <ExclamationTriangleIcon className="icon-sm mr-2" />
                <span className="sr-only">{title}</span>
                <h3 className="text-lg font-medium">{title}</h3>
            </div>
            {message && <div className={`my-4 text-sm text-${type}`}>{message}</div>}
        </div>
    )
}

export default Alert
