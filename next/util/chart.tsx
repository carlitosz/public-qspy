import ApexCharts from 'apexcharts'

declare global {
    interface Window {
        Apex: {
            _chartInstances: [ChartInstance]
        }
    }
}

export interface ChartInstance {
    chart: ApexCharts
    group: string
    id: string
}

export const getChart = (title: string): ApexCharts | null => {
    if (window && window.Apex === undefined) return null

    const chartInstance: ChartInstance | undefined = window.Apex._chartInstances.find(
        (chart: ApexChart | undefined) => {
            if (chart && chart.id === title) return chart
        }
    )

    if (!chartInstance) {
        return null
    }

    const { chart }: { chart: ChartInstance['chart'] } = chartInstance

    return chart
}
