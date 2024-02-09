import React, {useState } from 'react'
import { IoIosAdd } from "react-icons/io";
import axios from 'axios'

const Input = (props) => {
  const [expand, setExpand] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevnote) => {
      return {
        ...prevnote,
        [name]: value,
      };
    });
  }

  async function submitNote(event) {
    try {
      
      if(!note.title.trim() || !note.content.trim())
        return 
      const response = await axios.post("https://keeperbackend-6rnd.onrender.com/add", {
        id: note.id,
        title: note.title,
        content: note.content,
      });

      props.onAdd(note);
      setNote({
        title: "",
        content: "",
      });
      event.preventDefault();
    } catch (e) {
     
      console.error(e);
    }
  }

  function handleExpand() {
    setExpand(true);
  }
  function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      submitNote();
      event.preventDefault();
    }
  }


  return (
    <form className='create-note'>
      {expand && (
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
          autoComplete='false'
          required
        />
      )}

      <textarea
        name="content"
        onClick={() => handleExpand()}
        onChange={handleChange}
        value={note.content}
        onKeyDown={handleKeyPress}
        id=""
        cols="30"
        rows={expand ? "5" : "1"}
        placeholder="Take a Note.."
      >
        {" "}
      </textarea>
      {expand && (
        <button type="submit" onClick={submitNote}>
         <IoIosAdd size={25}/>
        </button>
      )}
    </form>
  );
}

export default Input