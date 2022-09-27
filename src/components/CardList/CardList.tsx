import Card from "../Card/Card";
import { users } from "../../fakeData/data";
import { useEffect, useState } from "react";
import { User } from "../../types";

function CardList() {
  
  const [userList, setUserList] = useState<User[]>();

  useEffect(() => {
    setUserList(users);
  }, []);

  return (
    <div className="cardList md:w-1/2 w-full md:flex md:flex-wrap md:justify-between md:mx-4 mx-auto">
      {
        userList && userList.map((user) => {
        return  <Card key={user.id} {...user} />
        })
      }
    </div>
  )
}

export default CardList
