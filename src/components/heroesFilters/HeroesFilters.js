import { useRequest } from '../../hooks/request.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { activeFilterChanged, fetchFilters } from './filtersSlice';
import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {
    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useRequest();

    useEffect(() => {
        dispatch(fetchFilters(request));
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <Spinner />;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Loading error...</h5>
    }

    const renderFiltersList = (filtersList) => {
        if (filtersList.length === 0) {
            return <h5 className="text-center mt-5">There are no filters available.</h5>
        }

        return filtersList.map(({name, label, className}) => {
            const filterClassName = classNames('btn', className, {
                'active': name === activeFilter
             });

            return <button 
                        key={name} 
                        id={name}
                        className={filterClassName}
                        onClick={() => dispatch(activeFilterChanged(name))} >
                        {label}
                    </button>
        })
    }

    const elements = renderFiltersList(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Filter heroes by the elements</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;