import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Components/Shimmer";
import { IMG_CDN_URL } from "./Constants";

const ResturantList = () => {
  const parms = useParams();
  const [restaurant, setResturant] = useState(null);
  useEffect(() => {
    getResturantList();
  }, []);
  async function getResturantList() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/menu/v4/full?lat=30.3397809&lng=76.3868797&menuId=" +
        parms.id
    );
    const json = await data.json();
    setResturant(json);
  }
  return !restaurant ? (
    <Shimmer />
  ) : (
    <div className="menu">
      <div className="card">
        <h1>Id:{parms.id}</h1>
        <img
          className="img"
          alt="loading "
          src={IMG_CDN_URL + restaurant?.data?.cloudinaryImageId}
        ></img>
        <h3>Name: {restaurant?.data?.name}</h3>
        <h3>Rating: {restaurant?.data?.avgRating} star</h3>
      </div>
      <div>
        <h1>Menu</h1>
        {Object.values(restaurant?.data?.menu?.items).map((items) => (
          <li key={items.id}>{items.name}</li>
        ))}
      </div>
    </div>
  );
};
export default ResturantList;
