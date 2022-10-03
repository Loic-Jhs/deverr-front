import Card from "../Card/Card";
import { users } from "../../fakeData/data";
import { useEffect, useState } from "react";
import { User } from "../../types";
import './style.scss'

function CardList() {
  
  const [userList, setUserList] = useState<User[]>();

  useEffect(() => {
    setUserList(users);
  }, []);

  return (
    <div className="cards__container">
      {
        userList && userList.map((user) => {
        return  <Card key={user.id} {...user} />
        })
      }
    </div>
  )
}

export default CardList
