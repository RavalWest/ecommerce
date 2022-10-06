import React, { FunctionComponent } from "react";
import { addQuantity, reduceQuantity } from "redux/actions";
import { Product } from "redux/services/types";
import { useAppDispatch } from "redux/store";

const QuantityButtons: FunctionComponent<QuantityButtonsProps> = ({
    fullWidth,
    count,
    id
}) => {
    const dispatch = useAppDispatch();

    return (
        <div className={`custom-number-input h-10 ${fullWidth ? "w-100" : "w-32"}`}>
            <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent">
                <button
                    onClick={() => dispatch(reduceQuantity(id))}
                    data-action="decrement"
                    className="text-white bg-indigo-500/80 hover:bg-indigo-500/90 h-full w-20 rounded-l cursor-pointer outline-none"
                >
                    <span className="m-auto text-2xl font-thin">−</span>
                </button>
                <input
                    type="number"
                    className="cursor-default outline-none focus:outline-none text-center w-full font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                    name="custom-input-number"
                    value={count}
                    readOnly
                ></input>
                <button
                    onClick={() => dispatch(addQuantity(id))}
                    data-action="increment"
                    className="bg-indigo-500/80 hover:bg-indigo-500/90 text-white h-full w-20 rounded-r cursor-pointer"
                >
                    <span className="m-auto text-2xl font-thin">+</span>
                </button>
            </div>
        </div>
    );
};

export default QuantityButtons;

type QuantityButtonsProps = {
    fullWidth?: boolean;
    count: number;
    id: Product['id']
};
