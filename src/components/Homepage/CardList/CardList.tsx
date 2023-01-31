import Card from "./Card/Card";
import { useEffect, useState } from "react";
import { HomepageDev } from "../../../types";
import './style.scss'

function CardList() {

  const [devList, setDevList] = useState<HomepageDev[]>();
  const [isLoaded, setIsLoaded] = useState<Boolean>(false);

  useEffect(() => {
    (async () => {
      await fetch(`${import.meta.env.VITE_API_URL}/random-developers`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setDevList(data);
          setIsLoaded(true);
        })
        .catch((error) => console.error("une erreur est survenue", error));
    })();
  }, [])
  
  return (
    <>
      {isLoaded && (
        <div className="cards__container">
          { devList && devList.map((dev) => {
              return <Card key={dev.id} {...dev} />
            })
          }
        </div>
      )}
    </>
  )
}

export default CardList