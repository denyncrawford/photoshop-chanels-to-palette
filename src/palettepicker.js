import { drawShape, textLayer } from './methods'

const doc = app.activeDocument;
const myActiveChannels = doc.activeChannels || []

let channels = []

myActiveChannels.forEach(channel => {
    let name = channel.name
    let color = channel.kind == "ChannelType.SPOTCOLOR" ? channel.color.rgb : {};
    channels.push({name, color})
    $.write({name, color})
})

app.documents.add(21, 29, 300, "paleta", NewDocumentMode.RGB)

const unit = u => 118.11 * u;

let y = [unit(1), unit(2), unit(2), unit(1)];

channels.forEach(channel => {
    textLayer(channel)
    drawShape([[unit(1), y[0]], [unit(1), y[1]], [unit(2), y[2]], [unit(2), y[3]]], channel.color)
    y = y.map(el => el + unit(1))
})