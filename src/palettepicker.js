const doc = app.activeDocument;
const layer = doc.activeLayer;
const myActiveChannels = doc.activeChannels || []

let channels = []

myActiveChannels.forEach(channel => {
    let name = channel.name
    let color = channel.kind == "ChannelType.SPOTCOLOR" ? channel.color.rgb : {};
    channels.push({name, color})
    $.write({name, color})
})

app.documents.add(21, 29, 300, "paleta", NewDocumentMode.RGB)

const textLayer = (text) => {
    var layers = app.activeDocument.artLayers;
    var layer = layers.add();
    layer.kind = LayerKind.TEXT;
    var textItem = layer.textItem;
    textItem.kind = TextType.PARAGRAPHTEXT;
    textItem.size = 30;
    textItem.position = [10, 10];
    textItem.contents = text;
    textItem.width = new UnitValue("300 centimeter");
    textItem.height = new UnitValue("30 pixels");
}

channels.forEach(channel => {
    textLayer(channel.name) 
})

alert("My Active Channels Info\n" + channels );