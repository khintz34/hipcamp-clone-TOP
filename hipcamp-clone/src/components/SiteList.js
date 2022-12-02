import React, { useContext, useEffect, useState } from "react";
import "../styles/SiteList.css";
import Header from "./Header";
import { db } from "../utils/firebase";
import { ref, set, push, onValue } from "firebase/database";
import MiniSite from "./MiniSite";
import { SiteContext } from "../contexts/SiteContext";
import { Link } from "react-router-dom";
import { CurrentSiteContext } from "../contexts/CurrentSiteContext";
import { SearchContext } from "../contexts/SearchContext";
import { PetContext } from "../contexts/PetContext";

const SiteList = (props) => {
  const [siteArray, setSiteArray] = useState([]);
  const { currentSiteList, setCurrentSiteList } = useContext(SiteContext);
  const { currentSite, setCurrentSite } = useContext(CurrentSiteContext);
  const { searchItem, setSearchItem } = useContext(SearchContext);
  const { petSearch, setPetSearch } = useContext(PetContext);
  const [maxVal, setMaxVal] = useState(0);
  const [minVal, setMinVal] = useState(0);
  const [currentVal, setCurrentVal] = useState(maxVal);
  const [maxAcres, setMaxAcres] = useState(0);
  const [minAcres, setMinAcres] = useState(0);
  const [currentAcreVal, setCurrentAcreVal] = useState(maxAcres);
  const [currentAcres, setCurrentAcres] = useState(maxAcres);
  const [currentSiteHolder, setCurrentSiteHolder] = useState([]);
  const [petSearchTranslate, setPetSearchTranslate] = useState("");
  const [maxMinEQ, setMaxMinEQ] = useState(false);

  useEffect(() => {
    if (petSearch === true) {
      setPetSearchTranslate("Yes");
    } else if (petSearch === false) {
      setPetSearchTranslate("No");
    } else {
      setPetSearchTranslate("");
    }
  }, [petSearchTranslate]);

  function getUserData() {
    const boardRef = ref(db, "SiteList/");
    let displayArray = [];
    onValue(
      boardRef,
      (snapshot) => {
        snapshot.forEach((childSnapShot) => {
          const childKey = childSnapShot.key;
          const childData = childSnapShot.val();
          let obj = {
            name: childData.name,
            guests: childData.guests,
            type: childData.type,
            city: childData.city,
            state: childData.state,
            acres: childData.acres,
            rating: childData.rating,
          };
          addData(obj);
        });
      },
      {
        onlyOnce: false,
      }
    );

    function addData(obj) {
      displayArray.push(obj);
      sortArray();
    }

    function sortArray() {
      displayArray.sort((a, b) => {
        return a.name - b.name;
      });
      setCurrentSiteList(displayArray);
    }
  }

  function showType(type) {
    let newArray = [];

    currentSiteList.map((value, key) => {
      value.type.map((value2, key2) => {
        if (value2 === type) {
          newArray.push(value);
        }
      });
    });

    setCurrentSiteList(newArray);
  }

  function findMaxMin() {
    let numMax = 0;
    let numMin = 20;
    let acresMax = 0;
    let acresMin = 0;
    currentSiteList.map((value, key) => {
      if (value.guests > numMax) {
        numMax = value.guests;
      }
      if (value.guests < numMin) {
        numMin = value.guests;
      }
      if (value.acres > acresMax) {
        acresMax = value.acres;
      }
      if (value.acres < acresMin) {
        acresMin = value.acres;
      }
    });
    setMaxVal(numMax);
    setMinVal(numMin);
    setCurrentVal(numMax);
    setMinAcres(acresMin);
    setMaxAcres(acresMax);
    setCurrentAcres(acresMax);
  }

  useEffect(() => {
    if (maxVal === minVal) {
      setMaxMinEQ(true);
    } else {
      setMaxMinEQ(false);
    }
  });

  function handleGuestsChange(e) {
    setCurrentVal(e.target.value);
    let newGuestNum = e.target.value;
    let newArray = [];
    const FullList = currentSiteHolder;

    FullList.map((value, key) => {
      if (value.guests <= newGuestNum) {
        newArray.push(value);
      }
    });

    let newerArray = [];
    newArray.map((value) => {
      if (value.acres <= currentAcres) {
        newerArray.push(value);
      }
    });

    setCurrentSiteList(newerArray);
  }

  function handleAcresChange(e) {
    setCurrentAcres(e.target.value);
    let newAcresNum = e.target.value;
    let newArray = [];
    const FullList = currentSiteHolder;

    FullList.map((value, key) => {
      if (value.acres <= newAcresNum) {
        newArray.push(value);
      }
    });

    let newerArray = [];
    newArray.map((value) => {
      if (value.guests <= currentVal) {
        newerArray.push(value);
      }
    });

    setCurrentSiteList(newerArray);
  }

  useEffect(() => {
    findMaxMin();
    setCurrentSiteHolder(currentSiteList);
  }, []);

  return (
    <div className="siteListContainer">
      <Header />
      <div id="siteListHeader">
        <button className="siteBtn" onClick={() => showType("Tent")}>
          Tents
        </button>
        <button className="siteBtn" onClick={() => showType("Lodging")}>
          Lodging
        </button>
        <button className="siteBtn" onClick={() => showType("RV")}>
          RVs
        </button>
        {maxMinEQ ? (
          <div style={{ display: "none" }}>equal</div>
        ) : (
          <div>
            <input
              type="range"
              id="guestSlider"
              name="guests"
              min={minVal}
              max={maxVal}
              step="1"
              onChange={(e) => {
                handleGuestsChange(e);
              }}
              value={currentVal}
            />
            <label htmlFor="guestSlider">Max Guests ({currentVal})</label>
          </div>
        )}
        <div>
          <input
            type="range"
            id="acres"
            name="acres"
            step="10"
            min={minAcres}
            max={maxAcres}
            onChange={(e) => {
              handleAcresChange(e);
            }}
            value={currentAcres}
          />
          <label htmlFor="acres">Max Acres ({currentAcres})</label>
        </div>
        {searchItem !== "" ? (
          <div>
            <p>Search: {searchItem}</p>
          </div>
        ) : (
          <div style={{ display: "none" }}></div>
        )}
        {petSearchTranslate !== "" ? (
          <div>
            <p>Pets Allowed: {petSearchTranslate}</p>
          </div>
        ) : (
          <div style={{ display: "none" }}></div>
        )}
        {maxMinEQ ? (
          <div>
            <p>Number of Guests: {maxVal}</p>
          </div>
        ) : (
          <div style={{ display: "none" }}></div>
        )}
      </div>
      <div id="siteListMainContainer">
        <div id="siteListMain">
          {currentSiteList.length === 0 ? (
            <div id="noDataContainer">
              <div id="noDataMsg">
                <p> No sites meet your search criteria. </p>
                <p>
                  {" "}
                  Please return to the{" "}
                  <Link to="/" className="noDataLink">
                    {" "}
                    main menu{" "}
                  </Link>{" "}
                  and try again.
                </p>
              </div>
            </div>
          ) : (
            currentSiteList.map((value, key) => {
              return (
                <Link to={"/sites"} className="noUnderline" key={`link-${key}`}>
                  <MiniSite
                    name={value.name}
                    type={value.type}
                    acres={value.acres}
                    city={value.city}
                    state={value.state}
                    price={value.price}
                    rating={value.rating}
                    reviewNum={value.reviewNum}
                    fullSite={value}
                    url={value.url}
                    key={`key-${value.name}`}
                  />
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default SiteList;
