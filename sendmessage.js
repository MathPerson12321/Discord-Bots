{
  api.id()
  // or api.update_guildId_and_channelId_withCurrentlyVisible()

  let channelId = cid
  // or let channelId = api.getConfig().channelId

  async function sendDep() {
    await api.sendMessage(channelId, "p!deposit all");
  }

  async function sendHighlow() {
    while (true) {
        await api.sendMessage(channelId, "p!highlow");
        await new Promise(resolve => setTimeout(resolve, 1000));
        await api.sendMessage(channelId, "lower");
        await new Promise(resolve => setTimeout(resolve, 1000));
        sendDep();
        await new Promise(resolve => setTimeout(resolve, 31000));
    }
}

async function sendWork() {
    while (true) {
        await api.sendMessage(channelId, "p!work");
        await new Promise(resolve => setTimeout(resolve, 1000));
        sendDep();
        await new Promise(resolve => setTimeout(resolve, 65000));
    }
}
// Run both functions simultaneously
sendHighlow();
sendWork();
}
