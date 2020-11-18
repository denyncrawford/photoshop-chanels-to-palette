const doc = app.activeDocument;
const layer = doc.activeLayer;
const myActiveChannels = doc.activeChannels || []

let channels = []

myActiveChannels.forEach(channel => {
    let name = channel.name
    let color = {}
    if (channel.kind == "ChannelType.SPOTCOLOR")  color = channel.color.rgb;
    channels.push({name, color})
    $.write({name, color})
})

app.documents.add(21, 29, 300, "paleta", NewDocumentMode.RGB)

alert("My Active Channels Info\n" + channels );