/* eslint-disable jsx-a11y/anchor-is-valid */
import QuantityButtons from "components/quantity-buttons";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { addToCart } from "redux/actions";
import { RootState } from "redux/reducers";
import { Product } from "redux/services/types";
import { useAppDispatch } from "redux/store";
import { formatCurrency } from "utils/currency";
import "./product-card.css";

const ProductCard: FunctionComponent<Product> = ({
  id,
  image,
  price,
  title,
  ...productDetails
}) => {
  const dispatch = useAppDispatch();
  const cartItems = useSelector(
    (state: RootState) => state.rootReducer.cart.items
  );

  console.log(cartItems.some(({ product }) => product.id === id));

  return (
    <div className=" px-2 product">
      <div className="bg-white product-card text-gray-700 shadow-lg rounded-md overflow-hidder  min-h-[10rem] p-4 mb-3">
        <div className="product-image">
          <img src={image} alt="product" className="" />
        </div>
        <div className="pt-5 flex flex-col gap-3">
          <div className=""><h2 className="product-name">{title}</h2></div>
          <div className="product-action">
            <div>
              <span className="text-xl font-bold">
                ${formatCurrency(price)}
              </span>
            </div>
            <div className="action-btns">
              {!cartItems.some(({ product }) => product.id === id) ? (
                <button
                  onClick={() =>
                    dispatch(
                      addToCart({
                        id,
                        image,
                        price,
                        title,
                        ...productDetails,
                      })
                    )
                  }
                  className="bg-indigo-500/80 hover:bg-indigo-500/90 text-white w-full px-6 py-2 rounded-md font-medium tracking-wider transition"
                >
                  Add to Cart
                </button>
              ) : (
                <QuantityButtons
                  fullWidth
                  count={
                    cartItems.find(({ product }) => product.id === id).count
                  }
                  id={id}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
