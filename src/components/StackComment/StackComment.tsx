import { users } from '../../fakeData/data';
import { DevProps, Rate, Stack } from '../../types';
import './style.scss';


function StackComment({devID}: DevProps) {
    const dev = users.find(user => devID == user.id);
    const devStack = dev?.stacks;
    const devRate = dev?.rates

    return (
        <div className='stack-comment__container'>
            <div className='stack__container'>
                <h2 className='stack-comment__title'>Compétences maitrisées:</h2>
                {devStack && devStack?.map((stack: Stack) => {
                    return (
                        <div key={stack.id} className='stack__item'>
                            <div className='stack__name-logo'>
                                <p className='stack__name'>{stack.label}</p>
                                <div className='stack__image-container'>
                                    <img src={`${stack.logo}`} alt={`Logo de ${stack.logo}`} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='comment__container'>
            <h2 className='stack-comment__title'>Commentaires reçus:</h2>
                {devRate && devRate?.map((rate: Rate) => {
                    return (
                        <div key={rate.id} className='rate__item'>
                            <p className='rate__star'>Note: {rate.rate}/5</p>
                           
                            <p className='rate__comment'>{rate.comment != null ? rate.comment : <span>Aucun commentaire</span>}</p>
                        </div>
                    )
                })}

            </div>
        </div>
    );
}

export default StackComment;