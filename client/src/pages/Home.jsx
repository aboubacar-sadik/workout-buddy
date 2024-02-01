import React, { useEffect, useState } from 'react';
import Workout from '../components/Workout';
import Form from '../components/Form';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

export default function Home() {
	const { workouts, dispatch } = useWorkoutsContext();
	useEffect(() => {
		async function getWorkouts() {
			const response = await fetch('http://localhost:4000/api/workouts');
			const json = await response.json();

			if (response.ok) {
				dispatch({ type: 'SET_WORKOUTS', payload: json });
			}
		}

		getWorkouts();
	}, [dispatch]); // the function render once if the "[]" dependency array is empty
	return (
		<div className="container grid grid-cols-1 gap-20 my-20 md:grid-cols-2 lg:grid-cols-3">
			<div className="container flex flex-col col-span-1 gap-8 lg:col-span-2">
				{/* {workouts && workouts.map((workout, i) => <Workout key={i} workout={workout} />)} */}
				{workouts && workouts.length > 0 ? (
					workouts.map((workout, i) => <Workout key={i} workout={workout} />)
				) : (
					<div className="flex items-center justify-center h-full text-3xl uppercase">
						Nothing to show
					</div>
				)}
			</div>
			<div>
				<Form />
			</div>
		</div>
	);
}
