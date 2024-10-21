import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

const ResturantCard = ({
  name,
  id,
  cloudinaryImageId,
  cuisines,
  areaName,
  avgRating,
}) => {
  return (
    <>
      <div className="resturant-cards">
        <div className="resturant-card">
          <div className="image-card">
            <img
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${cloudinaryImageId}`}
              alt={name}
            />
          </div>
          <div className="image-info">
            <h3>{name}</h3>
            <h4>
              <img
                src="https://cdn-icons-png.freepik.com/256/3199/3199309.png?ga=GA1.1.854291339.1720274350&semt=ais_hybrid"
                alt=""
              />
              {avgRating} <span>30-35 mins</span>
            </h4>
            <p>{cuisines.join(",")}</p>
            <p>{areaName}</p>
          </div>
        </div>
      </div>
    </>
  );
};

function filterResturant(searchText, allResturant) {
  const resturant = allResturant.filter((resturant) => {
    return resturant.name.toLowerCase().includes(searchText.toLowerCase());
  });
  return resturant;
}

const Body = () => {
  const [allResturants, setAllResturants] = useState([]);
  const [filterResturants, setFilterResturants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isload, setIsLoad] = useState(true);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=20.27060&lng=85.83340&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const data = await response.json();

    const resturantData = data.data.cards[1];

    // console.log(resturantData);

    const resturantArray =
      resturantData?.card?.card?.gridElements?.infoWithStyle?.restaurants;

    const varFilterCg = resturantArray.map((resinfo) => {
      const { name, id, cloudinaryImageId, cuisines, areaName, avgRating } =
        resinfo?.info;
      // const {info}=resinfo.info;
      const resturantInfo = {
        name: name,
        id: id,
        cloudinaryImageId: cloudinaryImageId,
        cuisines: cuisines,
        areaName: areaName,
        avgRating: avgRating,
      };

      return resturantInfo;
    });

    setAllResturants(varFilterCg);
    setFilterResturants(varFilterCg);
    setIsLoad(false);
  }


  const handelSearch=(e)=>{
    const text=e.target.value;
    setSearchText(text);
    if(text===""){
      setFilterResturants(allResturants);
    }else{
      setFilterResturants(filterResturant(text,allResturants));
    }
  }
  return (
    <>
      <div className="search">
        <input
          type="text"
          name=""
          id=""
          value={searchText}
          onChange={
            handelSearch
          }
          
        />
        {/* <button
          onClick={() => {
            setFilterResturants(filterResturant(searchText, allResturants));
          }}
        >
          Search
        </button> */}
        {isload ? <Shimmer /> : ""}
      </div>
      <div className="resturant-cards">
        {filterResturants.length === 0 ? (
          <h2>Nodata found</h2>
        ) : (
          filterResturants.map((resturant, index) => {
            return (
              <>
                <ResturantCard {...resturant} key={resturant.id} />
              </>
            );
          })
        )}
      </div>
    </>
  );
};
export default Body;
