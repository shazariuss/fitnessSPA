import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../../libs/supabase";
import { getProfile } from "../../profile/api";
import { getWorkouts, getMeals } from "../api";
import { getProgress, updateProgress } from "../../progress/api";
import WorkoutCard from "./WorkoutCard";
import MealCard from "./MealCard";
import ProgressChart from "../../progress/components/ProgressChart";

function Dashboard() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) navigate("/login");
        });
    }, [navigate]);

    const { data: profile, isLoading: profileLoading } = useQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
    });

    const { data: workouts, isLoading: workoutsLoading } = useQuery({
        queryKey: ["workouts", profile?.category],
        queryFn: () => getWorkouts(profile?.category),
        enabled: !!profile?.category,
    });

    const { data: meals, isLoading: mealsLoading } = useQuery({
        queryKey: ["meals", profile?.category],
        queryFn: () => getMeals(profile?.category),
        enabled: !!profile?.category,
    });

    const { data: progress = [], isLoading: progressLoading } = useQuery({
        queryKey: ["progress"],
        queryFn: getProgress,
    });

    const { mutate: updateProgressMutation } = useMutation({
        mutationFn: ({ week, completed }) => updateProgress(week, completed),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["progress"] }),
    });

    if (
        profileLoading ||
        workoutsLoading ||
        mealsLoading ||
        progressLoading ||
        !profile ||
        !workouts ||
        !meals
    ) {
        return <div className="text-center mt-10">Loading your plan...</div>;
    }

    const months = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
    ];

    const handleProgressToggle = (week) => {
        const current = progress.find((p) => p.week === week);
        const completed = current ? !current.completed : true;
        updateProgressMutation({ week, completed });
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6">
            <h1 className="text-3xl font-bold mb-6">
                Your 3-Month {profile.category.replace("_", " ")} Plan
            </h1>
            <ProgressChart progress={progress} />
            {months.map((month, index) => (
                <div key={index} className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">
                        Month {index + 1}
                    </h2>
                    {month.map((week) => (
                        <div key={week} className="mb-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-medium">
                                    Week {week}
                                </h3>
                                <button
                                    onClick={() => handleProgressToggle(week)}
                                    className={`px-3 py-1 rounded ${
                                        progress.find((p) => p.week === week)
                                            ?.completed
                                            ? "bg-green-500 text-white"
                                            : "bg-gray-300 text-gray-700"
                                    }`}
                                >
                                    {progress.find((p) => p.week === week)
                                        ?.completed
                                        ? "Completed"
                                        : "Mark Complete"}
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                <div>
                                    <h4 className="font-medium">Workout</h4>
                                    <WorkoutCard
                                        workout={workouts.find(
                                            (w) => w.week === week
                                        )}
                                    />
                                </div>
                                <div>
                                    <h4 className="font-medium">Meal</h4>
                                    <MealCard
                                        meal={meals.find(
                                            (m) => m.week === week
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Dashboard;
