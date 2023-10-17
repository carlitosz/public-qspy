import { ApexOptions } from 'apexcharts'
import { DomainEvent } from 'types'

export const createSeries = (data: DomainEvent[], name: string): ApexOptions['series'] => {
    return [
        {
            name,
            data: data.map((d: DomainEvent) => {
                var split = d.event.split('\\')
                const name: string = split.pop() ?? ''

                return { x: name, y: d.count }
            })
        }
    ]
}
