import { useRequest } from '../../hooks/request.hook';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { heroCreated } from '../heroesList/heroesSlice';

const HeroesAddForm = () => {
    const {heroes} = useSelector(state => state.heroes);
    const {filters, filtersLoadingStatus} = useSelector(state => state.filters);

    const [heroName, setHeroName] = useState('');
    const [heroDescription, setHeroDescription] = useState('');
    const [heroElement, setHeroElement] = useState('');

    const dispatch = useDispatch();
    const {request} = useRequest();

    const onSubmitForm = (e) => {
        e.preventDefault();

        const newHero = {
            id: heroes.length + 1,
            name: heroName,
            description: heroDescription,
            element: heroElement
        }

        request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
            .then(dispatch(heroCreated(newHero)))
            .catch(e => console.log(e));

        setHeroName('');
        setHeroDescription('');
        setHeroElement('');
    }

    const renderOptions = (filters, status) => {
        if (status === 'loading') {
            return <option>Loading filters...</option>
        } else if (status === 'error') {
            return <option>Loading error...</option>
        }

        if (filters && filters.length > 0) {
            return filters.map(({name, label}) => {
                if (name === 'all') return;

                return <option
                            key={name}
                            value={name}
                        >
                            {label}
                        </option>
            })
        }
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitForm}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">New hero's name</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="What is my name?"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)} />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Description</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="What are my abilities?"
                    style={{"height": '130px'}}
                    value={heroDescription}
                    onChange={(e) => setHeroDescription(e.target.value)} />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Select hero's element</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)} >
                    <option >I bend the element of...</option>
                    {
                        renderOptions(filters, filtersLoadingStatus)
                    }
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Create!</button>
        </form>
    )
}

export default HeroesAddForm;