const HeroesAddForm = () => {
    return (
        <form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">New hero's name</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="What is my name?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Description</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="What are my abilities?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Select hero's element</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element">
                    <option >I bend the element of...</option>
                    <option value="fire">Fire</option>
                    <option value="water">Water</option>
                    <option value="air">Air</option>
                    <option value="earth">Earth</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Create!</button>
        </form>
    )
}

export default HeroesAddForm;