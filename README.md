# Bootstrap Theme Builder

Welcome to the Bootstrap Theme Builder, a customizable solution to create unique Bootstrap themes effortlessly.

![banner](https://github.com/Mending-Electronics/Bootstrap-Theme-Builder/blob/main/.illustration/dessin.png?raw=true "banner")

## Overview

Bootstrap Theme Builder allows developers and designers to create, modify, and preview Bootstrap themes directly in the browser. With built-in support for popular fonts and custom color schemes, you can create stunning web themes that match your brand's identity.

## Features

- **Brand Logo Integration**: Import your vector brand logo to use it with a simple class.
- **Define a Pattern Style**: Import a vector design to customize footers, banners, and more.
- **Font Integration**: Seamlessly integrate popular fonts like Roboto, Century Gothic, Open Sans, Nunito, Fredoka, and more.
- **Custom Color Schemes**: Define custom color palettes and apply them to various Bootstrap components.
- **Real-Time Preview**: Instantly preview your changes and see how they affect the overall theme.
- **SCSS Generation**: Generate SCSS code with all your customizations to use directly in your projects.
- **Responsive Design**: Ensure your themes look great on all devices.

## Getting Started

**Video tutorial:**

[Video](https://youtu.be/iopyB2RYo24)


### Prerequisites

- SASS Preprocessor tool

### Installation

**SASS Preprocessor Installation:**

SASS: a preprocessor used to convert *.scss or *.sass files to *.css

- Install the "Live Sass Compiler" extension for Visual Studio Code: [Live Sass Compiler](https://github.com/glenn2223/vscode-live-sass-compiler)
- Configure the Live SASS Compiler's `settings.json`:

```json
"liveSassCompile.settings.forceBaseDirectory": "",
"liveSassCompile.settings.formats": [
    {
        "format": "compressed",
        "extensionName": ".min.css",
        "savePath": "/css",
        "savePathReplacementPairs": null
    }
],
"liveSassCompile.settings.rootIsWorkspace": null,
"liveSassCompile.settings.generateMap": false,
"liveSassCompile.settings.autoprefix": []
```
- Click on "Watch Sass" in the bottom Visual Studio Code bar to start the SASS compiler.


**Clone the repository:**

```bash
git clone https://github.com/Mending-Electronics/Bootstrap-Theme-Builder.git
cd Bootstrap-Theme-Builder
```


## How to Use

**Bootstrap Theme Builder**: "App.html"

1. **Select your brand logo as SVG** to embed it as a URI into a CSS class.
   - ✅ Eliminate external dependency on the brand logo image file.
   - ✅ Easily call it with the simple class 'svg-logo'.
   - ✅ Use filter classes to change the logo color (filter-primary, filter-secondary, filter-white, etc.).

2. **Select a small SVG illustration** to embed it as a URI into a CSS class and use it as a pattern.
   - ✅ Eliminate external dependency on a pattern image file.
   - ✅ Easily call it with the simple class 'pattern'.
   - ✅ Use filter classes to change the pattern color (filter-primary, filter-primary-emphasis, filter-secondary, filter-white, etc.).

3. **Select a main font** to apply it to your entire website, creating stunning web themes that match your brand's identity.
   - Select a font from the select menu, or type the name of the font and click the search button to obtain the font CDN URL from common CDN platforms if the font is available.
   - ✅ Eliminate external dependencies on *.ttf or *.woff font files.
   - ✅ The font @import url function and each font class will be generated as SCSS, easily callable by class (font-family-main, font-family-main-regular, font-family-main-medium, font-family-main-bold).

4. **Select a brand font** to apply it to your brand text name, creating stunning web themes that match your brand's identity.
   - Select a font from the select menu, or type the name of the font and click the search button to obtain the font CDN URL from common CDN platforms if the font is available.
   - ✅ Eliminate external dependencies on *.ttf or *.woff font files.
   - ✅ The font @import url function and each font class will be generated as SCSS, easily callable by class (font-family-brand, font-family-brand-regular, font-family-brand-medium, font-family-brand-bold).

5. **Select colors** to create stunning web themes that match your brand's identity.
   - Click on colored cards and use the picker to get the color of your or your customer's graphic chart.
   - Use the Gradient Color Picker tool to define grad-1, grad-2, grad-3, grad-4 classes.
   - Save the color palette into your web browser's local storage or export it as *.json.
   - Import a *.json palette color config generated by this app.
   - ✅ These colors will be used to edit existing and generate more text and background Bootstrap color palette classes (text-primary, bg-primary).
   - ✅ These colors will be used to edit existing and generate more text and background emphasis Bootstrap color palette classes (text-primary-emphasis, bg-primary-emphasis).
   - ✅ These colors will be used to generate filters and emphasis filters to change vector assets' color (filter-primary, filter-primary-emphasis).

6. **Generate SCSS code.**
   - ℹ️ The SVG logo or SVG pattern conversion process to URI takes around 40 seconds. 
   - ℹ️ The filter generation process to obtain CSS filter properties with < 1% loss takes around 10 seconds.
   - Copy/paste or replace your previously generated code into the "_variables.scss" file (A comment in the file says 'Place the code here').
   - Copy/paste or replace your previously generated code into the "bootstrap.scss" file (A comment in the file says 'Place the code here').
   - Start SASS Watch and view the result on "code-picker.html".

Bootstrap 5.3 Code Picker output example based on Bootswatch's code picker project 🙂 

Bootstrap-5-Rounded-theme :

[My Mending Electronics Bootstrap Theme Sample](https://htmlpreview.github.io/?https://raw.githubusercontent.com/Mending-Electronics/Bootstrap-Theme-Builder/Bootstrap-5-Rounded-theme/refs/heads/main/code-picker-mending-electronics.html)

[Custom Bootstrap Theme Sample](https://htmlpreview.github.io/?https://raw.githubusercontent.com/Mending-Electronics/Bootstrap-Theme-Builder/Bootstrap-5-Rounded-theme/refs/heads/main/code-picker.html)


Bootstrap-5-Straight-theme :

[Custom Bootstrap Theme Sample](https://htmlpreview.github.io/?https://raw.githubusercontent.com/Mending-Electronics/Bootstrap-Theme-Builder/Bootstrap-5-Straight-theme/refs/heads/main/code-picker.html)

Built with 💻 and ☕ by Mending Electronics.
