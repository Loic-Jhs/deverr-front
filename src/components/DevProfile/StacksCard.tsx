import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
  // primaryStackExist
}: PROPS) {
  const [isFavorite, setIsFavorite] = useState<number>(0);

  const handleClick = (item: DevStack) => {
    setStackSelected({ ...item });
  };

  /*
    Dans les 2 handleClick ci-dessous,
    On fait face à un problème d'évènement du parent, (la <li>).
    Lorsqu'on clique sur les icônes favoris, l'évènement du clic
    trigger au mauvais endroit, c'est-à-dire la <li>. Alors qu'on souhaiterait trigger les icônes.
    Pour remédier à ce pb, on utilise stopPropagation().

    Aussi quand on clique sur l'icône, on change la valeur d'is_primary à 1 ou 0 en dur
    pour envoyer les bonnes valeurs au back.
  */
  const handleFavoriteClick = (event: any, item: DevStack) => {
    event.stopPropagation();
    setStackSelected({ ...item, is_primary: 1 });
    setIsFavorite(1);
  };

  const deleteFavoriteClick = (event: any, item: DevStack) => {
    event.stopPropagation();
    setStackSelected({ ...item, is_primary: 0 });
    setIsFavorite(0);
  };

  useEffect(() => {
    setStackSelected(stackSelected);
  }, [isFavorite]);

  return (
    <div className="new_stack_container">
      <li
        onClick={() => handleClick(stack)}
        value={stack.id}
        className={stackSelected?.id === stack.id ? "selected" : ""}
      >
        {stack.name}
          <>
            {isFavorite === 1 ? (
              <FavoriteIcon onClick={(event) => deleteFavoriteClick(event, stack)} />
            ) : (
              <FavoriteBorderIcon onClick={(event) => handleFavoriteClick(event, stack)} />
            )}
          </>
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
