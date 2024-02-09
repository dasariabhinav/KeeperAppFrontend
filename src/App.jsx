import Footer from './components/Footer'
import './styles.css'
import Note from './components/Note'
import Header from './components/Header'
import Input from './components/Input'
import axios from 'axios';

import { useState,useEffect } from 'react'


 const App = () => {
  const [notes,setNotes] = useState([])
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const response = await axios.get('https://keeperbackend-6rnd.onrender.com/get'); 
      setNotes(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };


  //adding a note
  function addNote(newNote){

    setNotes(
      prevnotes=>{
        return  [...prevnotes,newNote]
      }
    )

  }

  //deleting a note
  function deleteNote(id){
 
   setNotes(
    prevnotes=>{
      return prevnotes.filter((note,index)=>{
        return index!=id
      })
    })
    fetchData()
  }

  return (
    <div>
      <Header/>
      <Input onAdd={addNote}/>
      { loading ? <p>Loading...</p> :
      notes.map((note)=>(
        <Note  key={note.id} id={note.id} title={note.title} content ={note.content} deleteNote={deleteNote}  />
      ))
    }
      <Footer/>
    </div>
  )
}

export default App