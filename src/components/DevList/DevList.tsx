import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { users } from "../../fakeData/data";
import { useState } from "react";
import "./style.scss";

function DevList() {
    const { user } = useContext(AuthContext);
    const [query, setQuery] = useState("");
    
    return (
        <>
            <div className="search">
                <input
                    placeholder="Rechercher un(e) Dev/Techno"
                    onChange={(event) => setQuery(event.target.value)}
                />
                {/* <label>Rechercher une prestation</label>
                <select>
                    {
                        users.filter( element => {
                            const isDuplicate = uniquePrestations.includes()
                        })
                        users.map(({ prestations }) => {
                            return (
                                <>
                                    {prestations.map((prestation) => {
                                        console.log(prestation);
                                        return (<option key={prestation.id} value={prestation.id}>{prestation.name} {prestation.price}€</option>)
                                    })}
                                </>
                            )
                        })
                    }
                </select> */}
            </div>
            <div className="dev-list__container">
                {users.filter(user => {
                    if (query === "") {
                        //if query is empty
                        return user;
                    } else if (user.firstname.toLowerCase().includes(query.toLowerCase()) || user.lastname.toLowerCase().includes(query.toLowerCase())) {
                        //returns filtered array
                        return user;
                    } else if (user.stacks[0].label.toLowerCase().includes(query.toLowerCase())) {
                        //returns filtered array for techno
                        return user;
                    }
                }).map((user) => {
                    const {
                        id,
                        firstname,
                        lastname,
                        avatar,
                        rates,
                        description,
                        prestations,
                        stacks,
                        createdAt,
                    } = user;
                    let average: Number | String = 0;
                    rates.length > 0 ? average = rates.reduce((a, b) => a + b.rate, 0) / rates.length : average = "Pas de note";

                    return (
                        <Link key={id} to={`/dev-profile/${id}`} className="dev-list__link">
                            <div className="dev__item">
                                <div className="dev__item-img">
                                    <img src={`${avatar}`} alt={`${firstname} avatar`} />
                                </div>
                                <div className="dev__item-infos">
                                    <div className="dev__item-account-detail">
                                        <h3>
                                            {firstname} {lastname}
                                        </h3>
                                        <p>Inscrit depuis le {createdAt}</p>
                                        <p>{`${description.substring(0, 90)}...`} </p>
                                    </div>
                                    <div className="dev__item-stacks-detail">
                                        {stacks.map((stack) => {
                                            return (
                                                <div key={stack.label} className="dev__item-stack-logo">
                                                    <img
                                                        src={`${stack.logo}`}
                                                        alt={`${stack.label} logo`}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="dev__item-prestation">
                                    {prestations.map((prestation) => {
                                        return (
                                            <div key={prestation.id} className="prestation__container">
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
