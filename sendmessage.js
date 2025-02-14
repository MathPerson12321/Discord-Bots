{
  api.id()
  // or api.update_guildId_and_channelId_withCurrentlyVisible()

  let channelId = cid
  // or let channelId = api.getConfig().channelId

  // Send a message
  let sentMessage = await api.sendMessage(channelId, `ok`)
}
