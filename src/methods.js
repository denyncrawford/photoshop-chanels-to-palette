const originalDocName = app.activeDocument.name;

const drawShape = (args, color) => {
    
  const doc = app.activeDocument;
  let y = args.length;
  let i = 0;

  const docCoef = doc.resolution / 72;

  args = args.map(arr => {
    return arr.map(coor => {
      return coor / docCoef;
    })
  })
  
  let lineArray = [];

  for (i = 0; i < y; i++) {
      lineArray[i] = new PathPointInfo;
      lineArray[i].kind = PointKind.CORNERPOINT;
      lineArray[i].anchor = args[i];
      lineArray[i].leftDirection = lineArray[i].anchor;
      lineArray[i].rightDirection = lineArray[i].anchor;
  }

  let lineSubPathArray = new SubPathInfo();
  lineSubPathArray.closed = true;
  lineSubPathArray.operation = ShapeOperation.SHAPEADD;
  lineSubPathArray.entireSubPath = lineArray;
  var myPathItem = doc.pathItems.add("myPath", [lineSubPathArray]);
  

  let desc88 = new ActionDescriptor();
  let ref60 = new ActionReference();
  ref60.putClass(stringIDToTypeID("contentLayer"));
  desc88.putReference(charIDToTypeID("null"), ref60);
  let desc89 = new ActionDescriptor();
  let desc90 = new ActionDescriptor();
  let desc91 = new ActionDescriptor();
  desc91.putDouble(charIDToTypeID("Rd  "), color.red); // R
  desc91.putDouble(charIDToTypeID("Grn "), color.green); // G
  desc91.putDouble(charIDToTypeID("Bl  "), color.blue); // B
  let id481 = charIDToTypeID("RGBC");
  desc90.putObject(charIDToTypeID("Clr "), id481, desc91);
  desc89.putObject(charIDToTypeID("Type"), stringIDToTypeID("solidColorLayer"), desc90);
  desc88.putObject(charIDToTypeID("Usng"), stringIDToTypeID("contentLayer"), desc89);
  executeAction(charIDToTypeID("Mk  "), desc88, DialogModes.NO);
  
  myPathItem.remove();
}

let lastpos = 1

const textLayer = ({name, color, h, w, size, l, cap}) => {
    let layers = app.activeDocument.artLayers;
    let layer = layers.add();
    layer.kind = LayerKind.TEXT;
    let textItem = layer.textItem;
    textItem.kind = TextType.PARAGRAPHTEXT;
    textItem.size = size || 30;
    textItem.position = [l || 3, lastpos];
    textItem.contents = cap ? capitalize(name) : name;
    let myColor = new SolidColor
    myColor.rgb.red = color.red
    myColor.rgb.green = color.green
    myColor.rgb.blue = color.blue
    textItem.color = myColor
    textItem.width = new UnitValue(w || 100,"mm");
    textItem.height = new UnitValue(h || 10 ,"mm");
    lastpos++
}

const addDescription = () => {
  lastpos++
  let name = `Este documento es una referencia de la paleta de colores del diseño adjunto, el orden de los cuadros se sigue de arriba hacia abajo.`
  let color = { red:0, green:0, blue:0}
  let options = { name, color, h:180, w:180, l:1 }
  textLayer(options)
}

const addTitle = () => {
  let name = "PALETA:";
  let color = { red:0, green:0, blue:0}
  let options = { name ,color, h:20, size: 50, l:1 }
  textLayer(options)
  lastpos++
}

const capitalize = string => {
  if (typeof string !== 'string') return ''
  return string.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export { drawShape, textLayer, addDescription, addTitle }