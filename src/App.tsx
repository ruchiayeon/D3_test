import BarChart from "./BarChart";
import "./App.css";

interface DataPoint {
    name: string;
    value: number;
}

const App: React.FC = () => {
    const data: DataPoint[] = [
        { name: "A", value: 30 },
        { name: "B", value: 100 },
        { name: "C", value: 45 },
        { name: "D", value: 60 },
        { name: "E", value: 10 },
        { name: "F", value: 90 },
        { name: "G", value: 50 },
    ];

    return (
        <div>
            <BarChart data={data} />
        </div>
    );
};

export default App;
