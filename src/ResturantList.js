import { useParams } from "react-router-dom";
import Shimmer from "./Components/Shimmer";
import { IMG_CDN_URL, RESTURANT_LIST_URL } from "./Constants";
import useResturant from "./Utilies/useResturant";
import { addItem } from "./Utilies/cartSlice";
import { useDispatch } from "react-redux";

const ResturantList = () => {
  const parms = useParams();
  const restaurant = useResturant(RESTURANT_LIST_URL + parms.RestroId);
  const dispatch = useDispatch();
  const addToCart = (item) => {
    dispatch(addItem(item));
  };
  return !restaurant ? (
    <Shimmer />
  ) : (
    <div className="ml-8 flex">
      <div className="mt-6">
        <h1 className="text-4xl">Id:{parms.RestroId}</h1>
        <img
          className="w-52"
          alt="loading "
          src={IMG_CDN_URL + restaurant?.data?.cloudinaryImageId}
        ></img>
        <h3>Name: {restaurant?.data?.name}</h3>
        <h3>Rating: {restaurant?.data?.avgRating} star</h3>
      </div>
      <div className="m-6">
        <h1 className="text-4xl">Menu</h1>
        {Object.values(restaurant?.data?.menu?.items).map((items) => (
          <div key={items.id} className="flex">
            <li>{items.name}</li>
            <button
              className="ml-4 bg-cyan-300 hover:bg-sky-400"
              onClick={() => addToCart(items)}
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ResturantList;
