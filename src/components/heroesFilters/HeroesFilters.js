const HeroesFilters = () => {
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Filter heroes by the elements</p>
                <div className="btn-group">
                    <button className="btn btn-outline-dark active">All</button>
                    <button className="btn btn-danger">Fire</button>
                    <button className="btn btn-primary">Water</button>
                    <button className="btn btn-success">Air</button>
                    <button className="btn btn-secondary">Earth</button>
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;