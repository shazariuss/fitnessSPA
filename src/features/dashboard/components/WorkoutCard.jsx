function WorkoutCard({ workout }) {
    if (!workout) {
        return (
            <div className="p-4 text-gray-500">
                No workout available for this week.
            </div>
        );
    }

    return (
        <div className="p-4 bg-white rounded-lg shadow mb-4">
            <h3 className="text-lg font-semibold">{workout.title}</h3>
            <p className="text-gray-600">{workout.description}</p>
            <a
                href={workout.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
            >
                Watch Tutorial
            </a>
        </div>
    );
}

export default WorkoutCard;
