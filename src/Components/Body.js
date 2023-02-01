import { useEffect, useState } from "react";
import ResturantCard from "./ResturantCard";
import Shimmer from "./Shimmer";

const filterData = (resturants, searchText) => {
  const data = resturants.filter((resturant) =>
    resturant?.data?.name?.toLowerCase()?.includes(searchText.toLowerCase())
  );
  return data;
};

const Body = () => {
  const [allResturants, setAllResturants] = useState([]);
  const [filteredResturants, setFilteredResturants] = useState([]);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    getResturant();
  }, []);

  async function getResturant() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.7335152&lng=76.7826359&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    setAllResturants(json?.data?.cards[2]?.data?.data?.cards);
    setFilteredResturants(json?.data?.cards[2]?.data?.data?.cards);
    if (!allResturants) return null;
  }

  return allResturants.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        ></input>
        <button
          className="search-btn"
          onClick={() => {
            const data = filterData(allResturants, searchText);
            setFilteredResturants(data);
          }}
        >
          Search
        </button>
      </div>
      <div className="resturant-list">
        {filteredResturants.length === 0 ? (
          <h1>No Resturant Found !!!!!</h1>
        ) : (
          filteredResturants.map((resturantList) => (
            <ResturantCard
              {...resturantList.data}
              key={resturantList.data.id}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Body;
