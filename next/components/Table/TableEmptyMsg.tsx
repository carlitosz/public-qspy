import React from 'react'

const TableEmptyMsg = (): JSX.Element => {
    return (
        <div className="flex flex-col items-center justify-center py-6">
            <p className="text-danger text-xl">Uh-oh!</p>
            <p className="text-text text-md mb-4">We have nothing to display.</p>
            <div className=" p-8 h-full w-1/2 rounded-md">
                <p className="text-primary text-md font-semibold border-b border-border py-2">Possible reasons</p>
                <ol className="text-title list-disc my-2">
                    <li>Your queue is empty 🥳 Check again tomorrow!</li>
                    <li>
                        Your queue has not been processed today. If you want to manually process your queue, follow the
                        instructions here.
                    </li>
                </ol>
            </div>
        </div>
    )
}

export default TableEmptyMsg
