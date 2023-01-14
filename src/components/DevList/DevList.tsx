import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import { Dev } from "../../types";
import "./style.scss";

function DevList() {
  // STATES
  const [devList, setDevList] = useState<Dev[]>();
  const [isLoaded, setIsLoaded] = useState<Boolean>(false);
  const [filteredDev, setFilteredDev] = useState<Dev[]>();

  useEffect(() => {
    const fetchData = async () => {
      await fetch("http://localhost/all-developers", {
        method: "GET",
        headers: {
          "access-control-allow-origin": "*",
          "Content-type": "application/json",
        },
        mode: "cors",
      })
        .then((response) => response.json())
        .then((data) => {
          setDevList(data.data);
          setFilteredDev(data.data);
          setIsLoaded(true);
        })
        .catch((e) => console.error(e));
    };
    fetchData();
  }, [isLoaded]);

  const filterDevFunc = (devArray: Dev[] | undefined, inputLetters: string) => {
    // If empty input
    if (inputLetters === "") {
      // We return the initial array (i.e. all devs)
      return devArray;
    } else {
      // Filtering the dev table
      return devArray?.filter((user) =>
        // Checks the condition, if true returns the dev, otherwise nothing
        user.stacks.some((stack) =>
          // If a letter matches with a stack.name, return true ⬆
          stack.name.toLowerCase().includes(inputLetters.toLowerCase())
        )
      );
    }
  };

  return (
    <>
      <div className="search">
        <label htmlFor="searchTechno">
          Rechercher un(e) Dev(e) par technologie
        </label>
        <input
          name="searchTechno"
          placeholder="PHP, JavaScript..."
          onChange={(event) => {
            const filterDevSearch = filterDevFunc(devList, event.target.value);
            setFilteredDev(filterDevSearch);
          }}
        />
      </div>
      <div className="dev-list__container">
        {filteredDev &&
          filteredDev.map((dev) => {
            const {
              id,
              firstname,
              lastname,
              avatar,
              average_rating,
              description,
              prestations,
              stacks,
              reviews_number,
            } = dev;
            return (
              <Link
                key={id}
                to={`/dev-profile/${id}`}
                className="dev-list__link"
              >
                <div className="dev__info">
                  <div className="dev__info-picture-fav">
                    <img src={`${avatar}`} alt={`${firstname} avatar`} />
                  </div>
                  <div className="dev__name-rate">
                    <p className="dev__name">
                      {firstname} {lastname}
                    </p>
                    {average_rating != null ? (
                      <div className="dev__rate">
                        <Rating
                          name="half-rating-read"
                          size="large"
                          value={average_rating}
                          precision={0.5}
                          readOnly
                        />
                        <p>{average_rating}</p>
                        <p>({reviews_number})</p>
                      </div>
                    ) : (
                      <div className="dev__rate">
                        <Rating
                          name="half-rating-read"
                          size="large"
                          value={0}
                          precision={0.5}
                          readOnly
                        />
                        <p>Aucune note</p>
                      </div>
                    )}
                  </div>
                  <p className="dev__description">
                    {description.slice(0, 100)}...
                  </p>
                </div>
                <div className="dev__stacks-prestations">
                  <h2>Mes compétences :</h2>
                  <div className="dev__stacks">
                    {stacks &&
                      stacks.map((stack) => {
                        return (
                          <div key={stack.id} className="dev__item-stack-logo">
                            <img
                              src={`${stack.logo}`}
                              alt={`${stack.name} logo`}
                            />
                          </div>
                        );
                      })}
                  </div>
                  <h2>Mes prestations :</h2>
                  <div className="dev__prestations">
                    {prestations &&
                      prestations.map((prestation) => {
                        return (
                          <div
                            key={prestation.id}
                            className="prestation__container"
                          >
                            <p>{prestation.name}</p>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
}

export default DevList;
