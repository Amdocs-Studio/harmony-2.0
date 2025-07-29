import { Button } from '@common-components';
import { useLoginContext } from '../Login.provider.tsx';
import { useState, FormEvent } from 'react';

export default function LoginMain() {
	const { login, navigate } = useLoginContext();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const handleLogin = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		login({ username, password }).then(() => navigate('/'));
	};
	return (
		<section className="bg-gray-100 dark:bg-gray-900">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[calc(100vh-63px)] lg:py-0">
				<a href="https://amdocs-studio.github.io/harmony-2.0" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
					<svg width="36" height="32" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect x="-0.746094" y="2.54688" width="8" height="30" rx="4" transform="rotate(-15 -0.746094 2.54688)" fill="#131318"/>
						<rect x="14" y="12" width="8" height="8" rx="4" fill="#131318"/>
						<rect x="21.2539" y="2.54688" width="8" height="30" rx="4" transform="rotate(-15 21.2539 2.54688)" fill="#131318"/>
					</svg>
					<h2 className="ml-2">Harmony 2</h2>
				</a>
				<div
					className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
				>
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Sign in to your account
						</h1>
						<form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
							<div>
								<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
									email</label>
								<input
									type="email"
									name="email"
									id="email"
									onChange={e => setUsername(e.target.value)}
									/* eslint-disable-next-line max-len */
									className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="name@company.com"
									required={true}
								/>
							</div>
							<div>
								<label
									htmlFor="password"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>Password</label>
								<input
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									onChange={e => setPassword(e.target.value)}
									/* eslint-disable-next-line max-len */
									className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required={true}
								/>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-start">
									<div className="flex items-center h-5">
										<input
											id="remember"
											aria-describedby="remember"
											type="checkbox"
											className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
										/>
									</div>
									<div className="ml-3 text-sm">
										<label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
									</div>
								</div>
								<a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot
									password?</a>
							</div>
							<Button
								type="submit"
								/* eslint-disable-next-line max-len */
								className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
							>
								Sign in
							</Button>
							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Don’t have an account yet? <a
									href="#"
									className="font-medium text-primary-600 hover:underline dark:text-primary-500"
								>Sign up
								</a>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
