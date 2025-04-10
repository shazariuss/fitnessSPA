import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

function ProgressChart({ progress }) {
    // Create data for all 12 weeks, defaulting to 0 (incomplete)
    const data = Array.from({ length: 12 }, (_, i) => ({
        week: i + 1,
        completed: progress.find((p) => p.week === i + 1)?.completed ? 1 : 0,
    }));

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data}>
                    <XAxis
                        dataKey="week"
                        label={{
                            value: "Week",
                            position: "insideBottom",
                            offset: -5,
                        }}
                    />
                    <YAxis hide domain={[0, 1]} />
                    <Tooltip
                        formatter={(value) =>
                            value === 1 ? "Completed" : "Incomplete"
                        }
                    />
                    <Bar dataKey="completed" fill="#3b82f6" />
                </BarChart>
            </ResponsiveContainer>
            <p className="text-sm text-gray-600 mt-2">
                Completed: {progress.filter((p) => p.completed).length} / 12
                weeks
            </p>
        </div>
    );
}

export default ProgressChart;
