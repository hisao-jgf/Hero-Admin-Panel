import { useRequest } from '../../hooks/request.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError, heroDeleted } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const filteredHeroes = useSelector(state => {
        if (state.activeFilter === 'all') {
            return state.heroes;
        } else {
            return state.heroes.filter(hero => hero.element === state.activeFilter)
        }
    })

    const heroesLoadingStatus = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useRequest();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
    }, []);

    const onHeroDelete = useCallback((id) => {
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(dispatch(heroDeleted(id)))
            .catch(e => console.log(e));
    }, [request])
    
    if (heroesLoadingStatus === "loading") {
        return <Spinner />;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Loading error...</h5>
    }

    const renderHeroesList = (heroesList) => {
        if (heroesList.length === 0) {
            return <h5 className="text-center mt-5">There are no heroes yet.</h5>
        }

        return heroesList.map(({id, ...props}) => {
            return <HeroesListItem key={id} {...props} onHeroDelete = {() => onHeroDelete(id)} />
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;