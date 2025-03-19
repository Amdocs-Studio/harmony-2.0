import { Button, RBAC } from '@common-components';
import { useHomeContext } from '../Home.provider';

export default function HomeMain() {
	const { onStartBuyFlow, navigate } = useHomeContext();
	return (
		<div
			className="hero bg-base-200 pb-[50px] pl-[20px]"
			style={{ minHeight: 'calc(100vh - 4rem)' }}
		>
			<div className="hero-content w-full flex-col lg:flex-row">
				{/*<img src={logo} className="max-w-sm rounded-lg shadow-2xl" alt="logo" />*/}
				<div className="p-4">
					<h1 className="text-5xl font-bold">react-bp</h1>
					<p className="py-6">scalable react boilerplate</p>
					<RBAC id="bill_history_module">
						<div className="mb-3">This is an RBA test - visible</div>
					</RBAC>
					<RBAC id="shopping-blocked-message">
						<div>This is an RBA test - hidden</div>
					</RBAC>
					<RBAC id="add-new-line">
						<button className="border-2 p-2 mb-3 rounded" onClick={() => alert('Should be disabled')}>This is an RBA button - disabled</button>
					</RBAC>
					<RBAC id="asasa">
						<div>This is an RBA test - Not exist - should be hidden</div>
					</RBAC>
					<br/><br/>
					<Button onClick={() => navigate('/login')}>Get Started</Button>
					<br /><br />
					<Button onClick={onStartBuyFlow}>Start Shopping</Button>
				</div>
			</div>
		</div>
	);
}
