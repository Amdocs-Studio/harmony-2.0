import { Outlet } from 'react-router';
import { Navbar } from '@ui-modules';
import { FeedbackHandler } from '@feedback-handler';
import '../base-modules/base-styles/style.css';

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
