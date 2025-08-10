import { useHomeHeroContext } from '../HomeHero.provider';
import RBATests from './RBATests';

export default function HomeHeroMain() {
	const { navigate } = useHomeHeroContext();
	return (
		<div
			className="relative h-[calc(100vh-63px)] w-full flex flex-col items-center justify-center overflow-hidden"
			style={{ backgroundImage: 'url(/pink-main-element.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
		>
			<div className="z-10 relative">
				<div className="max-w-3xl">
					<div className="flex items-center mb-4">
						<h1 className="text-5xl md:text-6xl font-bold  mb-6">
							Harmony 2.0
						</h1>
					</div>
					<p className="text-lg md:text-xl  dark:text-gray-200 mb-8 leading-relaxed">
						Harmony Boilerplate gives you the best developer experience with all the features you need for production based react redux: react routers & mobile rendering, TypeScript support, smart bundling, Redux TK, and more. No config needed.
					</p>
					<div className="flex items-center gap-4 justify-between">
						<button
							onClick={() => navigate('navigateToLogin')}
							className="px-6 py-3 bg-white text-primary-700 font-medium rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-primary-300"
						>
							Get started
						</button>
					</div>
				</div>
			</div>
			<RBATests />
		</div>
	);
}