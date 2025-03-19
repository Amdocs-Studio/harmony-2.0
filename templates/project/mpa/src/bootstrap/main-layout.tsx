import { Outlet } from 'react-router';
import { Navbar } from '@navbar';
import { FeedbackHandler } from '@feedback-handler';
import '../modules/project-name-base-styles/src/styles/style.css';

export default function MainLayout() {
	return (
		<div>
			<Navbar />
			<main>
				<Outlet />
			</main>
			<FeedbackHandler />
		</div>
	);
}
