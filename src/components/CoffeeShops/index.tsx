import { Link } from "react-router-dom";

import CoffeeShop, { Shop } from "components/CoffeeShop";
import { WithLoader } from "components/HOC/WithLoader";

type CoffeeShopProps = {
  shopList?: [Shop] | [];
  loading: boolean;
};
const CoffeeShops = ({ shopList, loading = true }: CoffeeShopProps) => (
  <WithLoader loading={loading}>
    {!!shopList?.length ? (
      <ul className="grid grid-cols-3 gap-6">
        {shopList?.map((shop) => {
          return (
            <li key={shop?.fsq_id}>
              <Link to={`/shop/${shop.fsq_id}`}>
                <CoffeeShop shop={shop} />
              </Link>
            </li>
          );
        })}
      </ul>
    ) : (
      <p className="pt-4 text-center text-red-600 font-bold text-4xl">
        No Shops Available
      </p>
    )}
  </WithLoader>
);

export default CoffeeShops;
