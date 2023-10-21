import React from 'react'

interface ButtonProps {
    icon?: React.ReactElement
    text: string
}

const Button = ({ icon, text }: ButtonProps): JSX.Element => {
    return (
        <button
            className="inline-flex items-center bg-neutral-50 text-neutral-500 hover:text-indigo-600 p-1 border border-neutral-200 rounded hover:bg-neutral-100 hover:border-neutral-300 transition duration-150 ease-out hover:ease-in"
            type="button"
        >
            {icon && icon}
            <span className="text-xs font-semibold uppercase">{text}</span>
        </button>
    )
}

export default Button
