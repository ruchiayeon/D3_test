interface DataPoint {
    date: string;
    count: number;
}

interface BarChartProps {
    data: DataPoint[];
}

export type { DataPoint, BarChartProps };
