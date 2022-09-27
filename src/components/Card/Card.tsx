import { User, Stack } from "../../types";

function Card(user: User) {
  return (
    <div className="md:w-1/4 w-1/2 mx-auto mb-5 md:mr-4 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center relative w-full">
          <img className="object-fill h-48 w-96" src={`${user.avatar}`} alt={`${user.name} avatar`} />
          <div className="w-full absolute bottom-0 left-0 shadow-md bg-gray-800 flex justify-between"> 
            <p className="ml-2 font-montserrat text-xl font-medium text-white dark:text-white">{user.name}</p>
            {user.stack.filter(stack => stack.isPreference == true).map((stack) => {
              return (
              <div className="w-8 h-8">
                <img src={`${stack.logo}`} />
              </div>
              )
            })}
          </div>
        </div>
    </div>
  )
}
  
export default Card
  