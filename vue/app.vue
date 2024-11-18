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
            fontFamilyMainUrls: [],
            fontFamilyBrand: '',
            fontFamilyBrandUrls: [],
            variablesScssCode: '',
            bootstrapScssCode: '',
            isLoading: false,
            svgLogoDataUri: '',
            svgLogoWidth: 0, 
            svgLogoHeight: 0,
            svgPatternDataUri: '',
            FontFamilyMainInitialized: false, // Add a flag to track initialization
            FontFamilyBrandInitialized: false, // Add a flag to track initialization
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

        InitializationFontFamilyMain() { 
            this.FontFamilyMainInitialized = true; 
        },
        InitializationFontFamilyBrand() { 
            this.FontFamilyBrandInitialized = true; 
        },

        hexToRgb(hex) {
            const bigint = parseInt(hex.replace('#', ''), 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;
            return `${r}, ${g}, ${b}`;
        },

        async searchFontFamilyMain() {
            const fontName = this.fontFamilyMain;
            this.fontFamilyMainUrls = [];
            const fontUrls = [];
            const googleFontUrl = `https://fonts.googleapis.com/css2?family=${fontName.replace(' ', '+')}&display=swap`;
            const cdnFontsUrl = `https://fonts.cdnfonts.com/css/${fontName.toLowerCase().replace(' ', '-')}`;

            const urlsToCheck = [googleFontUrl, cdnFontsUrl];

            for (const url of urlsToCheck) {
                try {
                    const response = await axios.get(url);
                    if (response.data.includes('@font-face')) {
                        fontUrls.push(url);
                    }
                } catch (error) {
                    console.error(`Error fetching ${url}:`, error);
                }
            }

            if (fontUrls.length === 0) {
                // alert('The font was not found');
                return this.fontFamilyMainUrls;
            }

            this.fontFamilyMainUrls = fontUrls;
            this.updateFont('fontFamilyMainSample', fontName);
            this.InitializationFontFamilyMain(); 
            // Show modal with links
            // this.showFontModal(fontUrls);
        },

        async searchFontFamilyBrand() {
            const fontName = this.fontFamilyBrand;
            this.fontFamilyBrandUrls = [];
            const fontUrls = [];
            const googleFontUrl = `https://fonts.googleapis.com/css2?family=${fontName.replace(' ', '+')}&display=swap`;
            const cdnFontsUrl = `https://fonts.cdnfonts.com/css/${fontName.toLowerCase().replace(' ', '-')}`;
            const urlsToCheck = [googleFontUrl, cdnFontsUrl];
    
            for (const url of urlsToCheck) {
                try {
                    const response = await axios.get(url);
                    if (response.data.includes('@font-face')) {
                        fontUrls.push(url);
                    }
                } catch (error) {
                    console.error(`Error fetching ${url}:`, error);
                }
            }
    
            if (fontUrls.length === 0) {
                // alert('The font was not found');
                return this.fontFamilyBrandUrls;
            }
    
            this.fontFamilyBrandUrls = fontUrls;
            this.updateFont('fontFamilyBrandSample', fontName);
            this.InitializationFontFamilyBrand(); 

            // Show modal with links
            // this.showFontModal(fontUrls);
        },

        
        showFontModal(fontUrls) {
            const modalBody = document.getElementById('modalBody');
            modalBody.innerHTML = ''; // Clear previous content

            fontUrls.forEach(url => {
                const link = document.createElement('a');
                link.href = url;
                link.target = "_blank";
                link.innerHTML = url;
                modalBody.appendChild(link);
                modalBody.appendChild(document.createElement('br'));
            });

            const fontModal = new bootstrap.Modal(document.getElementById('fontModal'));
            fontModal.show();
        },
    
        updateFont(elementId, fontName) {
            if (!fontName) return;
    
            let fontUrl;
            if (elementId === 'fontFamilyMainSample') {
                fontUrl = this.fontFamilyMainUrls[0];
            } else if (elementId === 'fontFamilyBrandSample') {
                fontUrl = this.fontFamilyBrandUrls[0];
            }

    
            const style = document.createElement('style');
            style.innerHTML = `@import url('${fontUrl}');`;
            document.head.appendChild(style);
            document.getElementById(elementId).querySelector('h2').style.fontFamily = `"${fontName}", sans-serif`;
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

            if (this.fontFamilyMainUrls.length == "0" ) {
                this.searchFontFamilyMain();
            }
            
            if (this.fontFamilyBrandUrls.length == "0" ) {
                this.searchFontFamilyBrand();
            }

            setTimeout(() => {



                let scss = ``;


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




                // Emphasis HEX Colors (for filter process)
                scss += `\n// Emphasis Colors\n`;
                for (const [key, value] of Object.entries(this.colors)) {
                    if (key != 'white') {
                        let formattedKey = key.replace('grad1', 'grad-1')
                                              .replace('grad2', 'grad-2')
                                              .replace('grad3', 'grad-3')
                                              .replace('grad4', 'grad-4')
                                              .replace('gradG1', 'grad-g1')
                                              .replace('gradG2', 'grad-g2')
                                              .replace('darkGrey', 'dark-grey');

                        let emphasisKey = `${formattedKey}-emphasis`;

                        // mix the color with the white color
                        let mixedColor = mixTwoColor(value, '#ffffff', .40);
                                        
                        if (formattedKey.length <= 5) {
                            scss += `$${formattedKey}-emphasis\t\t\t\t: ${mixedColor} !default;\n`;
                        } else if (formattedKey.length <= 7) {
                            scss += `$${formattedKey}-emphasis\t\t\t: ${mixedColor} !default;\n`;
                        } else {
                            scss += `$${formattedKey}-emphasis\t\t\t: ${mixedColor} !default;\n`;
                        }
                    }

                }





                // Theme Colors List
                scss += `\n// Theme Colors List\n`;
                scss += `$theme-colors: (\n`;

                // Std HEX Colors
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

                // Emphasis HEX Colors (for filter process)
                for (const [key, value] of Object.entries(this.colors)) {
                    if (key != 'white') {
                        let formattedKey = key.replace('grad1', 'grad-1')
                                            .replace('grad2', 'grad-2')
                                            .replace('grad3', 'grad-3')
                                            .replace('grad4', 'grad-4')
                                            .replace('gradG1', 'grad-g1')
                                            .replace('gradG2', 'grad-g2')
                                            .replace('darkGrey', 'dark-grey');

                        let emphasisKey = `${formattedKey}-emphasis`;

                        // mix the color with the white color
                        let mixedColor = mixTwoColor(value, '#ffffff', .40);
                                        
                        if (formattedKey.length <= 4) {
                            scss += `\t'${formattedKey}-emphasis'\t\t\t: ${mixedColor},\n`;
                        } else if (formattedKey.length <= 7) {
                            scss += `\t'${formattedKey}-emphasis'\t\t: ${mixedColor},\n`;
                        } else {
                            scss += `\t'${formattedKey}-emphasis'\t: ${mixedColor},\n`;
                        }
                    }
                }


                scss += `);\n`;

                this.variablesScssCode = scss;
                
                scss = '';


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

                // Generate Std Color Filters
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


                // Generate Emphasis Filters (apply the mix function)
                for (const [key, value] of Object.entries(this.colors)) {
                    if (key != 'white') {
                        let formattedKey = key.replace('grad1', 'grad-1')
                                            .replace('grad2', 'grad-2')
                                            .replace('grad3', 'grad-3')
                                            .replace('grad4', 'grad-4')
                                            .replace('gradG1', 'grad-g1')
                                            .replace('gradG2', 'grad-g2')
                                            .replace('darkGrey', 'dark-grey');

                        let emphasisKey = `${formattedKey}-emphasis`;

                        // mix the color with the white color
                        let mixedColor = mixTwoColor(value, '#ffffff', .40);

                        let filterResult;
                        let lossResult;

                        do {
                            const result = generateFilter(mixedColor);
                            if (!result) {
                            break; // Exit if the result is invalid
                            }
                            filterResult = result.filter;
                            lossResult = result.loss;
                        } while (lossResult > 1);

                        if (formattedKey.length <= 6) {
                            scss += `\t$${formattedKey}-emphasis\t\t: "${filterResult}",\t// Loss ${lossResult}\n`;
                        } else {
                            scss += `\t$${formattedKey}-emphasis\t: "${filterResult}",\t//Loss ${lossResult}\n`;
                        }
                    }
                }



                scss += `);\n`;

                scss += `@each $color-name, $color in $theme-colors {\n`;
                scss += `  $filter: map-get($filters, $color);\n`;
                scss += `  .filter-#{$color-name} {\n`;
                scss += `    filter: unquote($filter);\n`;
                scss += `  }\n`;
                scss += `}\n`;






                scss += `\n\n// Fonts\n`;
               

                // Import Bootstrap Icons Font
                scss += `\n// Import Bootstrap Icons\n`;
                scss += `@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");\n`;
                

                // Import Arial Font as default
                scss += `\n// Import Arial Font as default\n`;
                scss += `@import url('https://fonts.cdnfonts.com/css/arial');
                body {
                    font-family: 'arial', sans-serif;
                }
                `;
                

                if (this.fontFamilyMainUrls.length) {
                    scss += `\n// Font Family Main (as default)\n`;
                    this.fontFamilyMainUrls.forEach(url => {
                        scss += `@import url('${url}');\n`;
                    });
                    scss += `body {\n`;
                    scss += `    font-family: '${this.fontFamilyMain}', 'arial', sans-serif;\n`;
                    scss += `}\n`;
                    scss += `.font-family-main {\n`;
                    scss += `    font-family: '${this.fontFamilyMain}', 'arial', sans-serif;\n`;
                    scss += `}\n`;
                
                    // Generate CSS classes
                    scss += `
                    .font-family-main-thin {
                    font-family: "${this.fontFamilyMain}", 'arial', sans-serif;
                    font-weight: 100;
                    font-style: normal;
                    }
                    .font-family-main-light {
                    font-family: "${this.fontFamilyMain}", 'arial', sans-serif;
                    font-weight: 300;
                    font-style: normal;
                    }
                    .font-family-main-regular {
                    font-family: "${this.fontFamilyMain}", 'arial', sans-serif;
                    font-weight: 400;
                    font-style: normal;
                    }
                    .font-family-main-medium {
                    font-family: "${this.fontFamilyMain}", 'arial', sans-serif;
                    font-weight: 500;
                    font-style: normal;
                    }
                    .font-family-main-bold {
                    font-family: "${this.fontFamilyMain}", 'arial', sans-serif;
                    font-weight: 700;
                    font-style: normal;
                    }
                    .font-family-main-black {
                    font-family: "${this.fontFamilyMain}", 'arial', sans-serif;
                    font-weight: 900;
                    font-style: normal;
                    }
                    .font-family-main-thin-italic {
                    font-family: "${this.fontFamilyMain}", 'arial', sans-serif;
                    font-weight: 100;
                    font-style: italic;
                    }
                    .font-family-main-light-italic {
                    font-family: "${this.fontFamilyMain}", 'arial', sans-serif;
                    font-weight: 300;
                    font-style: italic;
                    }
                    .font-family-main-regular-italic {
                    font-family: "${this.fontFamilyMain}", 'arial', sans-serif;
                    font-weight: 400;
                    font-style: italic;
                    }
                    .font-family-main-medium-italic {
                    font-family: "${this.fontFamilyMain}", 'arial', sans-serif;
                    font-weight: 500;
                    font-style: italic;
                    }
                    .font-family-main-bold-italic {
                    font-family: "${this.fontFamilyMain}", 'arial', sans-serif;
                    font-weight: 700;
                    font-style: italic;
                    }
                    .font-family-main-black-italic {
                    font-family: "${this.fontFamilyMain}", 'arial', sans-serif;
                    font-weight: 900;
                    font-style: italic;
                    }\n`;
                               
                
                } else {
                    scss += `\n//=> no Font Family Main\n`
                }
        

                if (this.fontFamilyBrandUrls.length) {
                    scss += `\n// Font Family Brand (for your Brand Text)\n`;
                    this.fontFamilyBrandUrls.forEach(url => {
                        scss += `@import url('${url}');\n`;
                    });
                    scss += `.font-family-brand {\n`;
                    scss += `    font-family: '${this.fontFamilyBrand}', 'arial', sans-serif;\n`;
                    scss += `}\n`;
             
                    // Generate CSS classes
                    scss += `
                    .font-family-brand-thin {
                    font-family: "${this.fontFamilyBrand}", 'arial', sans-serif;
                    font-weight: 100;
                    font-style: normal;
                    }
                    .font-family-brand-light {
                    font-family: "${this.fontFamilyBrand}", 'arial', sans-serif;
                    font-weight: 300;
                    font-style: normal;
                    }
                    .font-family-brand-regular {
                    font-family: "${this.fontFamilyBrand}", 'arial', sans-serif;
                    font-weight: 400;
                    font-style: normal;
                    }
                    .font-family-brand-medium {
                    font-family: "${this.fontFamilyBrand}", 'arial', sans-serif;
                    font-weight: 500;
                    font-style: normal;
                    }
                    .font-family-brand-bold {
                    font-family: "${this.fontFamilyBrand}", 'arial', sans-serif;
                    font-weight: 700;
                    font-style: normal;
                    }
                    .font-family-brand-black {
                    font-family: "${this.fontFamilyBrand}", 'arial', sans-serif;
                    font-weight: 900;
                    font-style: normal;
                    }
                    .font-family-brand-thin-italic {
                    font-family: "${this.fontFamilyBrand}", 'arial', sans-serif;
                    font-weight: 100;
                    font-style: italic;
                    }
                    .font-family-brand-light-italic {
                    font-family: "${this.fontFamilyBrand}", 'arial', sans-serif;
                    font-weight: 300;
                    font-style: italic;
                    }
                    .font-family-brand-regular-italic {
                    font-family: "${this.fontFamilyBrand}", 'arial', sans-serif;
                    font-weight: 400;
                    font-style: italic;
                    }
                    .font-family-brand-medium-italic {
                    font-family: "${this.fontFamilyBrand}", 'arial', sans-serif;
                    font-weight: 500;
                    font-style: italic;
                    }
                    .font-family-brand-bold-italic {
                    font-family: "${this.fontFamilyBrand}", 'arial', sans-serif;
                    font-weight: 700;
                    font-style: italic;
                    }
                    .font-family-brand-black-italic {
                    font-family: "${this.fontFamilyBrand}", 'arial', sans-serif;
                    font-weight: 900;
                    font-style: italic;
                    }\n`;
                           

                } else {
                    scss += `//=> no Font Family Brand\n`
                }
        


                // Generate Blur
                scss += `\n\n// Blur\n`;
                scss += `@mixin blur($value) {\n`;
                scss += `    -webkit-filter: blur($value);\n`;
                scss += `    filter: blur($value);\n`;
                scss += `}\n`;
                scss += `.blur		  {@include blur(1px);}\n`;
                scss += `.blur-25	{@include blur(2.5px);}\n`;
                scss += `.blur-50	{@include blur(5px);}\n`;
                scss += `.blur-75	{@include blur(7.5px);}\n`;
                scss += `.blur-100	{@include blur(10px);}\n`;
                
               



                scss += `\n\n// Logo and Pattern\n`;

                
                // Existing SVG to URI conversion and SCSS generation logic
                if (this.svgLogoDataUri || this.svgPatternDataUri) {

                    console.log("Start SVG Logo to URI Conversion ");

                    setTimeout(() => {
    
                        // Existing SCSS generation logic for logo
                        if (this.svgLogoDataUri) {
                            
                            const height = 25; // Set height to 30px 
                            const width = (this.svgLogoWidth / this.svgLogoHeight) * height;
                            
                            const emWidth = (width / 16).toFixed(4); // Convert to em units 
                            const emHeight = (height / 16).toFixed(4); // Convert to em units 

                            scss += `\n// Logo (svg-logo)\n`;
                            scss += `@mixin svg-logo($width, $height) {
                                background-image: url(${this.svgLogoDataUri});
                                background-repeat: no-repeat;
                                background-size: contain;
                                background-position: center;
                                width: $width;
                                height: $height;
                            }\n`;

                            scss += `.svg-logo\t\t{@include svg-logo(${width}px, ${height}px);}\n`; 
                           
                            // scss += `.svg-logo-25\t{@include svg-logo(${width * 0.25}px, ${height * 0.25}px);}\n`; 
                            // scss += `.svg-logo-50\t{@include svg-logo(${width * 0.5}px, ${height * 0.5}px);}\n`; 
                            // scss += `.svg-logo-75\t{@include svg-logo(${width * 0.75}px, ${height * 0.75}px);}\n`; 
                            // scss += `.svg-logo-100\t{@include svg-logo(${width}px, ${height}px);}\n`;
                         
                            scss += `.svg-logo-25\t{@include svg-logo(25%, 25%);}\n`;
                            scss += `.svg-logo-50\t{@include svg-logo(50%, 50%);}\n`;
                            scss += `.svg-logo-75\t{@include svg-logo(75%, 75%);}\n`;
                            scss += `.svg-logo-100\t{@include svg-logo(100%, 100%);}\n`;
                        
                        }  else {
                            scss += `//=> no SVG Logo\n`
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
                            scss += `.pattern-25\t\t{@include svg-pattern(25%, 60px);}\n`;
                            scss += `.pattern-50\t\t{@include svg-pattern(50%, 60px);}\n`;
                            scss += `.pattern-75\t\t{@include svg-pattern(75%, 60px);}\n`;
                            scss += `.pattern-100\t{@include svg-pattern(100%, 60px);}\n`;
                        } else {
                            scss += `//=> no SVG Pattern\n`;

                            let svgPatternBase64 = `data:image/svg+xml;base64,${btoa( `<?xml version="1.0" encoding="UTF-8" standalone="no"?> <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"> <svg width="4.53499998mm" height="4.5351768mm" viewBox="0 0 4.53499998 4.5351768" version="1.1" id="svg1" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg"> <defs id="defs1" /> <g id="layer1" transform="translate(35.264961,-23.404022)"> <rect id="rect1" width="4.53499998" height="4.5351768" x="-35.264961" y="23.404022" ry="0.0279222284" style="fill:none;fill-opacity:1;stroke:none;stroke-width:0;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" /> <circle id="path359" cx="-32.9997459" cy="25.67161" r="0.50514406" style="fill:#c64600;stroke-width:0.0105882;stroke-linecap:round;stroke-opacity:0.482353;paint-order:markers stroke fill" /> </g> </svg>` )}`;

                            // 
                            scss += `// Sample Pattern (svg-pattern)
                                    @mixin svg-pattern($width, $height) {
                                        background-image: url(${svgPatternBase64});
                                        background-repeat: repeat;
                                        background-size: 20px;
                                        width: $width;
                                        height: $height;
                                    }
                                    .pattern		{@include svg-pattern(100%, 60px);}
                                    .pattern-25		{@include svg-pattern(25%, 60px);}
                                    .pattern-50		{@include svg-pattern(50%, 60px);}
                                    .pattern-75		{@include svg-pattern(75%, 60px);}
                                    .pattern-100	{@include svg-pattern(100%, 60px);}
                                `;
    
                        }
    
                        this.bootstrapScssCode = scss;
                        this.isLoading = false; // Stop loading
    
                        // Trigger modal display
                        const scssModal = new bootstrap.Modal(document.getElementById('scssModal'));
                        scssModal.show();
                    }, 35000); // Delay for logo or pattern conversion
                } else {

                    scss += `//=> no SVG Logo\n`
                    scss += `//=> no SVG Pattern\n`


                    this.bootstrapScssCode = scss;
                    this.isLoading = false; // Stop loading

                    // Trigger modal display
                    const scssModal = new bootstrap.Modal(document.getElementById('scssModal'));
                    scssModal.show();
                    
                }

            }, 4000); // Adjust the delay as needed
        
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

        onImageLoad(event) {
            const img = event.target;
            this.svgLogoWidth = img.naturalWidth;
            this.svgLogoHeight = img.naturalHeight;
            console.log(this.svgLogoWidth);
            console.log(this.svgLogoHeight);
        },
        displaySvgPreview(svgUri) {
            const previewsContainer = document.getElementById('imagePreviews');
            previewsContainer.innerHTML = ''; // Clear previous previews
            const preview = document.createElement('div');
            preview.classList.add('col-md-4', 'mb-3', 'text-center');
    
            const img = document.createElement('img');
            img.src = svgUri;
            img.alt = 'SVG Preview';
            img.classList.add('img-fluid', 'rounded');
            img.addEventListener('load', this.onImageLoad);
    
            const badge = document.createElement('div');
            badge.classList.add('text-center', 'mt-2');
            badge.innerHTML = '<span class="badge bg-secondary">SVG Logo</span>';
    
            preview.appendChild(img);
            preview.appendChild(badge);
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
            preview.classList.add('col-md-4', 'mb-3', 'text-center');
            preview.innerHTML = `<img src="${svgUri}" alt="SVG Preview" class="img-fluid rounded" style="height: 70px;">
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



