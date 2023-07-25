import React, { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

export default function Form() {
	const { dispatch } = useWorkoutsContext();

	const [title, setTitle] = useState('');
	const [reps, setReps] = useState('');
	const [load, setLoad] = useState('');
	const [error, setError] = useState(null);

	const [emptyFields, setEmptyFields] = useState([]);

	async function handleSubmit(e) {
		e.preventDefault();

		const workout = { title, reps, load };

		const response = await fetch('http://localhost:4000/api/workouts', {
			method: 'POST',
			body: JSON.stringify(workout),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const json = await response.json();

		if (!response.ok) {
			setError(json.error);
			setEmptyFields(json.emptyFields);
		}
		if (response.ok) {
			setError(null);
			setEmptyFields([]);
			setTitle('');
			setReps('');
			setLoad('');
			console.log('New workout added', json);
			dispatch({ type: 'CREATE_WORKOUT', payload: json });
		}
	}

	return (
		<form action="" onSubmit={handleSubmit} className="flex flex-col">
			<h2 className="mb-4">Add exercises</h2>
			<label htmlFor="title">Title</label>
			<input
				type="text"
				id="title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				className={`mb-4 px-2 py-2 rounded-md ${
					emptyFields.includes('title') ? 'outline outline-red-500' : ''
				}`}
			/>
			<label htmlFor="reps">Reps</label>
			<input
				type="number"
				id="reps"
				value={reps}
				onChange={(e) => setReps(e.target.value)}
				className={`mb-4 px-2 py-2 rounded-md ${
					emptyFields.includes('reps') ? 'outline outline-red-500' : ''
				}`}
			/>
			<label htmlFor="load">Load</label>
			<input
				type="text"
				id="load"
				value={load}
				onChange={(e) => setLoad(e.target.value)}
				className={`mb-4 px-2 py-2 rounded-md ${
					emptyFields.includes('load') ? 'outline outline-red-500' : ''
				}`}
			/>
			<button onClick={handleSubmit} className="px-4 py-2 rounded-md bg-green-900 text-white">
				Add
			</button>
			{error && (
				<span className=" py-2 text-center mt-3 bg-red-100 border border-red-500 rounded-md text-red-500">
					{error}
				</span>
			)}
		</form>
	);
}
