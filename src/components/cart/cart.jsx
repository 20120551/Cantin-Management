import icons from './../../assets/icons';
import './../../assets/css/style.css';
import './cart.css';
import { useState } from 'react';
import { useCart } from './../../hooks';
import { cart } from './../../store/actions';
import { cartService } from './../../services';

function CartItem({ isApprove, cartItem }) {
    const {
        quantity,
        goods
    } = cartItem;
    const [product, setProduct] = useState(quantity);
    const [isUpdate, setIsUpdate] = useState(false);
    const [cartState, cartDispatch] = useCart();

    const increaseQuantity = () => {
        const increase = product + 1;
        if (increase > goods.product) {
            return console.log('Your goods quantity greater than our product on selling');
        }
        setProduct(product + 1);
    }
    const decreaseQuantity = () => {
        const decrease = product - 1;
        if (decrease < 0) {
            return console.log('Your goods quantity less than 0');
        }
        setProduct(product - 1);
    }
    const updateGoodsOnCart = () => {
        if (isUpdate && product !== quantity) {
            const payload = {
                goodsId: goods._id,
                quantity: product
            }
            cartService.updateGoodsOnCart(payload)
                .then((response) => cartDispatch(cart.updateGoodsOnCart(response)))
                .catch(err => console.log(err))
        }
        setIsUpdate(!isUpdate);
    }
    const deleteGoodsFromCart = () => {
        cartService.removeGoodsFromCart({ goodsId: goods._id })
            .then((response) => cartDispatch(cart.removeGoodsFromCart(response)))
            .catch(err => console.log(err))
    }
    return (
        <div className="cart-item">
            <img src="data:image/jpeg;base64,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" />
            <h2 className="cart-item__product">{goods.name}:
                <span className="cart-item__price">{goods.price}VND</span>
            </h2>
            <h2 className="cart-item__quantity">Số lượng:
                <span>
                    {product}
                </span>
                {!isApprove && isUpdate
                    ? <div className="quantity">
                        <img
                            className="up-quantity"
                            src={icons.angleUp}
                            alt="Up icon"
                            onClick={increaseQuantity}
                        />
                        <img
                            className="down-quantity"
                            src={icons.angleDown}
                            alt="Down icon"
                            onClick={decreaseQuantity}
                        />
                    </div>
                    : <></>
                }
            </h2>
            <h2 className="cart-item__totalPrice">Thành tiền:
                <span>{goods.price * product}VND</span>
            </h2>
            {!isApprove
                ? <div className="cart-item__btn">
                    <button
                        className={isUpdate ? "btn cart-btn__edit edit" : "btn cart-btn__edit"}
                        onClick={updateGoodsOnCart}
                    >
                        <img src={isUpdate ? icons.success : icons.edit} alt="Edit icon" />
                    </button>
                    <button
                        className="btn cart-btn__delete"
                        onClick={deleteGoodsFromCart}
                    >
                        <img src={icons.trash} alt="Trash icon" />
                    </button>
                </div>
                : <></>
            }
        </div>
    )
}

export default CartItem;