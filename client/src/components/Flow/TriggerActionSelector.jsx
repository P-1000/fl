import React from "react";

const TriggerActionSelector = ({ setTrigger, setAction, trigger, action }) => {
  const triggers = ["WhatsApp Message", "Email Received", "API Call"];
  const actions = ["Send to Slack", "Send Email", "Log to File"];

  return (
    <div className="w-1/4 bg-white p-4 border-r">
      <h3 className="text-lg font-bold mb-4">Triggers</h3>
      <ul>
        {triggers.map((trig, idx) => (
          <li
            key={idx}
            className={`cursor-pointer mb-2 p-2 rounded ${trigger === trig ? "bg-gray-300" : ""}`}
            onClick={() => setTrigger(trig)}
          >
            {trig}
          </li>
        ))}
      </ul>

      <h3 className="text-lg font-bold mt-6 mb-4">Actions</h3>
      <ul>
        {actions.map((act, idx) => (
          <li
            key={idx}
            className={`cursor-pointer mb-2 p-2 rounded ${action === act ? "bg-gray-300" : ""}`}
            onClick={() => setAction(act)}
          >
            {act}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TriggerActionSelector;
