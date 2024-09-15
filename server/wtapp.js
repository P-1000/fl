import { Flow } from './flowSch.js';
import { sendMessageToSlackChannel } from './utils/Slack.js';

const processIncomingMessage = async (message) => {
    const chat = await message.getChat(); 
    if (chat.isGroup) {
      const groupId = chat.id._serialized;
      console.log("Received message from group ID: ", groupId);
  
      try {
        const flows = await Flow.find({
          'triggerId': 1001,
          'triggerData.groupId': groupId
        });
  
        if (flows.length > 0) {
          console.log("Found matching flows: ", flows);
  
          flows.forEach(flow => {
            const { actions } = flow;
            console.log("Processing actions: ", actions);
            actions.forEach(action => {
              switch (action.actionId) {
                case 2002: // "Post on channel"
                    sendMessageToSlackChannel(action.actionData.channelId, message.body);
                  break;
                case 2001:
                  console.log(`Sending Slack DM to user ${action.actionData.userId}`);
                  break;
                // Handle other actions as needed
                default:
                  console.log(`Unknown action type: ${action.actionId}`);
              }
            });
          });
        } else {
          console.log("No matching flows found for group ID: ", groupId);
        }
      } catch (error) {
        console.error("Error querying database: ", error);
      }
    } else {
      console.log("Message is not from a group.");
    }
  };

  
  export { processIncomingMessage };