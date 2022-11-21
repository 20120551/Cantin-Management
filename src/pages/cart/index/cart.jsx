import { CartItem } from './../../../components';
import './cart.css';
import './../../../assets/css/style.css';
import { useCart } from './../../../hooks';
import { cart } from './../../../store/actions';
import { cartService } from './../../../services';
import { useEffect } from 'react';


function Cart() {
    const [cartState, cartDispath] = useCart();
    useEffect(() => {
        // call api lấy cart items
        // cartService.addGoodsToCart({
        //     goodsId: '636f626d59663e1c3d1b6918',
        //     quantity: 10
        // })
        //     .then((response) => cartDispath(cart.addGoodsToCart(response)))
        //     .catch(err => console.log(err))

        cartService.getAllGoodsOnCart()
            .then((response) => cartDispath(cart.getAllGoodsOnCart(response)))
            .catch((err) => console.log(err))
    }, [])
    return (
        <div id="cart">
            {cartState.length === 0
                ? <>
                    Cart trống
                </>
                : <>
                    {cartState?.map((cartItem) =>
                        <CartItem
                            key={cartItem.goods._id}
                            cartItem={cartItem}
                        />)
                    }
                    <div className="cart-btn">
                        <button className="back-btn">Tiếp tục mua</button>
                        <button className="pay-btn">Thanh toán</button>
                    </div>
                </>
            }

        </div>
    )
}

export default Cart;