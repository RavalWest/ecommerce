import { Container } from "components";
import Cart from "components/cart";
import ProductCard from "components/product-card";
import React from "react";
import { useGetProductsListQuery } from "redux/services/products";

const Home: React.FC = () => {
  const { data, error, isLoading } = useGetProductsListQuery(null);

  return (
    <Container>
      <div className="min-h-screen container w-100 mx-auto px-4">
        {error ? (
          <div>Oh no, there was an error</div>
        ) : isLoading ? (
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
        ) : data && data.length > 0 ? (
          <div className="flex-wrap flex">
            {data.map((product) => (
              <ProductCard {...product} />
            ))}
          </div>
        ) : null}
      </div>
      <Cart />
    </Container>
  );
};

export default Home;
