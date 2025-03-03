{
    api.id()
    let channelId = cid //Channel you are viewing
    let emojis = [
  "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", 
  "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", 
  "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔", 
  "🤐", "🤨", "😐", "😑", "😶", "😏", "😒", "🙄", "😬", "🤥", 
  "😌", "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮", 
  "🤧", "🥵", "🥶", "🥴", "😵", "🤯", "🤠", "🥳", "😎", "🤓", 
  "🧐", "😕", "😟", "🙁", "☹️", "😮", "😯", "😲", "😳", "🥺", 
  "😦", "😧", "😨", "😰", "😥", "😢", "😭", "😱", "😖", "😣", 
  "😞", "😓", "😩", "😫", "🥱", "😤", "😡", "😠", "🤬", "😈", 
  "👿", "💀", "☠️", "💩", "🤡", "👹", "👺", "👻", "👽", "🤖", 
  "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "🙈", 
  "🙉", "🙊", "💋", "💘", "💝", "💖", "💗", "💓", "💞", "💕", 
  "💟", "❣️", "💔", "❤️", "🧡", "💛", "💚", "💙", "💜", "🤎", 
  "🖤", "🤍", "💯", "💢", "💥", "💫", "💦", "💨", "🕳️", "💬", 
  "👁️‍🗨️", "🗨️", "🗯️", "💭", "💤"];
; // Replace with your desired emoji
    let token = "Token"; // Replace with your Discord token
    
    // Function to react to a message
    async function reactToMessage(messageId) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        let url = `https://discord.com/api/v9/channels/${channelId}/messages/${messageId}/reactions/${encodeURIComponent(emojis[randomIndex])}/@me`;
        await fetch(url, {
            method: "PUT",
            headers: { "Authorization": token }
        });
        console.log(`Reacted to message ${messageId}`);
    }
    
    // Function to react to past messages
    async function reactToPastMessages() {
        let before = ""; // Used for pagination
        let hasMoreMessages = true;
    
        while (hasMoreMessages) {
            let url = `https://discord.com/api/v9/channels/${channelId}/messages?limit=100`;
            if (before) url += `&before=${before}`;
    
            let response = await fetch(url, {
                headers: { "Authorization": token }
            });
    
            if (!response.ok) {
                console.error("Failed to fetch messages:", response.statusText);
                return;
            }
    
            let messages = await response.json();
            if (messages.length === 0) {
                hasMoreMessages = false;
                break;
            }
    
            for (let message of messages) {
                await reactToMessage(message.id);
                await new Promise(resolve => setTimeout(resolve, 1000)); // Avoid rate-limiting
            }
    
            before = messages[messages.length - 1].id;
        }
    }
    
    // Function to react to new messages (live listener)
    async function listenForNewMessages() {
        let lastMessageId = "";
    
        while (true) {
            let url = `https://discord.com/api/v9/channels/${channelId}/messages?limit=1`;
            let response = await fetch(url, {
                headers: { "Authorization": token }
            });
    
            if (!response.ok) {
                console.error("Failed to fetch latest messages:", response.statusText);
                return;
            }
    
            let messages = await response.json();
            if (messages.length > 0) {
                let messageId = messages[0].id;
                if (messageId !== lastMessageId) {
                    lastMessageId = messageId;
                    await reactToMessage(messageId);
                }
            }
    
            await new Promise(resolve => setTimeout(resolve, 3000)); // Check for new messages every 3 seconds
        }
    }
    
    // Run both functions
    reactToPastMessages();
    listenForNewMessages();
}
