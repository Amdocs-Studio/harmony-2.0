import { Button } from '@common-components';
import { useShoppingCartContext } from '../ShoppingCart.context';
import { Grid2, Typography } from '@mui/material';
import { CartItem } from '@sdk';

export default function ShoppingCartMain() {
	const { cartItems, onClearCart } = useShoppingCartContext();
	const totalPrice = cartItems?.reduce((sum, item) => sum + item.price, 0) ?? 0;
	return (
		<div
			className="hero bg-base-200 pb-[50px] pl-[20px]"
			style={{ minHeight: 'calc(100vh - 4rem)' }}
		>
			<div className="hero-content w-full flex-col lg:flex-row">
				<Typography variant="h1" component="h1">Your Cart</Typography>
				<Typography variant="h3" component="h3">Please review your cart below</Typography>
				<Grid2 container direction={'column'} className="mb-[30px] mt-[30px]">
					{cartItems?.map((item: CartItem, index: number) => (
						<Grid2 container sx={{ height: 'fit-content' }} key={index} className="max-w-[500px]">
							<Grid2 size={6} className="!w-[200px] !min-w-[200px] mr-[5px] p-[5px]">
								<Typography variant="body1">{item.name}</Typography>
							</Grid2>
							<Grid2 size={6} className="!w-[200px] !min-w-[200px] mr-[5px] p-[5px] flex justify-end">
								<Typography variant="body1">${item.price}</Typography>
							</Grid2>
						</Grid2>
					))}
					<Grid2 container sx={{ height: 'fit-content' }} className="max-w-[500px]">
						<Grid2 size={6} className="!w-[200px] !min-w-[200px] mr-[5px] p-[5px]">
							<Typography variant="h6">Total:</Typography>
						</Grid2>
						<Grid2 size={6} className="!w-[200px] !min-w-[200px] mr-[5px] p-[5px] flex justify-end">
							<Typography variant="h6">${totalPrice.toFixed(3)}</Typography>
						</Grid2>
					</Grid2>
					<Button onClick={onClearCart}>Clear cart</Button>
				</Grid2>
			</div>
		</div>
	);
}
