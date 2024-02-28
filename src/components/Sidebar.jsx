import  { useState,useEffect } from 'react';
import GroupList from "./GroupList";

function Sidebar() {
  const [groups, setGroups] = useState([]);
  const [group,setGroup] = useState([]);
  
  useEffect(() => {
    const savedGroups = JSON.parse(window.localStorage.getItem('groups'));
    if (savedGroups) {
      setGroups(savedGroups);
    }
  }, []);

 


  const handleAddGroup = (newGroup) => {
    setGroups([...groups, newGroup]);
    
  };

  const handleSelectGroup = (vsgroup) => {
   
    setGroups([...group, vsGroup]);

     
    
  };

  const handleDeleteGroup = (updatedGroups) => {
    setGroups(updatedGroups); // Update the state with the updated groups
    window.localStorage.setItem('groups', JSON.stringify(updatedGroups)); // Update localStorage after deletion
  };
    return (
      <div className="sidebar">
        <h1 style={{padding: "20px"} } >Pocket Notes</h1>
        <GroupList groups={groups} onAddGroup={handleAddGroup} onSelectGroup={handleSelectGroup} onDeleteGroup={handleDeleteGroup} />
      </div>
    );
  }
  
export default Sidebar;
  