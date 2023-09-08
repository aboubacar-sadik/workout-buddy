import React from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { formatDistanceToNow } from 'date-fns';

export default function Workout({ workout }) {
	const { dispatch } = useWorkoutsContext();

	async function handleClick() {
		const response = await fetch(
			`https://workout-buddy-b2th.onrender.com/api/workouts/${workout._id}`,
			{
				method: 'DELETE',
			}
		);

		const json = await response.json();

		if (response.ok) {
			dispatch({ type: 'DELETE_WORKOUT', payload: json });
		}
	}
	return (
		<div className="flex flex-col items-start p-4 bg-white rounded-lg">
			<h2 className="mb-4 text-2xl font-bold text-green-900 ">{workout.title}</h2>
			<div className="flex items-center gap-3">
				<span className="font-bold">Reps:</span>
				<span>{workout.reps}</span>
			</div>
			<div className="flex items-center gap-3">
				<span className="font-bold">Loads (kg):</span>
				<span>{workout.load}</span>
			</div>
			<div>
				<span>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</span>
			</div>
			<button
				onClick={handleClick}
				className="px-2 py-1 mt-4 text-xs text-white bg-red-800 rounded"
			>
				Delete
			</button>
		</div>
	);
}
