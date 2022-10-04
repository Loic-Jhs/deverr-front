import Card from "../Card/Card";
import { users } from "../../fakeData/data";
import { useEffect, useState } from "react";
import { Dev } from "../../types";
import './style.scss'

function CardList() {
  
  const [devList, setDevList] = useState<Dev[]>();
  const [userList, setUserList] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://api-dev.deverr.fr/admin/users', {
          method: "GET",
          headers: {
            "access-control-allow-origin" : "*",
            "Content-type": "application/json"
          },
        mode: 'no-cors'});
        const data = await response.json()
        console.log(data);
      } catch (e) {
        console.log(e)
      }
    }
    fetchData();
  })
  useEffect(() => {
    setDevList(users);
  }, []);

  return (
    <div className="cards__container">
      {
        devList && devList.map((dev, i) => {
        return  <Card key={dev.id} {...dev} />
        })
      }
    </div>
  )
}

export default CardList
