import { Link } from 'react-router-dom';

export default function Navbar() {
	return (
		<nav className="container max-w-1536 h-24 flex items-center justify-center bg-white">
			<Link to="/" className="uppercase">
				<h2>Workout Buddy</h2>
			</Link>
		</nav>
	);
}
