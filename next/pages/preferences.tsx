import React from 'react'
import MoonIcon from '@heroicons/react/24/outline/MoonIcon'
import ChartBarSquareIcon from '@heroicons/react/24/outline/ChartBarSquareIcon'

import Page from '@/components/Layout/Page'
import Tabs from '@/components/Tabs/Tabs'
import ThemeTab from '@/components/Tabs/Content/ThemeTab'

import type { NextPage } from 'next'

const Preferences: NextPage = (): JSX.Element => {
    return (
        <Page title="QSpy" heading="Preferences">
            <Tabs
                id="preferences"
                hash="#preferences"
                tabs={[
                    {
                        icon: <ChartBarSquareIcon className="tab-icon-sm" />,
                        id: 'chart',
                        hash: '#chart',
                        content: <div>Chart content</div>,
                        label: 'Chart'
                    },
                    {
                        icon: <MoonIcon className="tab-icon-sm" />,
                        id: 'theme',
                        hash: '#theme',
                        content: <ThemeTab />,
                        label: 'Theme'
                    }
                ]}
            />
        </Page>
    )
}

export default Preferences
