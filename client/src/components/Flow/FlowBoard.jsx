import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';  // Assuming Input component exists

const FlowBoard = ({
  trigger,
  selectedGroup,
  selectedChannel,
  selectedActions,
  action,
  whatsappGroups,
  slackChannels,
  onTriggerChange,
  onGroupChange,
  onChannelChange,
  onActionChange,
  onAddTrigger,
  onAddAction,
  triggers,
  onTestFlow, // New prop for testing the flow
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [flowName, setFlowName] = useState('');
  const [flowDescription, setFlowDescription] = useState('');

  const handleTestFlow = () => {
    setShowModal(true); // Show the modal when "Test Flow" is clicked
  };

  const handleSubmitFlow = () => {
    const flowData = {
      name: flowName,
      description: flowDescription,
      trigger,
      selectedGroup,
      selectedChannel,
      actions: selectedActions,
    };
    
    onTestFlow(flowData); // Call the parent function to send the data
    setShowModal(false);  // Close the modal
  };

  return (
    <div className={`fixed right-0 top-0 h-full p-4 transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} bg-white shadow-lg z-50`}>
      <div className="flex flex-col space-y-4">
        {/* Existing UI for Trigger and Action Selection */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Add Trigger</h3>
          <select
            className="block w-full border border-gray-300 rounded-md p-2"
            value={trigger}
            onChange={onTriggerChange}
          >
            <option value="">Select Trigger</option>
            {triggers.map((trg, index) => (
              <option key={index} value={trg}>
                {trg}
              </option>
            ))}
          </select>
          {trigger === "Message received on WhatsApp group" && (
            <>
              <h4 className="text-lg font-medium mt-4">Select WhatsApp Group</h4>
              <select
                className="block w-full border border-gray-300 rounded-md p-2"
                value={selectedGroup}
                onChange={onGroupChange}
              >
                <option value="">Select Group</option>
                {whatsappGroups.map((group, index) => (
                  <option key={index} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </>
          )}
          {trigger === "Message received on Slack channel" && (
            <>
              <h4 className="text-lg font-medium mt-4">Select Slack Channel</h4>
              <select
                className="block w-full border border-gray-300 rounded-md p-2"
                value={selectedChannel}
                onChange={onChannelChange}
              >
                <option value="">Select Channel</option>
                {slackChannels.map((channel, index) => (
                  <option key={index} value={channel}>
                    {channel}
                  </option>
                ))}
              </select>
            </>
          )}
          <Button
            variant="primary"
            className="bg-black text-white mt-5 rounded"
            onClick={onAddTrigger}
            disabled={!trigger}
          >
            Add Trigger
          </Button>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Add Action</h3>
          <select
            className="block w-full border border-gray-300 rounded-md p-2"
            value={action}
            onChange={onActionChange}
            disabled={!trigger}
          >
            <option value="">Select Action</option>
            {selectedActions.map((act, index) => (
              <option key={index} value={act}>
                {act}
              </option>
            ))}
          </select>
          <Button
            variant="primary"
            className="bg-black text-white mt-5 rounded"
            onClick={onAddAction}
            disabled={!action}
          >
            Add Action
          </Button>
        </div>
        <Button
          variant="primary"
          className="bg-black text-white mt-5 rounded-xl"
          onClick={handleTestFlow} // Open modal on "Test Flow"
        >
          Test Flow
        </Button>
      </div>

      {/* Modal for Flow Name and Description */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Enter Flow Details</h2>
            <Input
              placeholder="Flow Name"
              value={flowName}
              onChange={(e) => setFlowName(e.target.value)}
              className="mb-4"
            />
            <Input
              placeholder="Flow Description"
              value={flowDescription}
              onChange={(e) => setFlowDescription(e.target.value)}
              className="mb-4"
            />
            <Button
              variant="primary"
              className="bg-black text-white mt-5 rounded"
              onClick={handleSubmitFlow} // Submit flow data
            >
              Submit Flow
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlowBoard;
