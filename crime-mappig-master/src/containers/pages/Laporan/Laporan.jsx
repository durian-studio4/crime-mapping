import React, { useState, useEffect, Fragment } from "react";
import { format } from "date-fns";
import "./Laporan.css";
import {
  addDataToAPI,
  getDataFromAPI,
  updateDataAPI,
  deleteDataAPI,
} from "../../../config/redux/action";
import { connect, useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";

const initialDate = format(new Date(), "dd-MM-yyyy");

const initialState = {
  title: "",
  content: "",
  date: initialDate,
  textButton: "SAVE",
  noteId: "",
};

const Laporan = () => {
  const [{ content, date, noteId, textButton, title }, setState] = useState(
    initialState
  );

  const [isRedirect, setIsRedirect] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));

  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const saveNotes = (data) => dispatch(addDataToAPI(data));
  const getNotes = (data) => dispatch(getDataFromAPI(data));
  const updateNotes = (data) => dispatch(updateDataAPI(data));
  const deleteNotes = (data) => dispatch(deleteDataAPI(data));

  useEffect(() => {
    getNotes(userData.uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSaveNotes = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    const data = {
      title,
      content,
      date,
      userId: userData.uid,
    };

    if (textButton === "SAVE") {
      saveNotes(data);
      alert("SUCCESS");
      setState({ ...initialState });
    } else {
      data.noteId = noteId;
      updateNotes(data);
      alert("UPDATE SUCCESS");
    }
  };

  const onInputChange = (e) => {
    const { id, value } = e.target;
    setState((state) => ({ ...state, [id]: value }));
  };

  const onUpdateNotes = (note) => {
    const { data, id } = note;
    setState({
      title: data.title,
      content: data.content,
      textButton: "UPDATE",
      noteId: id,
      date: initialDate,
    });
    updateNotes(data);
  };

  const cancelUpdate = () => {
    setState({
      title: "",
      content: "",
      textButton: "SAVE",
      noteId,
    });
  };

  const onDeleteNotes = (note) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const data = {
      userId: userData.uid,
      noteId: note.id,
    };
    deleteNotes(data);
    alert("DELETE SUCCESS");
  };

  const logOut = () => {
    setIsRedirect(true);
    localStorage.clear();
  };

  if (isRedirect) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <h1 className="header">CRIME MAPPING</h1>
      <div className="list">
        <ul>
          <li>
            <Link to="/Dashboard/Laporan-Kejahatan">Laporan Kejahatan</Link>
          </li>
          <li onClick={logOut}>
            <Link>Logout</Link>
          </li>
        </ul>
      </div>
      <div className="input-form">
        <input
          placeholder="Title"
          className="input-title"
          id="title"
          value={title}
          onChange={onInputChange}
        />
        <input
          placeholder="Content"
          className="input-content"
          id="content"
          value={content}
          onChange={onInputChange}
        />
        {textButton === "UPDATE" ? (
          <button className="btn-cancel" onClick={cancelUpdate}>
            CANCEL
          </button>
        ) : null}
        <button className="btn-save" onClick={handleSaveNotes}>
          {textButton}
        </button>
      </div>
      {notes.length > 0 ? (
        <Fragment>
          {notes.map((note) => {
            return (
              <div className="card-content" key={note.id}>
                <button
                  className="btn-update"
                  onClick={() => onUpdateNotes(note)}
                >
                  {" "}
                  Update{" "}
                </button>
                <button
                  className="btn-delete"
                  onClick={() => onDeleteNotes(note)}
                >
                  {" "}
                  Delete{" "}
                </button>
                <p className="title">{note.data.title}</p>
                <p className="date">{note.data.date}</p>
                <p className="content">{note.data.content}</p>
              </div>
            );
          })}
        </Fragment>
      ) : null}
    </div>
  );
};

export default Laporan;
