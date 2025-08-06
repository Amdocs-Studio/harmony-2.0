import { Outlet } from 'react-router';
import { NavbarDecorator } from '@ui-modules';
import { FeedbackHandler } from '@feedback-handler';
import '../base-modules/project-name-base-styles/src/style.css';

export default function MainLayout() {
	return (
		<div>
			<NavbarDecorator />
			<main>
				<Outlet />
			</main>
			<FeedbackHandler />
		</div>
	);
}
