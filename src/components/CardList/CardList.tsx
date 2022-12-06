import Card from "../Card/Card";
import { useEffect, useState } from "react";
import { HomepageDev } from "../../types";
import './style.scss'

function CardList() {

  const [devList, setDevList] = useState<HomepageDev[]>();
  const [isLoaded, setIsLoaded] = useState<Boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      await fetch('http://localhost/random-users', {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setDevList(data);
          setIsLoaded(true);
        })
        .catch((error) => console.log(error));
    };
    fetchData();
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