import { Dialog, Transition } from "@headlessui/react";
import QuantityButtons from "components/quantity-buttons";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { removeFromCart, toggleCart } from "redux/actions";
import { RootState } from "redux/reducers";
import { useAppDispatch } from "redux/store";
import { formatCurrency } from "utils/currency";
import "./cart.css";

const Cart = () => {
    const dispatch = useAppDispatch();
    const { show, items } = useSelector(
        (state: RootState) => state.rootReducer.cart
    );

    const getSubTotal = () => {
        const totalPrice = items.reduce((acc, curr) => {
            const newAcc = acc + curr.product.price * curr.count;
            return newAcc;
        }, 0);
        return formatCurrency(totalPrice);
    };

    return (
        <Transition.Root show={show} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                onClose={() => dispatch(toggleCart(false))}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">
                                                    Shopping cart
                                                </Dialog.Title>
                                                <div className="">
                                                    <button
                                                        type="button"
                                                        className="text-gray-400 hover:text-gray-500"
                                                        onClick={() => dispatch(toggleCart(false))}
                                                    >
                                                        X
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flow-root">
                                                <ul className="card-prod-list divide-y divide-gray-200">
                                                    {items.length > 0 ? (
                                                        <Fragment>
                                                            {items.map(({ product, count }) => (
                                                                <li key={product.id} className="flex py-6">
                                                                    <div className="cart-prod-img overflow-hidden rounded-md border border-gray-200">
                                                                        <img
                                                                            src={product.image}
                                                                            alt={product.title}
                                                                            className=""
                                                                        />
                                                                    </div>
                                                                    <div className="ml-4 flex flex-1 flex-col">
                                                                        <div>
                                                                            <div className="text-base font-medium text-gray-900 cart-prod-detail">
                                                                                <h3 className="name">
                                                                                    {product.title}
                                                                                </h3>
                                                                                <p className="ml-4 price">
                                                                                    $
                                                                                    {formatCurrency(
                                                                                        product.price * count
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex mt-auto items-end justify-between text-sm">
                                                                            <QuantityButtons
                                                                                count={count}
                                                                                id={product.id}
                                                                            />
                                                                            <div className="flex ml-auto">
                                                                                <button
                                                                                    onClick={() =>
                                                                                        dispatch(removeFromCart(product.id))
                                                                                    }
                                                                                    type="button"
                                                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                                >
                                                                                    Remove
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </Fragment>
                                                    ) : (
                                                        <li className="pt-16">
                                                            <img src="/assets/images/empty_cart.jpg" alt="empty-cart" />
                                                            <div className="text-center">
                                                                No product added in to cart
                                                            </div>
                                                            <div className="text-center pt-4">
                                                                <button
                                                                    type="button"
                                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                    onClick={() => dispatch(toggleCart(false))}
                                                                >
                                                                    Continue Shopping
                                                                    <span aria-hidden="true"> &rarr;</span>
                                                                </button>
                                                            </div>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                        {items.length ? (
                                            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <p>Subtotal</p>
                                                    <p>${getSubTotal()}</p>
                                                </div>
                                                <p className="mt-0.5 text-sm text-gray-500">
                                                    Shipping and taxes calculated at checkout.
                                                </p>
                                                <div className="mt-6">
                                                    <a
                                                        href="/"
                                                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                                    >
                                                        Checkout
                                                    </a>
                                                </div>
                                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                    <p>
                                                        or{" "}
                                                        <button
                                                            type="button"
                                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                                            onClick={() => dispatch(toggleCart(false))}
                                                        >
                                                            Continue Shopping
                                                            <span aria-hidden="true"> &rarr;</span>
                                                        </button>
                                                    </p>
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default Cart;
