import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { currency } from "utils/FormatCurrency"
import { Link, useHistory } from 'react-router-dom';
import { API_URL } from 'actions/constants/constants'
import { deleteItemInCart, getCartInfo, getDetailCart, updateQuantityItem, checkQuantityItemInCart, selectedItemToOrder } from 'actions/services/CartActions'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"; import Loading from 'components/Loading/Loading';
import useTimeout from 'hooks/useTimeout';
;

function CartPage(props) {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart);
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    const handleDeleteItem = (product_id) => {
        deleteItemInCart(product_id)
            .then((res) => {
                toast.info(res.message, {
                    position: "bottom-center",
                    theme: 'dark',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(getCartInfo())
                dispatch(getDetailCart());
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleUpdateItem = (item, quantity) => {
        const data = {
            cart_details: [{
                product_id: item?.product_id,
                quantity
            }]
        }
        // dispatch(updateQuantityItem(data))
        updateQuantityItem(data)
            .then((res) => {
                if (res.message !== "SUCCESS") {
                    toast.info(res.message, {
                        position: "bottom-center",
                        theme: 'dark',
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                dispatch(getCartInfo())
                dispatch(getDetailCart());
            })
            .catch((err) => {
                toast.warning(err, {
                    position: "bottom-center",
                    theme: 'dark',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    }

    const token = localStorage.getItem('token');

    const checkQuantity = () => {
        checkQuantityItemInCart(cart)
            .then((res) => {
                if (res.message === "SUCCESS") {
                    history.push("/checkout/payment")
                } else {
                    toast.info(res.message, {
                        position: "bottom-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
            .catch(() => {
                toast.error('Thao tác không thành công!', {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    }

    useEffect(() => {

        document.title = "Giỏ hàng "

        if (token) {
            dispatch(getDetailCart())
        } else {
            props.history.push('/login');
        }
    }, [dispatch, props.history, token])

    const handleCheckedItemToOrder = (id) => {
        selectedItemToOrder(id)
            .then(() => dispatch(getDetailCart()))
            .catch(err => console.log(err))
            
    }

    useTimeout(() => setLoading(false), loading ? 1000 : null);

    return (
        <>
            <div className="row sm-gutter section__content">
                <div className="col l-12 m-12 c-12">
                    <div className="home-product">
                        <div className="bkMhdM">
                            <h4 className="productsV2__title">Giỏ hàng</h4>
                            {
                                loading ? <Loading /> : (
                                    <>
                                        {
                                            cart?.cart_details && cart?.cart_details.length > 0 ? (
                                                <div className="row sm-gutter">
                                                    <div className="col l-9 m-12 c-12">
                                                        <div className="productsV2-heading">
                                                            <div className="row">
                                                                <div className="col-1">
                                                                    <label className="kKoWwZ">
                                                                        <span className="label">{cart?.items_count} sản phẩm</span>
                                                                    </label>
                                                                </div>
                                                                <div className="col-2">Đơn giá</div>
                                                                <div className="col-3">Số lượng</div>
                                                                <div className="col-4">Thành tiền</div>
                                                                <div className="col-5">

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="productsV2-content">
                                                            <div className="infinite-scroll-component " style={{ height: 'auto', overflow: 'auto' }}>
                                                                <div className="jfwAio">
                                                                    <div className="sellers">
                                                                        <ul className="fhrjkV">
                                                                            {
                                                                                cart?.cart_details.map((item, index) => {
                                                                                    return (
                                                                                        <li className="iMeYki" key={index}>
                                                                                            <div className="row">
                                                                                                <div className="col-1">
                                                                                                    <div className="intended__images">
                                                                                                        <div className="intended__checkbox">
                                                                                                            <label className="intended__checkbox-label">
                                                                                                                <input type="checkbox" readOnly checked={item.selected === 1} />
                                                                                                                <span className="checkbox-fake" onClick={() => handleCheckedItemToOrder(item.product_id)}></span>
                                                                                                            </label>
                                                                                                        </div>
                                                                                                        <Link className="intended__img" to={`/san-pham/${item.product_id}/${item.slug}`}>
                                                                                                            <img src={item.mainImage} alt="" />
                                                                                                        </Link>
                                                                                                        <div className="intended__content">
                                                                                                            <Link className="intended__name" to={`/san-pham/${item.product_id}/${item.slug}`}>
                                                                                                                {item.name}
                                                                                                            </Link>
                                                                                                            <span className="intended__not-bookcare">{item?.category.name}</span>
                                                                                                            <span className="intended__not-bookcare">{item?.brand.name}</span>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="col-2">
                                                                                                    <span className="intended__real-prices">{currency(item.price)}</span>
                                                                                                    <del className="intended__discount-prices">{currency(item.list_price)}</del>
                                                                                                </div>
                                                                                                <div className="col-3">
                                                                                                    <div className="intended-qty">
                                                                                                        <div className="bcFTqg">
                                                                                                            <span className="qty-decrease" onClick={() => handleUpdateItem(item, item.quantity - 1)}>
                                                                                                                <img src='data:image/png;base64,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' alt="decrease" />
                                                                                                            </span>
                                                                                                            <input
                                                                                                                type="tel"
                                                                                                                className="qty-input"
                                                                                                                readOnly
                                                                                                                value={item.quantity}
                                                                                                            />
                                                                                                            <span className="qty-increase" onClick={() => handleUpdateItem(item, item.quantity + 1)}>
                                                                                                                <img src="https://static.thenounproject.com/png/1649999-200.png" alt="increase" />
                                                                                                            </span>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="col-4">
                                                                                                    <span className="intended__final-prices">{currency(item.quantity * item.price)}</span>
                                                                                                </div>
                                                                                                <div className="col-5">
                                                                                                    <span className="intended__delete" onClick={() => handleDeleteItem(item.product_id)}>
                                                                                                        <img src="https://cdn-icons-png.flaticon.com/512/2891/2891491.png" alt="deleted" />
                                                                                                    </span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </li>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col l-3 m-3 c-12">
                                                        <div className="cart-total">
                                                            <div className="cart-total-prices">
                                                                <div className="cart-total-prices__inner">
                                                                    <div className="etSUOP">
                                                                        <div className="prices">
                                                                            <ul className="prices__items">
                                                                                <li className="prices__item">
                                                                                    <span className="prices__text">Tạm tính</span>
                                                                                    <span className="prices__value">{currency(cart?.total_price)}</span>
                                                                                </li>
                                                                                <li className="prices__item">
                                                                                    <span className="prices__text">Giảm giá</span>
                                                                                    <span className="prices__value">0đ</span>
                                                                                </li>
                                                                            </ul>
                                                                            <p className="prices__total">
                                                                                <span className="prices__text">Tổng cộng</span>
                                                                                <span className="prices__value prices__value--final">{currency(cart?.total_price)}
                                                                                    <i></i>
                                                                                </span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="group-button">
                                                                        <Link to="#" onClick={checkQuantity} className="btn btn-add-to-cart">Mua Hàng</Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="no-cart">
                                                    <img src={`${API_URL}/images/no-cart.png`} alt="" className="no-cart__img" />
                                                    <p className="no-cart__note">Không có sản phẩm nào trong giỏ hàng của bạn.</p>
                                                    <Link to="/" className="no-cart__btn">Tiếp tục mua sắm</Link>
                                                </div>
                                            )
                                        }
                                    </>

                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CartPage;