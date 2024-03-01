import GroupList from "../../components/GroupList";
import { useState, useEffect } from "react";
import dashimg from "../../assets/dashimg.png";
import lock from "../../assets/lock.png";

function Home() {
  const [noteText, setNoteText] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupColors, setGroupColors] = useState({});
  const [showInfo, setShowInfo] = useState(false);
  const [notes, setNotes] = useState([]);

  

  const handleAddGroup = (newGroup) => {
    setGroups([...groups, newGroup]);
  };

  const handleSelectGroup = (selectedGroup) => {
    setSelectedGroup(selectedGroup);
    setShowInfo(!showInfo); 
    
  };

  const handleDeleteGroup = (updatedGroups) => {
    setGroups(updatedGroups);
    window.localStorage.setItem("groups", JSON.stringify(updatedGroups));
    
    if(selectedGroup) return setSelectedGroup(!selectedGroup);
  };

  const onAddNote = (newNote) => {
    console.log("Adding note:", newNote);
  };

  const handleAddNote = () => {
   
    const newNote = {
      id: Date.now(),
      groupId: selectedGroup.id,
      text: noteText.trim(),
      date: formatDateTime(new Date()),
    };
    setNotes([...notes, newNote]);
    onAddNote(newNote);
    localStorage.setItem("notes", JSON.stringify([...notes, newNote]));
    setNoteText("");
  };

  const stringAvatar = (name, color) => {
    if (!name) return null;
    const bgColor = color || "#000"; // Default color if not provided
    const initials = name
      .split(" ")
      .map((part) => part[0])
      .join("");

    return (
      <div className="avatar" style={{ backgroundColor: bgColor }}>
        {initials}
      </div>
    );
  };

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = dateTime.toLocaleDateString("en-IN", options);
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const amPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedTime = `${formattedHours}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${amPm}`;
    return `${formattedDate} . ${formattedTime}`;
  };



  useEffect(() => {
    const savedGroupsJSON = window.localStorage.getItem("groups");
    if (savedGroupsJSON) {
      const savedGroups = JSON.parse(savedGroupsJSON);
      setGroups(savedGroups);

      const colors = {};
      savedGroups.forEach((group) => {
        colors[group.id] = group.color;
      });
      setGroupColors(colors);
    }

    const savedNotesJSON = window.localStorage.getItem("notes");
    if (savedNotesJSON) {
      const savedNotes = JSON.parse(savedNotesJSON);
      setNotes(savedNotes);
    }
  }, []);
  return (
    <div className="home">
      <div className="container">
        <div className="sidebar">
          <h1 style={{ padding: "20px" }}>Pocket Notes</h1>
          <GroupList
            groups={groups}
            onAddGroup={handleAddGroup}
            onSelectGroup={handleSelectGroup}
            onDeleteGroup={handleDeleteGroup}
          />
        </div>

        <div className="notes">
          {!selectedGroup && !name && (
            <center>
              <div className="dash">
                <img src={dashimg} alt="dash" />
              </div>
              <h1>Pocket Notes</h1>
              <p className="notesp">
                Send and receive messages without keeping your phone online.{" "}
                <br />
                Use Pocket Notes on up to 4 linked devices and 1 mobile phone
              </p>
              <h6>
                <img src={lock} alt="" /> end-to-end encrypted
              </h6>
            </center>
          )}
          {selectedGroup && (
            <div className="Infobar">
              <div className="info">
                {stringAvatar(selectedGroup.name, selectedGroup.color)}

                {selectedGroup.name}
              </div>
            </div>
          )}

          <div className="body">
            <div className="notesbox">
              <div className={"noteslist" }>
                <ul>
                  {selectedGroup &&
                    notes
                      .filter((note) => note.groupId === selectedGroup.id)
                      .map((note) => (
                        <li className="notesli" key={note.id}>
                          <p className="text">{note.text}</p>
                          <p className="date">{note.date}</p>
                        </li>
                      ))}
                </ul>
              </div>
            </div>
            {selectedGroup && (
              <div className="input">
                <input
                  type="text"
                  placeholder="Type your note here..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                />
                <button
                  onClick={handleAddNote}
                  disabled={!noteText.trim()}
                ></button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
