import React from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { formatDistanceToNow } from 'date-fns';

export default function Workout({ workout }) {
	const { dispatch } = useWorkoutsContext();

	async function handleClick() {
		const response = await fetch(`http://localhost:4000/api/workouts/${workout._id}`, {
			method: 'DELETE',
		});

		const json = await response.json();

		if (response.ok) {
			dispatch({ type: 'DELETE_WORKOUT', payload: json });
		}
	}
	return (
		<div className="p-4 rounded-lg bg-white flex flex-col items-start">
			<h2 className=" text-green-900 font-bold text-2xl mb-4">{workout.title}</h2>
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
				className="mt-4 text-xs bg-red-800 px-2 py-1 text-white rounded"
			>
				Delete
			</button>
		</div>
	);
}
