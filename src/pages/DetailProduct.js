import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import * as services from 'actions/services/ProductServices'
import { currency } from "utils/FormatCurrency"
import { Link, useHistory } from 'react-router-dom';
import { API_URL } from 'actions/constants/constants'
import { getCurrentUser } from 'actions/services/UserActions'
import { addViewedProduct, getListProductMostPopular, getListProductViewedByUser, getOneItem } from 'actions/services/ProductServices'
import { addLikeProduct, deleteProductLiked, getProductLiked } from 'actions/services/ProductServices'
import { getAllCommentByProductId } from 'actions/services/CommentServices'
import { getListRecommendForUser, getSimilarProduct } from 'actions/services/RecommendServices'
import { addProductToCart, getCartInfo } from 'actions/services/CartActions'
import "react-toastify/dist/ReactToastify.css";
import useTimeout from 'hooks/useTimeout';
import DetailProductSkeleton from 'components/Loading/DetailProductSkeleton';
import DetailsThumbnail from 'components/Item/DetailThumbnail';
import ProductTopSale from 'components/Item/ProductTopSale'
import ProductItemSkeleton from 'components/Item/ProductItemSkeleton';
import BrandProduct from 'components/Brand/BrandProduct';
import { toast } from 'react-toastify';

function DetailProduct(props) {

    const dispatch = useDispatch();
    const history = useHistory();
    const { match } = props;
    const [products, setProducts] = useState([]);
    const [topSale, setTopSale] = useState([]);

    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [index, setIndex] = useState(0);
    const [productLiked, setProductLiked] = useState(false);
    const [productViewed, setProductViewedd] = useState([]);
    const [mostPopularProduct, setMostPopularProduct] = useState([]);
    const [comments, setComments] = useState([]);
    const username = localStorage.getItem('username')
    const params = new URLSearchParams(window.location.search)
    const color = params.get('color') ? params.get('color') : '';
    const [similarProduct, setSimilarProduct] = useState([]);
    const [recommendList, setRecommendList] = useState([]);

    const getUser = useCallback(() => {
        dispatch(getCurrentUser())
    }, [dispatch])

    const myRef = React.createRef();

    const handleTab = index => {
        setIndex(index);
        const images = myRef.current.children;
        for (let i = 0; i < images.length; i++) {
            images[i].className = images[i].className.replace("active", "");
        }
        images[index].className = "active";
    };

    const addQuery = (key, value) => {
        let pathname = window.location.pathname;
        let searchParams = new URLSearchParams(window.location.search);
        searchParams.set(key, value);
        history.push({
            pathname: pathname,
            search: searchParams.toString(),
        });
    };

    const getComment = useCallback(() => {
        const id = match.params.id;
        getAllCommentByProductId(id)
            .then((res) => {
                setComments(res.data)
            })
            .catch(err => alert(err))
    }, [match.params.id]);

    const getTopSaleProduct = () => {
        services.topSaleProduct()
            .then(res => {
                setTopSale(res.data.content);
            })
            .catch(err => console.log(err))
    }


    useEffect(() => {
        const id = match.params.id;
        getOneItem(id, color)
            .then((res) => {
                setProduct(res.data);
                getSimilarProduct(res.data?.features.split(','), res.data?.category.code)
                    .then((res) => setSimilarProduct(res.data))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        getComment();
        if (username) {
            addViewedProduct({ productId: id })
                .then(() => { })
                .catch(() => { })
            getListProductViewedByUser()
                .then((res) => {
                    setProductViewedd(res)
                })
                .catch(() => setProductViewedd([]))
            getListRecommendForUser()
                .then((res) => {
                    setRecommendList(res)
                })
                .catch(() => setRecommendList([]))
            getProductLiked(id)
                .then((res) => {
                    if (res.data === true) {
                        setProductLiked(true)
                    }
                })
                .catch(() => setProductLiked(false))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [color, getComment, match.params.id, username])

    useEffect(() => {
        if (myRef.current) {
            myRef.current.children[index].className = "active";
        }
    }, [index, myRef])

    useEffect(() => {
        getUser();
        getTopSaleProduct();
    }, [getUser])

    useEffect(() => {
        getListProductMostPopular()
            .then(res => setMostPopularProduct(res.data))
            .catch(() => setMostPopularProduct([]))
    }, [product])

    useEffect(() => {
        document.title = product.name ? `${product?.name}` : "Thông tin sản phẩm"
    }, [product?.name])

    useTimeout(() => setLoading(false), loading ? 1000 : null);

    const handleAddToCart = () => {
        if (username) {
            const data = {
                cart_details: [{
                    product_id: product?.id,
                    quantity,
                    color: color
                }]
            }
            if (product?.in_stock > 0 && quantity <= product?.in_stock) {
                addProductToCart(data)
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
                    })
                    .catch((err) => {
                        toast.warning(err.response.data.message, {
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
        } else {
            props.history.push('/login')
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const displayComment = (numStar) => {
        let ratingStars = [];
        if (product) {
            for (let i = 0; i < 5; i++) {
                if (numStar === 5) {
                    ratingStars.push(<i key={i} className="fas fa-star" />)
                }
                else {
                    for (let j = 0; j < numStar; j++) {
                        ratingStars.push(<i key={j} className="fas fa-star" />);
                    }
                    for (let k = numStar; k < 5; k++) {
                        ratingStars.push(<i key={k} className="far fa-star" />);
                    }
                    break;
                }

            }
        }
        return ratingStars;
    }

    const displayStatusRating = (rating) => {
        let status = '';
        switch (rating) {
            case 5:
                status = "Cực kỳ hài lòng";
                break;
            case 4:
                status = "Hài lòng";
                break;
            case 3:
                status = "Bình thường";
                break;
            case 2:
                status = "Không hài lòng";
                break;
            case 1:
                status = "Rất không hài lòng";
                break;
            default:
                break;
        }
        return status;
    }

    const toggleLikeProduct = () => {
        if (username) {
            const data = {
                productId: product?.id,
            }
            if (productLiked) {
                deleteProductLiked(product?.id)
                    .then(() => setProductLiked(false))
                    .catch(() => alert("ERR"))
            } else {
                addLikeProduct(data)
                    .then(() => setProductLiked(true))
                    .catch(() => setProductLiked(false))
            }
        } else {
            props.history.push('/login');
        }

    }

    return (
        <>
            {!loading ? (
                <div className="row sm-gutter section__content">
                    <div className="breadcrumb">
                        <Link className="breadcrumb-item" to="/">Trang chủ</Link>
                        <Link className="breadcrumb-item" to={`/${product.category?.code}`}>
                            {product.category?.name}
                        </Link>
                        <Link className="breadcrumb-item" to={`/${product.category?.code}/${product.subcategory?.code}`}>{product.subcategory?.name}</Link>
                        <span className="breadcrumb-item">
                            <span>{product.name}</span></span>
                    </div>
                    <div className="col l-12 m-12 c-12">
                        <div className="product-info">
                            {/* ------   Grid -> Row -> Column  ------ */}
                            <div className="row sm-gutter section__item">
                                <div className="col l-5 m-4 c-12">
                                    <div className="left-thumbnail">
                                        {
                                            <img
                                                src={`${product.images[index]}`}
                                                alt=""
                                                style={{ width: '444px', height: '444px', objectFit: 'contain' }} />
                                        }
                                        <div className="list-img">
                                            <DetailsThumbnail images={product.images} tab={handleTab} myRef={myRef} />
                                        </div>
                                        <div className="left-bottom">
                                            <div className="share">
                                                
                                              
                                                <div className="like">
                                                    {/* {
                                                        productLiked
                                                            ?
                                                            <img src= "https://www.pngarts.com/files/9/YouTube-Like-Logo-PNG-Background-Image.png"  style={{width: "30px",height:"30px"}} onClick={toggleLikeProduct} alt="social-liked" />
                                                            :
                                                            <img src= "https://www.pngarts.com/files/9/YouTube-Like-Logo-PNG-Background-Image.png" style={{width: "30px",height:"30px"}} onClick={toggleLikeProduct} alt="social-like" />
                                                    } */}
                                                    {/* <p>{productLiked ? 'Đã thích' : 'Thích'}</p> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col l-7 m-6 c-12">
                                    <div className="product-detail">
                                        <h4 className="product-name">{product.name}</h4>
                                        <div className="product-detail-info">
                                            <p className="product-review"><span>{product?.review_count}</span> Đánh Giá</p>
                                            <p className="product-seller"><span>{product?.seller_count}</span> Đã Bán </p>
                                        </div>
                                    </div>
                                    <div className="product-detail-body">
                                        <div className="left">
                                            <p className="product-price">
                                                <span className="product-price__current-price">{currency(product.price)}</span>
                                                <span className="product-price__list-price">{currency(product.list_price)}</span>
                                                <span className="product-price__discount">{product.percent_discount}% giảm</span>
                                            </p>
                                            <div className="product_pick_color">
                                                <div className="prco_label">
                                                    Có <strong>{product?.inventories.length} Màu sắc</strong>.
                                                    Bạn đang chọn <strong>{color ? color : product?.inventories[0].color}</strong></div>
                                                <div className="color color_cover">
                                                    {
                                                        product?.inventories.map((item, index) => {
                                                            return (
                                                                <button
                                                                    key={index}
                                                                    className={`opt-var opt-var-97020 ${color === item.color || product?.inventories.length === 1 || (index === 0 && !color) ? 'active' : ''}`}
                                                                    title={item.color}
                                                                    onClick={() => addQuery('color', item.color)}
                                                                >
                                                                    <span>{item.color}</span>
                                                                    <input
                                                                        type="hidden" />
                                                                    <span className="prv-price">
                                                                        <span>{currency(product?.price)}</span>
                                                                    </span>
                                                                </button>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div id="info-1" className="collapse in">
                                                <div className="input-label">
                                                    <span>Số lượng</span>
                                                </div>

                                                <div className="group-input">
                                                    <button
                                                        className={quantity <= 1 ? 'disable' : ''}
                                                        disabled={quantity <= 1}
                                                        onClick={() => setQuantity(quantity - 1)}>
                                                        <img src= "data:image/png;base64,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" alt="remove-icon" width={20} height={20} />
                                                    </button>
                                                    <input
                                                        type="number"
                                                        min={1}
                                                        className="input"
                                                        pattern="^[1-9]\d*"
                                                        value={quantity <= 0 ? 1 : quantity >= product.in_stock ? product.in_stock : quantity}
                                                        onChange={(e) => setQuantity(parseInt(e.target.value) <= 1 ? 1 : parseInt(e.target.value) >= product.in_stock ? product.in_stock : parseInt(e.target.value))}
                                                    />
                                                    <button
                                                        onClick={() =>
                                                            setQuantity(quantity + 1)}
                                                        className={quantity >= product.in_stock ? 'disable' : ''}
                                                        disabled={quantity >= product.in_stock}>
                                                        <img src="https://static.thenounproject.com/png/1649999-200.png" alt="add-icon" width={20} height={20} />
                                                    </button>
                                                </div>
                                                <div className="input-label">
                                                    {
                                                        product.in_stock > 0 ? <span>{product.in_stock} sản phẩm có sẵn</span> : <span>Hết hàng</span>
                                                    }
                                                </div>
                                            </div>
                                            <div className="group-button">
                                                <button
                                                    className="btn btn-add-to-cart"
                                                    onClick={handleAddToCart}
                                                >Thêm vào giỏ hàng</button>
                                            </div>
                                        </div>
                                        <div className="right">
                                            <BrandProduct brand={product.brand} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                          
                            <div className="row sm-gutter section__item">
                                <div className="col l-12 m-12 c-12">
                                    <div className="home-product-category-item">
                                        <h3 className="home-product-title">
                                            Thông tin chi tiết
                                        </h3>
                                    </div>
                                </div>
                                <div className="col l-12 m-12 c-12">
                                    <div className="group">
                                        <div className="content has-table">
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>Thương hiệu</td>
                                                        <td>{product.brand?.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Xuất xứ thương hiệu</td>
                                                        <td>{product.brand?.madeIn}</td>
                                                    </tr>
                                                    {
                                                        product.product_specs.map((item, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{item.attributeName}</td>
                                                                    <td>{item.attributeValue}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row sm-gutter section__item">
                                <div className="col l-12 m-12 c-12">
                                    <div className="home-product-category-item">
                                        <h3 className="home-product-title">
                                            Mô tả sản phẩm
                                        </h3>
                                    </div>
                                </div>
                                <div className="col l-12 m-12 c-12">
                                    <div className="group">
                                        <div className="content" dangerouslySetInnerHTML={{ __html: product.description }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row sm-gutter section__item">
                                <div className="col l-12 m-12 c-12">
                                    <div className="home-product-category-item">
                                        <h3 className="home-product-title">
                                            Đánh giá, nhận xét từ khách hàng
                                        </h3>
                                    </div>
                                </div>
                                <div className="col l-12 m-12 c-12">
                                    {
                                        comments.length === 0 ? (
                                            <div className="customer-reviews__empty">
                                                <img src={`${API_URL}/images/star.png`} alt="" />
                                                <span>Chưa có đánh giá nào cho sản phẩm này</span>
                                            </div>
                                        ) :
                                            comments.map((item) => {
                                                return (
                                                    <div className="review-comment" key={item.id}>
                                                        <div className="review-comment__user">
                                                            <div className="review-comment__user-inner">
                                                                <div className="review-comment__user-avatar">
                                                                    <div className="has-character">
                                                                       
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="review-comment__user-name">{item.displayName}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style={{ flexGrow: 1 }}>
                                                            <div className="review-comment__rating-title">
                                                                <div className="review-comment__rating">
                                                                    {displayComment(item.rating)}
                                                                </div>
                                                                <span className="review-comment__title">
                                                                    {displayStatusRating(item.rating)}
                                                                </span>
                                                            </div>
                                                            <div className="review-comment__seller-name-attributes">
                                                                <div className="review-comment__seller-name">Thương hiệu<span className="review-comment__check-icon" />{product.brand?.name}</div>
                                                            </div>
                                                            <div className="review-comment__content">{item.content}</div>
                                                            <div className="review-comment__created-date">
                                                                <span>Nhận xét vào {item.date_comment}</span>
                                                            </div>
                                                           
                                                        </div>
                                                    </div>
                                                )
                                            })
                                    }
                                </div>
                            </div>
                            <div className="row sm-gutter section__item">
                                <div className="col l-12 m-12 c-12">
                                    <div className="home-product-category-item">
                                        <h3 className="home-product-title">
                                            Sản phẩm bán chạy nhất
                                        </h3>
                                    </div>
                                </div>
                                {
                                   
                                    loading ? <ProductItemSkeleton total={products.length} /> : <ProductTopSale products={topSale} />
                                }
                            </div>
                          
                           
                        </div>
                    </div>
                </div>
            ) : <DetailProductSkeleton />
            }
        </>
    )
}
export default DetailProduct;