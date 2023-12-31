import { WorkoutContext } from "../context/WorkoutContext";
import { useContext } from "react";

export function useWorkoutsContext() {
    const context = useContext(WorkoutContext)

    if (!context) {
        throw Error('useWorkoutsContext must be used in an WorkoutsContextProvider')
    }

    return context
}