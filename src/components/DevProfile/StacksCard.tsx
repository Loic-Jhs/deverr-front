import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { DevStack } from "../../types";

type PROPS = {
  stack: DevStack;
  stackSelected: DevStack | undefined;
  setStackSelected: Dispatch<SetStateAction<DevStack | undefined>>;
  setYearsExp: Dispatch<SetStateAction<string>>;
};

function StacksCard({
  stack,
  stackSelected,
  setStackSelected,
  setYearsExp,
}: PROPS) {
  const [isFavorite, setIsFavorite] = useState<number>(0);

  // useEffect(() => {
  //   console.log(stackSelected);
  // }, [stackSelected])

  const handleClick = (item: DevStack) => {
    setStackSelected({ ...item, is_primary: isFavorite });
    // console.log(stackSelected);
  };

  const handleFavoriteClick = () => {
    console.log(1);
    setIsFavorite(1);
  };
  const deleteFavoriteClick = () => {
    console.log(0);
    setIsFavorite(0);
  };
  return (
    <div className="new_stack_container">
      <li
        onClick={() => handleClick(stack)}
        value={stack.id}
        className={stackSelected?.id === stack.id ? "selected" : ""}
      >
        {stack.name}
        {stackSelected?.id === stack.id &&
          <>
            {isFavorite === 1 ? (
              <FavoriteIcon onClick={() => deleteFavoriteClick()} />
            ) : (
              <FavoriteBorderIcon onClick={() => handleFavoriteClick()} />
            )}
          </>
        }
      </li>
      {stackSelected?.id === stack.id && (
        <div>
          <TextField
            id="standard-basic"
            margin="dense"
            label="Années d'expérience"
            variant="standard"
            type="number"
            inputProps={{ step: 1, min: 1, max: 10 }}
            //we make this condition to be sure
            //that the user enters only integers between 1 and 10
            onKeyDown={(event) => {
              if (event.key != "ArrowUp" && event.key != "ArrowDown") {
                event.preventDefault();
              }
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setYearsExp(event.target.value)
            }
          />
        </div>
      )}
    </div>
  );
}

export default StacksCard;
