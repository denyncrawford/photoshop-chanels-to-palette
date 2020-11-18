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

const textLayer = ({name, color}) => {
    let layers = app.activeDocument.artLayers;
    let layer = layers.add();
    layer.kind = LayerKind.TEXT;
    let textItem = layer.textItem;
    textItem.kind = TextType.PARAGRAPHTEXT;
    textItem.size = 30;
    textItem.position = [10, 10];
    textItem.contents = name;
    let myColor = new SolidColor
    myColor.rgb.red = color.red
    myColor.rgb.green = color.green
    myColor.rgb.blue = color.blue
    textItem.color = myColor
    textItem.width = new UnitValue("300 pixels");
    textItem.height = new UnitValue("30 pixels");
}

channels.forEach(channel => {
    textLayer(channel) 
})

alert("My Active Channels Info\n" + channels );