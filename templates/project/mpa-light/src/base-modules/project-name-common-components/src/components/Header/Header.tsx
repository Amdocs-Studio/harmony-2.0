import { Button } from '../Button';
import './header.css';

type User = {
  name: string;
};

export interface HeaderProps {
  user?: User;
  onLogin: () => void;
  onLogout: () => void;
  onBackToHome: () => void;
  onCreateAccount: () => void;
}

export const Header = ({
	user,
	onLogin,
	onLogout,
	onCreateAccount,
	onBackToHome
}: HeaderProps) => (
	<header>
		<div className="storybook-header">
			<div role="button" tabIndex={0} onClick={() => onBackToHome()}>
				<svg width="36" height="32" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect x="-0.746094" y="2.54688" width="8" height="30" rx="4" transform="rotate(-15 -0.746094 2.54688)" fill="#131318"/>
					<rect x="14" y="12" width="8" height="8" rx="4" fill="#131318"/>
					<rect x="21.2539" y="2.54688" width="8" height="30" rx="4" transform="rotate(-15 21.2539 2.54688)" fill="#131318"/>
				</svg>
				<h1>Amdocs Harmony 2.0</h1>
			</div>
			<div>
				{user ? (
					<>
						<span className="welcome">
							Welcome, <b>{user.name}</b>!
						</span>
						<Button size="small" onClick={onLogout} label="Log out" />
					</>
				) : (
					<>
						<Button size="small" onClick={onLogin} label="Log in" />
						<Button
							primary
							size="small"
							onClick={onCreateAccount}
							label="Sign up"
						/>
					</>
				)}
			</div>
		</div>
	</header>
);
