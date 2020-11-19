(function () {
  'use strict';

  var _map = function _map(array, callback) {
    var newArray = [];

    for (var i = 0; i < array.length; i++) {
      newArray.push(callback(array[i], i, array));
    }

    return newArray;
  };

  var originalDocName = app.activeDocument.name;

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
        color = _ref.color,
        h = _ref.h,
        w = _ref.w,
        size = _ref.size,
        l = _ref.l,
        cap = _ref.cap;
    var layers = app.activeDocument.artLayers;
    var layer = layers.add();
    layer.kind = LayerKind.TEXT;
    var textItem = layer.textItem;
    textItem.kind = TextType.PARAGRAPHTEXT;
    textItem.size = size || 30;
    textItem.position = [l || 3, lastpos];
    textItem.contents = cap ? capitalize(name) : name;
    var myColor = new SolidColor();
    myColor.rgb.red = color.red;
    myColor.rgb.green = color.green;
    myColor.rgb.blue = color.blue;
    textItem.color = myColor;
    textItem.width = new UnitValue(w || 100, "mm");
    textItem.height = new UnitValue(h || 10, "mm");
    lastpos++;
  };

  var addDescription = function addDescription() {
    lastpos++;
    var name = "Este documento es una referencia de la paleta de colores del dise\xF1o adjunto.";
    var color = {
      red: 0,
      green: 0,
      blue: 0
    };
    var options = {
      name: name,
      color: color,
      h: 180,
      w: 180,
      l: 1
    };
    textLayer(options);
  };

  var strokeAll = function strokeAll() {
    app.preferences.rulerUnits = Units.PIXELS;
    var strokeColor = new SolidColor();
    strokeColor.cmyk.cyan = 0;
    strokeColor.cmyk.magenta = 0;
    strokeColor.cmyk.yellow = 0;
    strokeColor.cmyk.black = 100;
    app.activeDocument.selection.selectAll();
    app.activeDocument.selection.stroke(strokeColor, 2, StrokeLocation.INSIDE);
    app.activeDocument.selection.deselect();
    app.preferences.rulerUnits = Units.CM;
  };

  var addTitle = function addTitle() {
    var name = "PALETA:";
    var color = {
      red: 0,
      green: 0,
      blue: 0
    };
    var options = {
      name: name,
      color: color,
      h: 20,
      size: 50,
      l: 1
    };
    textLayer(options);
    lastpos++;
  };

  var capitalize = function capitalize(string) {
    if (typeof string !== 'string') return '';
    return _map(string.split(" "), function (w) {
      return w.charAt(0).toUpperCase() + w.slice(1);
    }).join(" ");
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
      color: color,
      cap: true
    });
  });

  app.documents.add(21, 29, 300, "paleta", NewDocumentMode.RGB);

  var unit = function unit(u) {
    return 118.11 * u;
  };

  var y = [unit(3), unit(4), unit(4), unit(3)];
  addTitle();

  _forEach(channels, function (channel) {
    textLayer(channel);
    drawShape([[unit(1), y[0]], [unit(1), y[1]], [unit(2), y[2]], [unit(2), y[3]]], channel.color);
    y = _map$1(y, function (el) {
      return el + unit(1);
    });
  });

  addDescription();
  strokeAll();

}());
