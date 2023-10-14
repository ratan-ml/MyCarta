import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProduct, getProduct, getProducts } from "../../store/products"
import { useParams, useHistory } from "react-router-dom"
import "./ProductShow.css";
import { addCartItem } from "../../store/cart_items";
import ProductReviewForm from "./ProductReviewForm";
import { getReviews, fetchReviews } from "../../store/reviews"
import ReviewIndexItem from "./ReviewIndexItem";

// path = /products/:productId
const ProductShow = () => {
    const { productId } = useParams();
    // console.log(productId)
    const dispatch = useDispatch();
    const product = useSelector(getProduct(productId));
    const currentUser = useSelector(state => state.session.user);
    const reviews = useSelector(getReviews)
    // const [reviews, setReviews] = useState([])

    const [quantity, setQuantity] = useState(1)
    const history = useHistory(); // equivalent to useNavigate in v6
    // const reviews = useSelector(getReviews) // jbuilder response
    console.log(reviews)

    

    useEffect(() => {
        // this code should run when cmp is mounted
        dispatch(fetchProduct(productId));
        // dispatch(fetchReviews())
        // if (product && product.reviews) setReviews(Object.values(product.reviews))
        // if (product && product.reviews) setReviews(Object.values(existingReviews))
    }, [])

    if (!product) return <h1>loading...</h1>

    const price = product.price.toFixed(2).toString();
    const [whole, fraction] = price.split('.');

    const options = []
    for (let i = 1; i <= 10; i++) {
        options.push(<option value={i}>{i}</option>);
    }

    const handleCartClick = e => {
        e.preventDefault();

        if (!currentUser) {
            history.push("/login");
        } else {
            const user_id = currentUser.id;
            const product_id = productId;
            const cartProduct = { user_id, product_id, quantity };
            dispatch(addCartItem(cartProduct));
            history.push("/cart") // check if cart received item
        }
    }

    const handleBuyClick = e => {
        e.preventDefault()

        if (!currentUser) {
            history.push("/login")
        } else {
            history.push("/checkout")
        }
    }

    // const reviewList = reviews.map()

    return (
        <>
            <div className="product-show-container">
                <div className="show-image">
                    <img src="https://via.placeholder.com/300x300"/>
                </div>

                <div className="product-info">
                    <h1 className="show-title">{product.name}</h1>
                    {/* average rating */}
                    <div className="show-price">
                        <span className="price-symbol">$</span>
                        <span className="price-whole">{whole}</span>
                        <span className="price-fraction">{fraction}</span>
                    </div>
                    <h1>About this item</h1>
                    <ul className="feature-list">
                        <li>{product.description}</li>
                    </ul>
                </div>

                <div className="purchase-panel">
                {/* purchase info */}
                    <div className="show-price">
                        <span className="price-symbol">$</span>
                        <span className="price-whole">{whole}</span>
                        <span className="price-fraction">{fraction}</span>
                    </div>
                    <p>prime</p>
                    <br/>
                    {/* delivery date */}
                    <p>FREE delivery (date) </p>
                    <p>or fastest delivery (date) </p>
                    <br/>
                    {/* in stock/out of stock */}
                    <p className="in-stock">In Stock</p>
                    Qty: 
                    <select onChange={e => setQuantity(e.target.value)}>
                        {options}
                    </select>
                    {/* quantity (edit in cart)*/}
                    {/* add to cart (can add to cart when not logged in) */}
                    <button className="add-to-cart-btn" onClick={handleCartClick}>Add to Cart</button>
                    <br/>
                    {/* buy now (requires user to be logged in) */}
                    {/* buy now btn is not always available */}
                    <button className="buy-now-btn" onClick={handleBuyClick}>Buy Now</button>
                    {/* misc detail */}
                    <p className="a-size-small">
                        <span className="gray">Payment</span> Secure Transaction
                    </p>
                    <p className="a-size-small">
                        <span className="gray">Ships from</span> Amuhzaan
                    </p>
                    <p className="a-size-small">
                        <span className="gray">Ships from</span> Amuhzaan
                    </p>
                    <p className="a-size-small">
                        <span className="gray">Returns</span> 
                        Eligible for Return, Refund or Replacement within 30 days of receipt
                    </p>
                </div>
                <div className="description-container">
                    <h3>Product Description</h3>
                    <p>{product.description}</p>
                </div>
            </div>
            {/* divider for reviews */}
            <hr></hr>
            <div className="reviews-container">
                <div className="review-summary">
                    <h1>Customer Reviews</h1>
                    {/* average rating here: stars and text */}
                </div>
                <div className="reviews">
                {/* customer reviews */}
                {Object.values(reviews).map(review => <ReviewIndexItem review={review}/>)}
                {/* {reviewList} */}
                <ProductReviewForm product={product}/>
                </div>
            </div>
        </>
    )
}

export default ProductShow