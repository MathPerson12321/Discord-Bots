const channelId = "1324236881042477058";  // Replace with the channel ID
const messageId = "1339457470179053630";  // Replace with the message ID
const emoji = "👍";  // Replace with the emoji (Unicode or emoji name for custom emojis)

fetch(`https://discord.com/api/v9/channels/${channelId}/messages/${messageId}/reactions/${encodeURIComponent(emoji)}/@me`, {
    method: "PUT",
    headers: {
        "Authorization": "MTE3ODEyODkzMjI5NDM4MTcxOQ.GMJbEZ.voHaXN6ha8q_1hE9nAMInEcvGsPUbE2Qc_u4zE",  // Replace with your authorization token
        "Content-Type": "application/json"
    }
}).then(response => console.log(response.status === 204 ? "Reaction added!" : "Failed"));
