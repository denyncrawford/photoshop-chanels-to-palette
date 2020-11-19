(function () {
  'use strict';

  var _map = function _map(array, callback) {
    var newArray = [];

    for (var i = 0; i < array.length; i++) {
      newArray.push(callback(array[i], i, array));
    }

    return newArray;
  };

  var drawShape = function drawShape(args, color) {
    var doc = app.activeDocument;
    var y = args.length;
    var i = 0;
    var docCoef = doc.resolution / 72;
    args = _map(args, function (arr) {
      return _map(arr, function (coor) {
        return coor / docCoef;
      });
    });
    var lineArray = [];

    for (i = 0; i < y; i++) {
      lineArray[i] = new PathPointInfo();
      lineArray[i].kind = PointKind.CORNERPOINT;
      lineArray[i].anchor = args[i];
      lineArray[i].leftDirection = lineArray[i].anchor;
      lineArray[i].rightDirection = lineArray[i].anchor;
    }

    var lineSubPathArray = new SubPathInfo();
    lineSubPathArray.closed = true;
    lineSubPathArray.operation = ShapeOperation.SHAPEADD;
    lineSubPathArray.entireSubPath = lineArray;
    var myPathItem = doc.pathItems.add("myPath", [lineSubPathArray]);
    var desc88 = new ActionDescriptor();
    var ref60 = new ActionReference();
    ref60.putClass(stringIDToTypeID("contentLayer"));
    desc88.putReference(charIDToTypeID("null"), ref60);
    var desc89 = new ActionDescriptor();
    var desc90 = new ActionDescriptor();
    var desc91 = new ActionDescriptor();
    desc91.putDouble(charIDToTypeID("Rd  "), color.red); // R

    desc91.putDouble(charIDToTypeID("Grn "), color.green); // G

    desc91.putDouble(charIDToTypeID("Bl  "), color.blue); // B

    var id481 = charIDToTypeID("RGBC");
    desc90.putObject(charIDToTypeID("Clr "), id481, desc91);
    desc89.putObject(charIDToTypeID("Type"), stringIDToTypeID("solidColorLayer"), desc90);
    desc88.putObject(charIDToTypeID("Usng"), stringIDToTypeID("contentLayer"), desc89);
    executeAction(charIDToTypeID("Mk  "), desc88, DialogModes.NO);
    myPathItem.remove();
  };

  var lastpos = 1;

  var textLayer = function textLayer(_ref) {
    var name = _ref.name,
        color = _ref.color;
    var layers = app.activeDocument.artLayers;
    var layer = layers.add();
    layer.kind = LayerKind.TEXT;
    var textItem = layer.textItem;
    textItem.kind = TextType.PARAGRAPHTEXT;
    textItem.size = 30;
    textItem.position = [3, lastpos];
    textItem.contents = name;
    var myColor = new SolidColor();
    myColor.rgb.red = color.red;
    myColor.rgb.green = color.green;
    myColor.rgb.blue = color.blue;
    textItem.color = myColor;
    textItem.width = new UnitValue(100, "mm");
    textItem.height = new UnitValue(10, "mm");
    lastpos++;
  };

  var _map$1 = function _map(array, callback) {
    var newArray = [];

    for (var i = 0; i < array.length; i++) {
      newArray.push(callback(array[i], i, array));
    }

    return newArray;
  };

  var _forEach = function _forEach(array, callback) {
    for (var i = 0; i < array.length; i++) {
      callback(array[i], i, array);
    }
  };
  var doc = app.activeDocument;
  var myActiveChannels = doc.activeChannels || [];
  var channels = [];

  _forEach(myActiveChannels, function (channel) {
    var name = channel.name;
    var color = channel.kind == "ChannelType.SPOTCOLOR" ? channel.color.rgb : {};
    channels.push({
      name: name,
      color: color
    });
    $.write({
      name: name,
      color: color
    });
  });

  app.documents.add(21, 29, 300, "paleta", NewDocumentMode.RGB);

  var unit = function unit(u) {
    return 118.11 * u;
  };

  var y = [unit(1), unit(2), unit(2), unit(1)];

  _forEach(channels, function (channel) {
    textLayer(channel);
    drawShape([[unit(1), y[0]], [unit(1), y[1]], [unit(2), y[2]], [unit(2), y[3]]], channel.color);
    y = _map$1(y, function (el) {
      return el + unit(1);
    });
  });

}());
