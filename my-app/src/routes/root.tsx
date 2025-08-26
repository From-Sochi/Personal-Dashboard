import { Link, Outlet } from 'react-router-dom';
import { getTasks } from '../forStorage'

export async function loader() {
	const tasks = await getTasks();
	return { tasks };
}

function Root() {
	return (
		<>
			<nav>
				<Link to={`/dashboard/1`}>Dashboard</Link>
				<Link to={`/tasks/2`}>Tasks</Link>
				<Link to={`/timer/3`}>Timer</Link>
				<Link to={`/nutrition/4`}>Nutrition</Link>
			</nav>

			{/* Это место где будут рендериться дочерние компоненты */}
			<main>
				<Outlet />
			</main>
		</>
	);
}

export default Root;