import { useState } from 'react';

function Pagination({page,setPage,totalPages}){
    let pages = Array.from({length:totalPages}, (_,i)=>i+1);
    return (
        <>
        <button disabled={page===1} onClick={()=>setPage(page-=1)}>Prev</button>
        {pages.map(p=>(
            <button key={p} onClick={()=>setPage(p)} style={{fontWeight: p===page? "bold":"normal"}}>{p}</button>
        ))}
        <button disabled={page===totalPages} onClick={()=>setPage(page+=1)}>Next</button>
        </>
    )
}
export default Pagination;