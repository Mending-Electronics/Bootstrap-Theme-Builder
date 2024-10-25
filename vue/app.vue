const { createApp } = Vue;

createApp({
    data() {
        return {
            colors: {
                primary     : '#0D6986',
                secondary   : '#6C757D',
                third       : '#21224B',
                dark        : '#343A40',
                light       : '#F8F9FA',
                white       : '#FFFFFF',
                grad1       : '#8ca41d',
                grad2       : '#718428',
                grad3       : '#576334',
                grad4       : '#21224b',
                gradG1      : '#9698A2',
                gradG2      : '#575A6B',
                success     : '#198754',
                info        : '#0DCAF0',
                warning     : '#FFC107',
                danger      : '#DC3545',
                magenta     : '#ae2573',
                brown       : '#978c87',
                grey        : '#e4e4e8',
                darkGrey    : '#515569',
                blue        : '#0D6EFD',
                indigo      : '#6610F2',
                purple      : '#6F42C1',
                pink        : '#D63384',
                red         : '#D9534F',
                orange      : '#FD7E14',
                yellow      : '#FFd505',
                green       : '#28A745',
                teal        : '#20C997',
                cyan        : '#17A2B8'
            
            },
            fontFamilyMain: '',
            fontFamilyBrand: '',
            variablesScssCode: '',
            bootstrapScssCode: '',
            isLoading: false,
            svgLogoDataUri: '',
            svgPatternDataUri: ''
        };
    },

    watch: {
        fontFamilyMain(newFont) {
            this.updateFont('fontFamilyMainSample', newFont);
        },
        fontFamilyBrand(newFont) {
            this.updateFont('fontFamilyBrandSample', newFont);
        }
    },

    methods: {
        hexToRgb(hex) {
            const bigint = parseInt(hex.replace('#', ''), 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;
            return `${r}, ${g}, ${b}`;
        },

        updateFont(elementId, fontName) {
            if (!fontName) return;
    
            let fontUrl;
            if (this.isGoogleFont(fontName)) {
                fontUrl = `https://fonts.googleapis.com/css2?family=${fontName.replace(' ', '+')}:wght@400&display=swap`;
            } else {
                fontUrl = `https://use.typekit.net/your-adobe-font-kit-id.css`; // Replace with your Adobe Fonts kit ID
            }
    
            const style = document.createElement('style');
            style.innerHTML = `@import url('${fontUrl}');`;
            document.head.appendChild(style);
            document.getElementById(elementId).querySelector('h2').style.fontFamily = `"${fontName}", sans-serif`;
        },

        isGoogleFont(fontName) {
            const googleFonts = ["Roboto", "Open Sans", "Nunito"]; // Add more Google Fonts here
            return googleFonts.includes(fontName);
        },

        resetFontFamilyMain() {
            this.fontFamilyMain = '';
            document.getElementById('fontFamilyMainSample').querySelector('h2').style.fontFamily = '';
        },
        resetFontFamilyBrand() {
            this.fontFamilyBrand = '';
            document.getElementById('fontFamilyBrandSample').querySelector('h2').style.fontFamily = '';
        },

        generateSCSS() {
            this.isLoading = true; // Start loading

            setTimeout(() => {

                let scss = `// Place this parts of the code into _variables.scss\n// ********************************************\n`;


                scss += `\n// COLOR\n// ********************************************\n`;

                // Main Colors HEX
                scss += `\n// Main Colors HEX\n`;
                scss += `$primary    :${this.colors.primary} !default;\n`;
                scss += `$secondary  :${this.colors.secondary} !default;\n`;
                scss += `$third      :${this.colors.third} !default;\n`;

                // Main Colors RGB
                scss += `\n// Main Colors RGB\n`;
                const primaryRgb = this.hexToRgb(this.colors.primary);
                const secondaryRgb = this.hexToRgb(this.colors.secondary);
                const thirdRgb = this.hexToRgb(this.colors.third);
                scss += `$primary-rgb   : rgb(${primaryRgb});\n`;
                scss += `$primary-rgba  : rgba(${primaryRgb}, 0.35);\n`;
                scss += `$secondary-rgb : rgb(${secondaryRgb});\n`;
                scss += `$secondary-rgba: rgba(${secondaryRgb}, 0.35);\n`;
                scss += `$third-rgb     : rgb(${thirdRgb});\n`;
                scss += `$third-rgba    : rgba(${thirdRgb}, 0.35);\n`;

                // States Colors
                scss += `\n// States Colors\n`;
                scss += `$success   : ${this.colors.success} !default;\n`;
                scss += `$info      : ${this.colors.info} !default;\n`;
                scss += `$warning   : ${this.colors.warning} !default;\n`;
                scss += `$danger    : ${this.colors.danger} !default;\n`;

                // Theme Colors
                scss += `\n// Theme Colors\n`;
                scss += `$dark      : ${this.colors.dark} !default;\n`;
                scss += `$light     : ${this.colors.light} !default;\n`;

                // Gradient Colors
                scss += `\n// Gradient Colors\n`;
                scss += `$grad-1     : ${this.colors.grad1} !default;\n`;
                scss += `$grad-2     : ${this.colors.grad2} !default;\n`;
                scss += `$grad-3     : ${this.colors.grad3} !default;\n`;
                scss += `$grad-4     : ${this.colors.grad4} !default;\n`;
                scss += `$grad-g1    : ${this.colors.gradG1} !default;\n`;
                scss += `$grad-g2    : ${this.colors.gradG2} !default;\n`;

                // Grey Colors
                scss += `\n// Grey Colors\n`;
                scss += `$grey      : ${this.colors.grey} !default;\n`;
                scss += `$dark-grey : ${this.colors.darkGrey} !default;\n`;

                // Others
                scss += `\n// Others\n`;
                scss += `$blue      : ${this.colors.blue} !default;\n`;
                scss += `$indigo    : ${this.colors.indigo} !default;\n`;
                scss += `$purple    : ${this.colors.purple} !default;\n`;
                scss += `$pink      : ${this.colors.pink} !default;\n`;
                scss += `$magenta   : ${this.colors.magenta} !default;\n`;
                scss += `$brown     : ${this.colors.brown} !default;\n`;
                scss += `$red       : ${this.colors.red} !default;\n`;
                scss += `$orange    : ${this.colors.orange} !default;\n`;
                scss += `$yellow    : ${this.colors.yellow} !default;\n`;
                scss += `$green     : ${this.colors.green} !default;\n`;
                scss += `$teal      : ${this.colors.teal} !default;\n`;
                scss += `$cyan      : ${this.colors.cyan} !default;\n`;
                scss += `$white     : ${this.colors.white} !default;\n`;

                // Grey Gradient Colors
                scss += `\n// Grey Gradient Colors\n`;
                scss += `$white:    #fff !default;\n`;
                scss += `$gray-100: #ebebeb !default;\n`;
                scss += `$gray-200: #dee2e6 !default;\n`;
                scss += `$gray-300: #ced4da !default;\n`;
                scss += `$gray-400: #adb5bd !default;\n`;
                scss += `$gray-500: #868e96 !default;\n`;
                scss += `$gray-600: #4e5d6c !default;\n`;
                scss += `$gray-700: #495057 !default;\n`;
                scss += `$gray-800: #343a40 !default;\n`;
                scss += `$gray-900: #212529 !default;\n`;
                scss += `$black:    #000 !default;\n`;

                // Theme Colors List
                scss += `\n// Theme Colors List\n`;
                scss += `$theme-colors: (\n`;
                for (const [key, value] of Object.entries(this.colors)) {
                    let formattedKey = key.replace('grad1', 'grad-1')
                                        .replace('grad2', 'grad-2')
                                        .replace('grad3', 'grad-3')
                                        .replace('grad4', 'grad-4')
                                        .replace('gradG1', 'grad-g1')
                                        .replace('gradG2', 'grad-g2')
                                        .replace('darkGrey', 'dark-grey');
                
                    if (formattedKey.length <= 5) {
                        scss += `\t'${formattedKey}'\t\t: ${value},\n`;
                    } else {
                        scss += `\t'${formattedKey}'\t: ${value},\n`;
                    }
                }
                scss += `);\n`;

                this.variablesScssCode = scss;
                
                scss = '';



                scss += `\n\n// Place this parts of the code into bootstrap.scss\n// ********************************************\n`;

                // Generate emphasis Text and Background colors
                scss += `\n// Generate emphasis Text and Background colors\n`;
                scss += `@function tint($color, $percentage) {\n`;
                scss += `\t@return mix(white, $color, $percentage);\n`;
                scss += `}\n\n`;

                for (const [key, value] of Object.entries(this.colors)) {
                    let formattedKey = key.replace('grad1', 'grad-1')
                                        .replace('grad2', 'grad-2')
                                        .replace('grad3', 'grad-3')
                                        .replace('grad4', 'grad-4')
                                        .replace('gradG1', 'grad-g1')
                                        .replace('gradG2', 'grad-g2')
                                        .replace('darkGrey', 'dark-grey');
                
                    if (formattedKey.length <= 4) {
                        scss += `.text-${formattedKey}-emphasis\t\t\t\t{color: tint($${formattedKey}, 40%) !important};\n`;
                    } 
                    else if (formattedKey.length <= 7) {
                        scss += `.text-${formattedKey}-emphasis\t\t\t{color: tint($${formattedKey}, 40%) !important};\n`;
                    }
                    else {
                        scss += `.text-${formattedKey}-emphasis\t\t{color: tint($${formattedKey}, 40%) !important};\n`;
                    }
                    
            
                }
                
                scss += `\n$light-text-emphasis:          $gray-100 !default;\n`;
                scss += `$dark-text-emphasis:           $gray-300 !default;\n\n`;


                for (const [key, value] of Object.entries(this.colors)) {
                    let formattedKey = key.replace('grad1', 'grad-1')
                                        .replace('grad2', 'grad-2')
                                        .replace('grad3', 'grad-3')
                                        .replace('grad4', 'grad-4')
                                        .replace('gradG1', 'grad-g1')
                                        .replace('gradG2', 'grad-g2')
                                        .replace('darkGrey', 'dark-grey');
                
                    if (formattedKey.length <= 6) {
                        scss += `.bg-${formattedKey}-emphasis\t\t\t\t{background-color: tint($${formattedKey}, 40%) !important; color: white};\n`;
                    } 
                    else  {
                        scss += `.bg-${formattedKey}-emphasis\t\t\t{background-color: tint($${formattedKey}, 40%) !important; color: white};\n`;
                    }
                    
            
                }





                // Generate Filters
                scss += `\n// Generate Filters (ex : use filter-primary to change svg fill color) \n`;
                scss += `$filters: (\n`;
                for (const [key, value] of Object.entries(this.colors)) {
                    let formattedKey = key.replace('grad1', 'grad-1')
                                        .replace('grad2', 'grad-2')
                                        .replace('grad3', 'grad-3')
                                        .replace('grad4', 'grad-4')
                                        .replace('gradG1', 'grad-g1')
                                        .replace('gradG2', 'grad-g2')
                                        .replace('darkGrey', 'dark-grey');

                    let filterResult;
                    let lossResult;


                    do {
                        const result = generateFilter(value);
                        if (!result) {
                        break; // Exit if the result is invalid
                        }
                        filterResult = result.filter;
                        lossResult = result.loss;
                    } while (lossResult > 1);



                    if (formattedKey.length <= 6) {
                        scss += `\t$${formattedKey}\t\t: "${filterResult}",\t// Loss ${lossResult}\n`;
                    } else {
                        scss += `\t$${formattedKey}\t: "${filterResult}",\t//Loss ${lossResult}\n`;
                    }
                }
                scss += `);\n`;

                scss += `@each $color-name, $color in $theme-colors {\n`;
                scss += `  $filter: map-get($filters, $color);\n`;
                scss += `  .filter-#{$color-name} {\n`;
                scss += `    filter: unquote($filter);\n`;
                scss += `  }\n`;
                scss += `}\n`;

                scss += `// ********************************************\n\n`;



                scss += `\n// Fonts\n// \n`;
                if (this.fontFamilyMain) {
                    // scss += `\n// Font Family Main\n@import url('https://fonts.googleapis.com/css2?family=${this.fontFamilyMain.replace(' ', '+')}:wght@400&display=swap');\nbody { font-family: "${this.fontFamilyMain}", sans-serif; }\n`;
                        
                    if (this.isGoogleFont(this.fontFamilyMain)) {
                        scss += `\n// Font Family Main\n@import url('https://fonts.googleapis.com/css2?family=${this.fontFamilyMain.replace(' ', '+')}:wght@400&display=swap');\nbody { font-family: "${this.fontFamilyMain}", sans-serif; }\n`;
                    } else {
                        scss += `\n// Font Family Main\n@import url('https://use.typekit.net/your-adobe-font-kit-id.css');\nbody { font-family: "${this.fontFamilyMain}", sans-serif; }\n`;
                    }
                
                    // Generate CSS classes
                    scss += `
                    .font-family-main-thin {
                    font-family: "${this.fontFamilyMain}", sans-serif;
                    font-weight: 100;
                    font-style: normal;
                    }
                    .font-family-main-light {
                    font-family: "${this.fontFamilyMain}", sans-serif;
                    font-weight: 300;
                    font-style: normal;
                    }
                    .font-family-main-regular {
                    font-family: "${this.fontFamilyMain}", sans-serif;
                    font-weight: 400;
                    font-style: normal;
                    }
                    .font-family-main-medium {
                    font-family: "${this.fontFamilyMain}", sans-serif;
                    font-weight: 500;
                    font-style: normal;
                    }
                    .font-family-main-bold {
                    font-family: "${this.fontFamilyMain}", sans-serif;
                    font-weight: 700;
                    font-style: normal;
                    }
                    .font-family-main-black {
                    font-family: "${this.fontFamilyMain}", sans-serif;
                    font-weight: 900;
                    font-style: normal;
                    }
                    .font-family-main-thin-italic {
                    font-family: "${this.fontFamilyMain}", sans-serif;
                    font-weight: 100;
                    font-style: italic;
                    }
                    .font-family-main-light-italic {
                    font-family: "${this.fontFamilyMain}", sans-serif;
                    font-weight: 300;
                    font-style: italic;
                    }
                    .font-family-main-regular-italic {
                    font-family: "${this.fontFamilyMain}", sans-serif;
                    font-weight: 400;
                    font-style: italic;
                    }
                    .font-family-main-medium-italic {
                    font-family: "${this.fontFamilyMain}", sans-serif;
                    font-weight: 500;
                    font-style: italic;
                    }
                    .font-family-main-bold-italic {
                    font-family: "${this.fontFamilyMain}", sans-serif;
                    font-weight: 700;
                    font-style: italic;
                    }
                    .font-family-main-black-italic {
                    font-family: "${this.fontFamilyMain}", sans-serif;
                    font-weight: 900;
                    font-style: italic;
                    }\n`;
                               
                
                }

                if (this.fontFamilyBrand) {
                    // scss += `\n// Font Family Brand\n@import url('https://fonts.googleapis.com/css2?family=${this.fontFamilyBrand.replace(' ', '+')}:wght@400&display=swap');\n.brand { font-family: "${this.fontFamilyBrand}", sans-serif; }\n`;
                    
                    if (this.isGoogleFont(this.fontFamilyBrand)) {
                        scss += `\n// Font Family Brand\n@import url('https://fonts.googleapis.com/css2?family=${this.fontFamilyBrand.replace(' ', '+')}:wght@400&display=swap');\nbody { font-family: "${this.fontFamilyBrand}", sans-serif; }\n`;
                    } else {
                        scss += `\n// Font Family Brand\n@import url('https://use.typekit.net/your-adobe-font-kit-id.css');\nbody { font-family: "${this.fontFamilyBrand}", sans-serif; }\n`;
                    }

                    // Generate CSS classes
                    scss += `
                    .font-family-brand-thin {
                    font-family: "${this.fontFamilyBrand}", sans-serif;
                    font-weight: 100;
                    font-style: normal;
                    }
                    .font-family-brand-light {
                    font-family: "${this.fontFamilyBrand}", sans-serif;
                    font-weight: 300;
                    font-style: normal;
                    }
                    .font-family-brand-regular {
                    font-family: "${this.fontFamilyBrand}", sans-serif;
                    font-weight: 400;
                    font-style: normal;
                    }
                    .font-family-brand-medium {
                    font-family: "${this.fontFamilyBrand}", sans-serif;
                    font-weight: 500;
                    font-style: normal;
                    }
                    .font-family-brand-bold {
                    font-family: "${this.fontFamilyBrand}", sans-serif;
                    font-weight: 700;
                    font-style: normal;
                    }
                    .font-family-brand-black {
                    font-family: "${this.fontFamilyBrand}", sans-serif;
                    font-weight: 900;
                    font-style: normal;
                    }
                    .font-family-brand-thin-italic {
                    font-family: "${this.fontFamilyBrand}", sans-serif;
                    font-weight: 100;
                    font-style: italic;
                    }
                    .font-family-brand-light-italic {
                    font-family: "${this.fontFamilyBrand}", sans-serif;
                    font-weight: 300;
                    font-style: italic;
                    }
                    .font-family-brand-regular-italic {
                    font-family: "${this.fontFamilyBrand}", sans-serif;
                    font-weight: 400;
                    font-style: italic;
                    }
                    .font-family-brand-medium-italic {
                    font-family: "${this.fontFamilyBrand}", sans-serif;
                    font-weight: 500;
                    font-style: italic;
                    }
                    .font-family-brand-bold-italic {
                    font-family: "${this.fontFamilyBrand}", sans-serif;
                    font-weight: 700;
                    font-style: italic;
                    }
                    .font-family-brand-black-italic {
                    font-family: "${this.fontFamilyBrand}", sans-serif;
                    font-weight: 900;
                    font-style: italic;
                    }\n`;
                           

                }


                scss += `// ********************************************\n\n`;

                
                // Existing SVG to URI conversion and SCSS generation logic
                if (this.svgLogoDataUri || this.svgPatternDataUri) {

                    console.log("Start SVG Logo to URI Conversion ");

                    setTimeout(() => {
    
                        // Existing SCSS generation logic for logo
                        if (this.svgLogoDataUri) {
                            
                            scss += `\n// Logo (svg-logo)\n`;
                            scss += `@mixin svg-logo($width, $height) {
                                background-image: url(${this.svgLogoDataUri});
                                background-repeat: no-repeat;
                                background-size: contain;
                                width: $width;
                                height: $height;
                            }\n`;
    
                            scss += `.svg-logo\t\t{@include svg-logo(30px, 30px);}\n`;
                            scss += `.svg-logo-25\t{@include svg-logo(25%, 25%);}\n`;
                            scss += `.svg-logo-50\t{@include svg-logo(50%, 50%);}\n`;
                            scss += `.svg-logo-75\t{@include svg-logo(75%, 75%);}\n`;
                            scss += `.svg-logo-100\t{@include svg-logo(100%, 100%);}\n`;
                        }
    
                        // New SCSS generation logic for pattern
                        if (this.svgPatternDataUri) {

                            scss += `\n// Pattern (svg-pattern)\n`;
                            scss += `@mixin svg-pattern($width, $height) {
                                background-image: url(${this.svgPatternDataUri});
                                background-repeat: repeat;
                                background-size: 20px;
                                width: $width;
                                height: $height;
                            }\n`;
    
                            scss += `.pattern\t\t{@include svg-pattern(100%, 60px);}\n`;
                            scss += `.pattern-25\t{@include svg-pattern(25%, 60px);}\n`;
                            scss += `.pattern-50\t{@include svg-pattern(50%, 60px);}\n`;
                            scss += `.pattern-75\t{@include svg-pattern(75%, 60px);}\n`;
                            scss += `.pattern-100\t{@include svg-pattern(100%, 60px);}\n`;
                        }
    
                        scss += `// ********************************************\n\n`;
    
                        this.bootstrapScssCode = scss;
                        this.isLoading = false; // Stop loading
    
                        // Trigger modal display
                        const scssModal = new bootstrap.Modal(document.getElementById('scssModal'));
                        scssModal.show();
                    }, 35000); // Delay for logo or pattern conversion
                } else {
                    
                        this.bootstrapScssCode = scss;
                        this.isLoading = false; // Stop loading

                        // Trigger modal display
                        const scssModal = new bootstrap.Modal(document.getElementById('scssModal'));
                        scssModal.show();
                    
                }
            }, 2000); // Adjust the delay as needed
        
        },
        saveToLocalStorage() {
            localStorage.setItem('colorsConfig', JSON.stringify(this.colors));
            alert('Colors configuration saved to local storage.');
        },
        downloadJsonConfig() {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.colors));
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", "colorsConfig.json");
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        },
        importJsonConfig(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = JSON.parse(e.target.result);
                this.colors = result;
            };
            reader.readAsText(file);
        },
        loadFromLocalStorage() {
            const storedColors = localStorage.getItem('colorsConfig');
            if (storedColors) {
                this.colors = JSON.parse(storedColors);
            }
        },
        chooseFile() {
            document.getElementById('customFile').click();
        },
        importSvgLogo(event) {
            const file = event.target.files[0];
            if (file && file.type === 'image/svg+xml') {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.svgLogoDataUri = e.target.result;
                    this.displaySvgPreview(this.svgLogoDataUri);
                };
                reader.readAsDataURL(file);
            } else {
                alert('Please upload a valid SVG file.');
            }
        },
        displaySvgPreview(svgUri) {
            const previewsContainer = document.getElementById('imagePreviews');
            previewsContainer.innerHTML = ''; // Clear previous previews
            const preview = document.createElement('div');
            preview.classList.add('col-md-4', 'mb-3');
            preview.innerHTML = `<img src="${svgUri}" alt="SVG Preview" class="img-fluid rounded">
                                <div class="text-center mt-2">
                                <span class="badge bg-secondary">SVG Logo</span>
                                </div>`;
            previewsContainer.appendChild(preview);
        },
        importSvgPattern(event) {
            const file = event.target.files[0];
            if (file && file.type === 'image/svg+xml') {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.svgPatternDataUri = e.target.result;
                    this.displaySvgPreviewPattern(this.svgPatternDataUri);
                };
                reader.readAsDataURL(file);
            } else {
                alert('Please upload a valid SVG file.');
            }
        },
        displaySvgPreviewPattern(svgUri) {
            const previewsContainer = document.getElementById('imagePreviewsPattern');
            previewsContainer.innerHTML = ''; // Clear previous previews
            const preview = document.createElement('div');
            preview.classList.add('col-md-4', 'mb-3');
            preview.innerHTML = `<img src="${svgUri}" alt="SVG Preview" class="img-fluid rounded">
                                <div class="text-center mt-2">
                                <span class="badge bg-secondary">SVG Logo</span>
                                </div>`;
            previewsContainer.appendChild(preview);
        }
    },
    mounted() {
        this.loadFromLocalStorage();
    }
}).mount('#app');
