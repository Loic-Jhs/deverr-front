import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dev } from "../../types";
import { Rating } from "@mui/material";
import "./style.scss";

function DevList() {
  const [query, setQuery] = useState("");
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
          setDevList(data);
          setFilteredDev(data);
          setIsLoaded(true);
        })
        .catch((e) => console.log(e));
    };
    fetchData();
  }, [isLoaded]);

  const filterDevFunc = (devArray: Dev[] | undefined, inputLetters: string) => {
    // Si input vide
    if (inputLetters === "") {
      // on renvoie le tableau initial (càd tous les dev)
      return devArray;
    } else {
      // On filtre le tableau de dev
      return devArray?.filter((user) =>
        // Vérifie la condition, si true renvoie le dev, sinon rien
        user.stacks.some((stack) =>
          // Si une lettre match avec une stack.name, renvoi true ⬆
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
            setQuery(event.target.value);
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
