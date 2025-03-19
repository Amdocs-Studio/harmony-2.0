import { ShoppingCartProps } from './ShoppingCart.types';
import { ShoppingCartProvider } from './ShoppingCart.provider';
import ShoppingCartMain from './components/ShoppingCart.main';
import './styles/index.css';

export default function ShoppingCart(props: ShoppingCartProps) {
	return (
		<ShoppingCartProvider {...props}>
			<ShoppingCartMain />
		</ShoppingCartProvider>
	);
}