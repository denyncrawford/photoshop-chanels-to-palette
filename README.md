# Photoshop channels to color pallete

*PCP* is a Photoshop script for getting spot colors from the document channels and place them in a new ready to print document. It is meant to work with the multichannel image mode. 

This is very helpful for secreen printing color samples.

## Installation

Clone this repo or download the file inside the `/dist` folder.

*Running once*: `File > Scripts > Browse and navigate to the pallettepicker.js’ file and the script will run.`

*Installing*: Copy the file into the Photoshop Scripts directory:
  - MacOS: `/Applications/Adobe Photoshop [VERSION]/Presets/Scripts/`
  - Windows: `C:/Program Files/Adobe/Adobe Photoshop [VERSION]/Presets/Scripts/`

Restart Photoshop. Installed script should appear under File > Scripts menu.

## Usage

1. Open a multichannel image photoshop project.
2. Make sure all your channels are spot-colors.
3. Select the channel you wanna get the palette:

![sample](https://imgur.com/cc0q55u.png)

3. Run the script
5. Do whatever you want with the generated palette.

## Screenshots

![multichannel](https://imgur.com/BiYhG3X.png)
![palette](https://imgur.com/zXzPdp0.png)

## How it works:

*PCP* takes the title and the RGB color mixture of your channel and generate a color palette in a different document with the taken data.

## Context

I do work a lot with photoshop and all the adobe suite for screen printing. I'm also a good coder (I hope).

## Warnings

This script only works on spot-color channels (not component), and it doesn't support not standard color libraries like PANTONE or COPIC, etc.

Make sure your colors are selected by the photoshop's color selector itself with RGB, CMYK and HEX.

## Development

1. Install all the dependencies

`$ npm install`

2. Install rollup

`$ npm install -g rollup`

3. Make some changes

4. Run this command to build the bundle.

 `$ npm run build`

5. If you want to automatic build when any file inside `/src` changes, then run:

`$ gulp`