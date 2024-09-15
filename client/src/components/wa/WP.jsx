import React, { useState } from "react";
import GroupsList from "./GroupList";
import SendMessage from "./SendMessage";

const WP = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  return (
    <div>
      <h1>WhatsApp Message Sender</h1>
      {!selectedGroup ? (
        <GroupsList onSelectGroup={setSelectedGroup} />
      ) : (
        <SendMessage selectedGroup={selectedGroup} />
      )}
    </div>
  );
};

export default WP;
