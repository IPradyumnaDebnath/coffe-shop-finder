import { useEffect, useState, useCallback } from "react";

import { api } from "helpers/axios";
import debounce from "helpers/debounce";
import Search from "components/SearchInput";
import CoffeeShops from "components/CoffeeShops";
import { Shop } from "components/CoffeeShop";

type CoffeeShopState = {
  persisted: [Shop] | [];
  current: [Shop] | [];
  loading: boolean;
  next?: string;
};

const Home = () => {
  const [location, setLocation] = useState("");
  const [coffeeShops, setCoffeeShops] = useState<CoffeeShopState>({
    persisted: [],
    current: [],
    loading: true,
    next: "",
  });
  const fetchAndUpdateCoffeeShops = useCallback(
    debounce((location: string, cursor: string | undefined) => {
      setCoffeeShops((prevShops) => ({ ...prevShops, loading: true }));
      api
        .get(`/places/search`, {
          params: {
            query: location,
            categories: "11126,13032,13033,13034,13035,13036,13063",
            limit: "3",
            sort: "DISTANCE",
            cursor,
          },
        })
        .then((resp) => {
          const nextPageLinkParams = new URLSearchParams(
            resp.headers["link"] ?? ""
          );
          setCoffeeShops((prev) => ({
            ...prev,
            current: resp.data.results,
            next: nextPageLinkParams.get("cursor") || "",
          }));
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setCoffeeShops((curShops) => ({ ...curShops, loading: false }));
        });
    }, 500),
    []
  );
  const handleQueryUpdate = (loc: string) => {
    fetchAndUpdateCoffeeShops(loc);
    setLocation(loc);
  };

  useEffect(() => {
    fetchAndUpdateCoffeeShops();
    window.addEventListener("scroll", handlePageScroll);
    return () => window.removeEventListener("scroll", handlePageScroll);
  }, []);

  function handlePageScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;

    fetchAndUpdateCoffeeShops(location, coffeeShops.next);
  }

  return (
    <div className="mt-5 space-y-6">
      <header>
        <div className="px-4 py-2 m-auto w-fit text-4xl shadow-xl bg-slate-200 font-bold uppercase">
          Coffee Corners
        </div>
      </header>
      <Search location={location} onChange={handleQueryUpdate} />
      <CoffeeShops
        shopList={coffeeShops.current}
        loading={coffeeShops?.loading }
      />
    </div>
  );
};

export default Home;
