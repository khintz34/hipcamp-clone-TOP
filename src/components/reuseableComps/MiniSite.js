import React, { useContext, useEffect, useState } from "react";
import "../../styles/MiniSite.css";
import { CurrentSiteContext } from "../../contexts/CurrentSiteContext";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const MiniSite = (props) => {
  const { currentSite, setCurrentSite } = useContext(CurrentSiteContext);
  const [urlState, setURLState] = useState("");
  const storage = getStorage();
  const storageRef = ref(storage);
  const specRef = ref(storage, props.url);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDownloadURL(specRef);
      setURLState(result);
    };

    fetchData();
  }, []);

  return (
    <div
      className="miniSiteContainer"
      onClick={() => setCurrentSite(props.fullSite)}
    >
      <div className="miniImgContainer">
        <img src={urlState} alt="" className="miniImage" />
      </div>
      <div className="miniSiteBottom">
        <div id="siteReviews">
          <div id="siteRating">{props.rating}% Rating</div>
          <div>·</div>
          <div id="ratingNumber">{props.reviewNum} Reviews</div>
        </div>
        <div id="siteNameMini">{props.name}</div>
        <div id="siteType">
          {props.type.map((value, key) => {
            if (key !== props.type.length - 1) {
              return (
                <div key={`mini${currentSite.name}-type-${value}`}>
                  {value}
                  {","}
                </div>
              );
            } else {
              return (
                <div key={`mini${currentSite.name}-type-${value}`}>{value}</div>
              );
            }
          })}
        </div>
        <div className="miniDeetsSide">
          <div>{`${props.acres} Acres ·  ${props.city}, ${props.state}`}</div>
        </div>
        <div>${props.price}/night</div>
      </div>
    </div>
  );
};

export default MiniSite;
