import { Outlet } from 'react-router';
import { Navbar } from '@navbar';
import { FeedbackHandler } from '@feedback-handler';
import '../modules/base-styles/styles/style.css';

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
