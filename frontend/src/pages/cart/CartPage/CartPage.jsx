import { useContext } from 'react';
import styled from 'styled-components';
import { Container } from '~/styles/styles';
import Breadcrumb from '~/components/common/Breadcrumb';
import CartTable from '~/components/cart/CartTable';
import { breakpoints } from '~/styles/themes/default';
import CartSummary from '~/components/cart/CartSummary';
import { CartContext } from '~/contexts/cart.context'; // Assuming you have a CartContext defined

const CartPageWrapper = styled.main`
    padding: 48px 0;
    margin-top: 100px;
    .breadcrumb-nav {
        margin-bottom: 20px;
    }
`;

const CartContent = styled.div`
    margin-top: 40px;
    grid-template-columns: 2fr 1fr;
    gap: 40px;

    @media (max-width: ${breakpoints.xl}) {
        grid-template-columns: 100%;
    }

    @media (max-width: ${breakpoints.sm}) {
        margin-top: 24px;
    }

    .cart-list {
        @media (max-width: ${breakpoints.lg}) {
            overflow-x: scroll;
        }
    }

    .cart-content-right {
        gap: 24px;

        @media (max-width: ${breakpoints.xl}) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media (max-width: ${breakpoints.md}) {
            grid-template-columns: 100%;
        }
    }
`;

const CartPage = () => {
    const { cart } = useContext(CartContext);

    const breadcrumbItems = [
        { label: 'Cá nhân', link: '/user/profile' },
        { label: 'Giõ hàng', link: '/' },
    ];

    return (
        <CartPageWrapper>
            <Container>
                <Breadcrumb items={breadcrumbItems} />
                <CartContent className="grid items-start">
                    <div className="cart-content-left">
                        <CartTable cartItems={cart?.cart_items} />
                    </div>
                    <div className="grid cart-content-right">
                        <CartSummary
                            totalDisplayPrice={cart?.total_display_price}
                            totalDiscountedPrice={cart?.total_discounted_price}
                        />
                    </div>
                </CartContent>
            </Container>
        </CartPageWrapper>
    );
};

export default CartPage;
