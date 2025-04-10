function MealCard({ meal }) {
    if (!meal) {
        return (
            <div className="p-4 text-gray-500">
                No meal available for this week.
            </div>
        );
    }

    return (
        <div className="p-4 bg-white rounded-lg shadow mb-4">
            <h3 className="text-lg font-semibold">{meal.title}</h3>
            <p className="text-gray-600">{meal.description}</p>
        </div>
    );
}

export default MealCard;
