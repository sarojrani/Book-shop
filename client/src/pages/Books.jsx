import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';

const Books = () => {
    const[books,setBooks]=useState([])
    useEffect(()=>{
  const fetchAllBooks=async ()=>{
    try {
       const res=await axios.get("http://localhost:8800/books") 
       setBooks(res.data)
    } catch (error) {
        console.log(error)
    }
  }
  fetchAllBooks()
    },[])
    const handeleDelete=async(id)=>{
      try {
        await axios.delete("http://localhost:8800/books/"+id)
        window.delete.reload()
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div>
        <h1>book shop</h1>
        <div className='books'>
      {books.map(book=>(
        <div className='book'>
        {book.cover && <img src={book.cover} alt=""/>}
        <h2 className='book-title'>{book.title}</h2>
        <p>{book.desc}</p>
        <span>{book.price}</span>
<button className='delete'onClick={()=>handeleDelete(book.id)}>Delete</button>
<button className='update'><Link to={`/update/${book.id}`}>Update</Link></button>
        </div>
      ))}
        </div>
        <button><Link to="/add">add new book</Link></button>
    </div>
  )
}

export default Books