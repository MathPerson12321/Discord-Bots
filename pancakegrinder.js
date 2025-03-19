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
        await api.sendMessage(channelId, "ok");
    }
  }
  // Run both functions simultaneously
  sendHighlow();
}
