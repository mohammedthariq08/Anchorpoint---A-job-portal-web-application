function Search({setTitle,setLocation,fetchData}){
    return(
        <>
        <div className="search">
            <input type='text' name='title' placeholder='search' onChange={(e)=>setTitle(e.target.value)}></input> 
            <select name='location' onChange={(e)=>setLocation(e.target.value)}>
                <option value='Chennai'>Chennai</option>
                <option value='Bangalore'>Bangalore</option>
                <option value='Hyderabad'>Hyderabad</option>
                <option value='Coimbatore'>Coimbatore</option>
                <option value='Mumbai'>Mumbai</option>
                <option value='Delhi'>Delhi</option>
            </select>
            <button onClick={fetchData}>Search</button>
        </div>
        </>
    )
}
export default Search;