import { MiniCartLayoutProps } from './MiniCartLayout.types';
import { MiniCartLayoutProvider } from './MiniCartLayout.provider';
import './styles/index.css';

export default function MiniCartLayout(props: MiniCartLayoutProps) {
	return <MiniCartLayoutProvider {...props} />;
}