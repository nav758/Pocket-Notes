/* eslint react/prop-types: 0 */
import { useState, useEffect } from "react";
function GroupList({ groups, onAddGroup, onDeleteGroup, onSelectGroup }) {
  const [newGroupName, setNewGroupName] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [groupColors, setGroupColors] = useState({});
  const [selectedGroup, setSelectedGroup] = useState(null);
  useEffect(() => {
    const savedGroups = localStorage.getItem("groups");
    if (savedGroups) {
      const parsedGroups = JSON.parse(savedGroups);
      onAddGroup(parsedGroups);
      const colors = {};
      parsedGroups.forEach((group) => {
        colors[group.id] = group.color;
      });
      setGroupColors(colors);
    }

  }, []);

  const handleAddGroup = () => {
    if (newGroupName.trim() !== "") {
      const newGroup = {
        id: Date.now(),
        name: newGroupName.trim(),
        color: selectedColor,
      };

      onAddGroup(newGroup);
      setNewGroupName("");
      setGroupColors({ ...groupColors, [newGroup.id]: selectedColor });
      setShowPopup(!showPopup);

      localStorage.setItem("groups", JSON.stringify([...groups, newGroup]));
    }
  };

  const handleSelectGroup = (selectedGroup) => {
    onSelectGroup(selectedGroup)
    
  };
  const handleDeleteGroup = (groupId) => {
    const updatedGroups = groups.filter((group) => group.id !== groupId);
    onDeleteGroup(updatedGroups);
    setSelectedGroup(!selectedGroup);
    window.localStorage.setItem("groups", JSON.stringify(updatedGroups));
    
  };

  function stringAvatar(name, color) {
    const bgColor = color;
    const initials = name
      .split(" ")
      .map((part) => part[0])
      .join("");

    return (
      <div className="avatar" style={{ backgroundColor: bgColor }}>
        {initials}
      </div>
    );
  }

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };


  


 



  return (
    <div className="group-list">
      <ul className="group-scrollable-list">
        {groups.map((group) => (
          <li key={group.id}>
           <div className="groupli" onClick={() => handleSelectGroup(group)}>
            {stringAvatar(group.name, groupColors[group.id])}
            {group.name}
            </div>
            <button
              onClick={() => handleDeleteGroup(group.id)}
              style={{
                position: "relative",
                border: "none",
                backgroundColor: "black",
                borderRadius: "45%",
                color: "#fff",
                bottom: "50px",
                left:"150px",
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>

      <button className="add" onClick={togglePopup}>
        +
      </button>
      {showPopup && (
        <div className="popup-card">
          <div className="popup-content">
            <button className="close" onClick={togglePopup}>
              X
            </button>
            <h3>Create New group</h3>
            <div className="inputName">
              <h4>Group Name</h4>
              <input
                type="text"
                placeholder="Enter group name"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
            </div>
            <div className="inputColor">
              <h4>Choose Color</h4>
              <div className="color-picker">
                <label>
                  <input
                    type="radio"
                    name="color"
                    value="#B38BFA"
                    checked={selectedColor === "#B38BFA"}
                    onChange={(e) => setSelectedColor(e.target.value)}
                  />
                  <span
                    className="color-option"
                    style={{ backgroundColor: "#B38BFA" }}
                  ></span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="color"
                    value="#FF79F2"
                    checked={selectedColor === "#FF79F2"}
                    onChange={(e) => setSelectedColor(e.target.value)}
                  />
                  <span
                    className="color-option"
                    style={{ backgroundColor: "#FF79F2" }}
                  ></span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="color"
                    value="#43E6FC"
                    checked={selectedColor === "#43E6FC"}
                    onChange={(e) => setSelectedColor(e.target.value)}
                  />
                  <span
                    className="color-option"
                    style={{ backgroundColor: "#43E6FC" }}
                  ></span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="color"
                    value="#F19576"
                    checked={selectedColor === "#F19576"}
                    onChange={(e) => setSelectedColor(e.target.value)}
                  />
                  <span
                    className="color-option"
                    style={{ backgroundColor: "#F19576" }}
                  ></span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="color"
                    value="#0047FF"
                    checked={selectedColor === "#0047FF"}
                    onChange={(e) => setSelectedColor(e.target.value)}
                  />
                  <span
                    className="color-option"
                    style={{ backgroundColor: "#0047FF" }}
                  ></span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="color"
                    value="#6691FF"
                    checked={selectedColor === "#6691FF"}
                    onChange={(e) => setSelectedColor(e.target.value)}
                  />
                  <span
                    className="color-option"
                    style={{ backgroundColor: "#6691FF" }}
                  ></span>
                </label>
              </div>
            </div>
            <button onClick={handleAddGroup} className="create">
              Create
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GroupList;
