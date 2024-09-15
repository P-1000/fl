import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import FlowBoard from './FlowBoard';
import axios from 'axios';

const fetchWhatsappGroups = async () => {
  const response = await fetch('https://localhost:3000/groups');
  if (!response.ok) {
    throw new Error('Failed to fetch WhatsApp groups');
  }
  return response.json();
};

const fetchSlackChannels = async () => {
  try {
    const response = await fetch('https://localhost:3000/slack/channels');
    if (!response.ok) {
      throw new Error('Failed to fetch Slack channels');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching Slack channels:', error);
    return [];
  }
};

const triggers = [
  "Message received on WhatsApp group",
  "Message posted on Slack channel",
];

const actions = [
  "Send Slack DM",
  "Post on channel",
  "Send to WhatsApp group",
];
const FlowEditor = () => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [trigger, setTrigger] = useState("");
    const [action, setAction] = useState("");
    const [selectedActions, setSelectedActions] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState("");
    const [selectedChannel, setSelectedChannel] = useState("");
    const [whatsappGroups, setWhatsappGroups] = useState([]);
    const [slackChannels, setSlackChannels] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const groups = await fetchWhatsappGroups();
          setWhatsappGroups(groups);
          const channels = await fetchSlackChannels();
          setSlackChannels(channels);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);
  
    const addTriggerNode = useCallback(() => {
      const newNode = {
        id: `trigger-${Date.now()}`,
        data: { label: `${trigger}${selectedGroup ? ` (${selectedGroup})` : ''}` },
        position: { x: Math.random() * 300, y: Math.random() * 300 },
        type: "input",
      };
      setNodes((nds) => [...nds, newNode]);
      setTrigger("");
      setSelectedGroup("");
    }, [trigger, selectedGroup]);
  
    const addActionNode = useCallback(() => {
      const newNode = {
        id: `action-${Date.now()}`,
        data: { label: `${action}${selectedChannel ? ` (${selectedChannel})` : ''}` },
        position: { x: Math.random() * 300, y: Math.random() * 300 },
      };
      setNodes((nds) => [...nds, newNode]);
      setAction("");
      setSelectedChannel("");
    }, [action, selectedChannel]);
  
    const onNodesChange = useCallback(
      (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
      []
    );
    const onEdgesChange = useCallback(
      (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
      []
    );
    const onConnect = useCallback(
      (params) => setEdges((eds) => addEdge(params, eds)),
      []
    );
  
    const handleTriggerChange = (e) => {
      const selectedTrigger = e.target.value;
      setTrigger(selectedTrigger);
      setAction(""); // Reset action when trigger changes
      setSelectedGroup("");
      setSelectedChannel("");
    };
  
    const handleActionChange = (e) => {
      setAction(e.target.value);
    };
  
    const handleGroupChange = (e) => setSelectedGroup(e.target.value);
  
    const handleChannelChange = (e) => setSelectedChannel(e.target.value);
  
    const extractIdFromLabel = (label) => {
      const match = label.match(/\(([^)]+)\)$/); // Extract text within parentheses
      return match ? match[1] : null;
    };
    
    const handleTestFlow = async () => {
      
        // Define trigger and action IDs based on identifiers
        const TRIGGER_IDENTIFIERS = {
          'Message received on WhatsApp group': 1001,
          'Message received on WhatsApp': 1002,
          'Message received on Slack channel': 1003,
          'Message posted on Slack channel': 1004,
        };
      
        const ACTION_IDENTIFIERS = {
          'Post on channel': 2002,
          'Send Slack DM': 2001,
          'Send to WhatsApp group': 2003,
          'Custom Action 1': 2004,
          'Custom Action 2': 2005,
        };
      
        // Function to extract ID from label
        const extractIdFromLabel = (label) => {
          const match = label.match(/\(([^)]+)\)$/); // Extract text within parentheses
          return match ? match[1] : null;
        };
      
        // Extract trigger and actions
        const triggerNode = nodes.find(node => node.data.label.startsWith('Message received'));
        const actionNodes = nodes.filter(node => node.data.label.startsWith('Post on channel'));
      
        // Prepare data to be sent to the backend
        const flowData = {
          triggerId: triggerNode ? TRIGGER_IDENTIFIERS[triggerNode.data.label.split(' (')[0]] : null,
          triggerData: {
            groupId: triggerNode ? extractIdFromLabel(triggerNode.data.label) : null,
          },
          actions: actionNodes.map(actionNode => ({
            actionId: ACTION_IDENTIFIERS[actionNode.data.label.split(' (')[0]],
            actionData: {
              channelId: extractIdFromLabel(actionNode.data.label),
            },
          })),
        };
      
        // Send data to backend
        try {
          const response = await axios.post('https://localhost:3000/flow/new', flowData);
          console.log('Flow saved successfully:', response.data);
        } catch (error) {
          console.error('Error saving flow:', error);
        }
      };
      
    
    return (
      <div className="relative h-screen w-screen">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView 
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
        <FlowBoard
          triggers={triggers}
          trigger={trigger}
          selectedGroup={selectedGroup}
          selectedChannel={selectedChannel}
          selectedActions={actions} // Use actions array directly
          action={action}
          whatsappGroups={whatsappGroups}
          slackChannels={slackChannels}
          onTriggerChange={handleTriggerChange}
          onGroupChange={handleGroupChange}
          onChannelChange={handleChannelChange}
          onActionChange={handleActionChange}
          onAddTrigger={addTriggerNode}
          onAddAction={addActionNode}
          onTestFlow={handleTestFlow} // Pass the test flow handler
        />
      </div>
    );
  };
  
  

export default FlowEditor;
