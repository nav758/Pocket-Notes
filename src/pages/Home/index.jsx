import GroupList from "../../components/GroupList";
import { useState, useEffect } from "react";

function Home() {
  const [noteText, setNoteText] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupColors, setGroupColors] = useState({});
  const [showInfo, setShowInfo] = useState(false);
  const [notes, setNotes] = useState([]);

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

  const handleAddGroup = (newGroup) => {
    setGroups([...groups, newGroup]);
  };

  const handleSelectGroup = (selectedGroup) => {
    setSelectedGroup(selectedGroup);
    setShowInfo(!showInfo); // Toggle the showInfo state
  };

  const handleDeleteGroup = (updatedGroups) => {
    setGroups(updatedGroups);
    window.localStorage.setItem("groups", JSON.stringify(updatedGroups));
  };

  const onAddNote = (newNote) => {
    console.log("Adding note:", newNote);
  };

  const handleAddNote = () => {
    if (!selectedGroup) {
      alert("Please select a group");
      return;
    }
    if (noteText.trim() === "") {
      alert("Note text cannot be empty!");
      return;
    }
    const newNote = {
      id: Date.now(),
      groupId: selectedGroup.id,
      text: noteText.trim(),
      date: new Date().toLocaleString(),
    };
    setNotes([...notes, newNote]);
    onAddNote(newNote);
    localStorage.setItem("notes", JSON.stringify([...notes, newNote]));
    setNoteText("");
  };

  function stringAvatar(name, color) {
    const bgColor = color;
    const initials = name.split(" ").map((part) => part[0]).join("");

    return (
      <div className="avatar" style={{ backgroundColor: bgColor }}>
        {initials}
      </div>
    );
  }

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
         
            {showInfo && selectedGroup && (
              <div className="Infobar">
                <div className="info">
                {stringAvatar(
                  selectedGroup.name,
                  groupColors[selectedGroup.id]
                )}
                {selectedGroup.name}
              </div></div>
            )}
          
          <div className="body">
            <div className="notesbox">
            <div className={showInfo ? "noteslist" : "noteslist hidden"}>
              <ul>
                {showInfo && selectedGroup &&
                  notes
                    .filter((note) => note.groupId === selectedGroup.id)
                    .map((note) => (
                      <li className="notesli" key={note.id}>
                        <p>{note.text}</p>
                        <p>{note.date}</p>
                      </li>
                    ))}
              </ul>
            </div>
            </div>
            {showInfo &&
            <div className="input">
              <input
                type="text"
                placeholder="Type your note here..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
              <button onClick={handleAddNote} disabled={!noteText.trim()}>
             
              </button>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
