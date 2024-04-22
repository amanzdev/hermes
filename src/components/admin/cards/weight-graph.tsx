import { VictoryBar } from 'victory';

const data = [
    {weight: 95, date: '2021-01-01'},
    {weight: 94, date: '2021-01-02'},
    {weight: 93, date: '2021-01-03'},
    {weight: 92, date: '2021-01-04'},
    {weight: 91, date: '2021-01-05'},
];

export default function WeightGraph() {
    return (
        <VictoryBar
            data={data}
            x="weight"
            y="date"
        />
    )
}