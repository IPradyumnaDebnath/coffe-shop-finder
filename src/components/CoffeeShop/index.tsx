type CoffeeShopProp = {
  shop: Shop;
};

export type Shop = {
  name?: string;
  fsq_id: string;
  categories?: [];
  amenities?: [string] | [];
  distance: number;
  location: { formatted_address?: string };
};

const CoffeeShop = ({ shop }: CoffeeShopProp): JSX.Element => {
  return (
    <div className="p-4 space-y-2 cursor-pointer shadow-lg shadow-slate-400 hover:scale-105">
      <div className="items-center text-lg font-bold uppercase">
        <span> {shop?.name ?? "-"}</span>
      </div>
      <div className="flex items-center font-bold">
        {shop.distance} <span className="ml-3 text-xs">KM away</span>
      </div>
      <div>
        {!!shop.categories?.length && (
          <ul>
            {shop.categories.map(({ name = "-", id }) => (
              <li key={id}>{name}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="text-xs">
        <strong>Amenities: </strong>
        {Object.keys(
          shop?.amenities ?? { "Information not available !": "" }
        )?.join(",")}
      </div>
      <div>
        <strong className="uppercase"> Address:</strong>
        <div> {shop?.location?.formatted_address}</div>
      </div>
    </div>
  );
};

export default CoffeeShop;
