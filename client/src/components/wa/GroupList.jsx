import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GroupsList = ({ onSelectGroup }) => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch groups from the backend
    const fetchGroups = async () => {
      try {
        const response = await axios.get('https://localhost:3000/groups');
        setGroups(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch groups');
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Select a Group</h2>
      <ul>
        {groups.map(group => (
          <li key={group.id}>
            <button onClick={() => onSelectGroup(group)}>
              {group.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupsList;
