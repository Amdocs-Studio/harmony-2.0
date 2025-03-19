import { MiniCartLayoutProps } from './MiniCartLayout.types';
import { MiniCartLayoutProvider } from './MiniCartLayout.provider';
import MiniCartLayoutMain from './components/MiniCartLayout.main';
import './styles/index.css';

export default function MiniCartLayout(props: MiniCartLayoutProps) {
	const { children } = props;
	return (
		<MiniCartLayoutProvider {...props}>
			<MiniCartLayoutMain>
				{children}
			</MiniCartLayoutMain>
		</MiniCartLayoutProvider>
	);
}
