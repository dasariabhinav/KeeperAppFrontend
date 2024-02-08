import axios from 'axios'
import React from 'react'
import { MdDelete } from "react-icons/md";


const Note = ({id,title,content,...props}) => {

  
  const handleDelete = async () => {
    console.log(id);
    props.deleteNote(id);
    try {
      const response = await axios.delete("https://keeperbackend-6rnd.onrender.com/delete/" + id);
      console.log('successfully deleted')
      
      
    } catch (error) {
      console.error(error)
      console.log('couldnt delete from db')
    }
   
  };
  
  return (
    <div className="note">      
          <h1>{title}</h1>
          <p>{content}</p>
         
          <button onClick={handleDelete}><MdDelete size={30} />
</button>
      
    </div>
  )
}

export default Note