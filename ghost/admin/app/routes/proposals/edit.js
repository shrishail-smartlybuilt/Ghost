/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
import AuthenticatedRoute from 'ghost-admin/routes/authenticated';
import fetch from 'fetch';

let builder, builderOptions, self, proposalcss;
const ORIGIN_URL = (location.hostname === 'localhost' ? 'https://nirvana.jacktrade.co' : location.origin) + '/JT_Innova_ContentBuilder/latest/public/';

export default class ProposalsEditRoute extends AuthenticatedRoute {
    model(params) {
        const proposals = [
            { id: '1', title: 'Proposal A', content: 'Details about A' },
            { id: '2', title: 'Proposal B', content: 'Details about B' }
        ];

        self = this;

        this.loadLibraries();

        if (!$('.content-css').length) {
            this.loadAndScopeCSS('https://nirvana.jacktrade.co/JT_Innova_ContentBuilder/latest/public/assets/minimalist-blocks/content.css', '#proposal-container');
        }

        return proposals.find(p => p.id === params.proposal_id);
    }

    // async loadAndScopeCSS(url, scopeSelector) {
    //     const baseURL = new URL(url, location.href); // get origin and path context
    //     let rawCSS = await fetch(url).then(res => res.text());

    //     // Fix @import URLs first
    //     rawCSS = rawCSS.replace(/@import\s+url\(["']?([^"')]+)["']?\);?/g, (match, importUrl) => {
    //         // Make relative URLs absolute based on original CSS file location
    //         const absoluteURL = new URL(importUrl, baseURL).href;
    //         return `@import url("${absoluteURL}");`;
    //     });

    //     // Step 1: Remove CSS comments
    //     rawCSS = rawCSS.replace(/\/\*[\s\S]*?\*\//g, '');

    //     // Step 2: Scope all rules recursively
    //     const scopedCSS = this.scopeCSSRecursive(rawCSS, scopeSelector);

    //     // Step 3: Inject into document
    //     const style = document.createElement('style');
    //     style.classList.add('content-css');
    //     style.textContent = scopedCSS;
    //     document.head.appendChild(style);
    // }

    // scopeCSSRecursive(css, scopeSelector) {
    //     let output = '';
    //     let pos = 0;

    //     while (pos < css.length) {
    //         const atRuleMatch = css.slice(pos).match(/^@[\w-]+\s[^{]+{/);

    //         if (atRuleMatch) {
    //             const atStart = pos + atRuleMatch.index;
    //             const braceStart = atStart + atRuleMatch[0].length;
    //             const braceEnd = this.findMatchingBrace(css, braceStart - 1);
    //             const inner = css.slice(braceStart, braceEnd).trim();
    //             const header = css.slice(atStart, braceStart);

    //             const scopedInner = this.scopeCSSRecursive(inner, scopeSelector);
    //             output += `${header}${scopedInner}}\n`;
    //             pos = braceEnd + 1;
    //         } else {
    //             const ruleMatch = css.slice(pos).match(/([^{}]+){([^{}]*)}/);

    //             if (!ruleMatch) {
    //                 break;
    //             }

    //             const fullMatch = ruleMatch[0];
    //             const selectors = ruleMatch[1].trim();
    //             const body = ruleMatch[2].trim();

    //             const scopedSelectors = selectors
    //                 .split(',')
    //                 .map((sel) => {
    //                     sel = sel.trim();
    //                     if (
    //                         sel.startsWith(scopeSelector) ||
    //                         sel.startsWith('@') ||
    //                         sel === 'to' ||
    //                         sel === 'from' ||
    //                         /^[\d.]+%$/.test(sel)
    //                     ) {
    //                         return sel;
    //                     }
    //                     return `${scopeSelector} ${sel}`;
    //                 })
    //                 .join(', ');

    //             output += `${scopedSelectors} { ${body} }\n`;

    //             pos += css.slice(pos).indexOf(fullMatch) + fullMatch.length;
    //         }
    //     }

    //     return output;
    // }

    // findMatchingBrace(str, start) {
    //     let depth = 0;
    //     for (let i = start; i < str.length; i++) {
    //         if (str[i] === '{') {
    //             depth++;
    //         }
    //         if (str[i] === '}') {
    //             depth--;
    //         }
    //         if (depth === 0) {
    //             return i;
    //         }
    //     }
    //     return str.length;
    // }

    scopeOnlyTags(css, scopeSelector) {
        return css.replace(/([^{@}]+)\s*\{/g, (match, selectors) => {
            const scoped = selectors
                .split(',')
                .map((sel) => {
                    sel = sel.trim();

                    // Skip at-rules or nested selectors
                    if (
                        sel.startsWith(scopeSelector) || // already scoped
                        sel.startsWith('.') || // class
                        sel.startsWith('#') || // ID
                        sel.startsWith('@') || // at-rule
                        sel.includes(':') || // pseudo-class or element
                        sel.match(/[\s>+~]/) || // combinator
                        sel === '' ||
                        /^[\d.]+%$/.test(sel) // keyframe %
                    ) {
                        return sel;
                    }

                    // Only scope simple tag names like "body", "h1", "p"
                    if (/^[a-zA-Z][a-zA-Z0-9-]*$/.test(sel)) {
                        return `${scopeSelector} ${sel}`;
                    }

                    return sel; // leave everything else
                })
                .join(', ');

            return `${scoped} {`;
        });
    }

    async loadAndScopeCSS(url, scopeSelector) {
        const baseURL = new URL(url, location.href);
        let rawCSS = await fetch(url).then(res => res.text());

        // Fix relative @import URLs
        rawCSS = rawCSS.replace(/@import\s+url\(["']?([^"')]+)["']?\);?/g, (match, importUrl) => {
            const absoluteURL = new URL(importUrl, baseURL).href;
            return `@import url("${absoluteURL}");`;
        });

        // Remove CSS comments
        rawCSS = rawCSS.replace(/\/\*[\s\S]*?\*\//g, '');

        // Scope only HTML tag selectors
        const scopedCSS = this.scopeOnlyTags(rawCSS, scopeSelector);

        // Inject scoped style
        const style = document.createElement('style');
        style.textContent = scopedCSS;
        style.classList.add('content-css');
        document.head.appendChild(style);
    }

    loadStyle(src) {
        return new Promise(function (resolve, reject) {
            let link = document.createElement('link');
            link.href = src.url;
            link.rel = 'stylesheet';
            // link.setAttribute('id', src.id);
            link.classList.add(src.id);

            link.onload = () => resolve(link);
            link.onerror = () => reject(new Error(`Style load error for ${src.url}`));

            document.head.append(link);
        });
    }

    loadStyles(srcs) {
        let promises = [];
        srcs.forEach(src => promises.push(this.loadStyle(src)));
        return Promise.all(promises);
    }

    loadLibraries() {
        $.ajaxSetup({
            cache: true
        });

        proposalcss = $('.proposalcss').length;
        let styleArr = [];

        if (!proposalcss) {
            styleArr = [
                // {
                //     url: ORIGIN_URL + 'assets/minimalist-blocks/content.css',
                //     id: 'proposalcss'
                // },
                {
                    url: ORIGIN_URL + 'block/block.css',
                    id: 'proposalcss'
                },
                {
                    url: ORIGIN_URL + 'contentbuilder/contentbuilder.css',
                    id: 'proposalcss'
                },
                {
                    url: ORIGIN_URL + 'assets/scripts/glide/css/glide.core.css',
                    id: 'proposalcss'
                },
                {
                    url: ORIGIN_URL + 'assets/scripts/glide/css/glide.theme.css',
                    id: 'proposalcss'
                }
            ];
        } else {
            $('.proposalcss').removeAttr('disabled');
            // self.initiate();
        }

        this.loadStyles(styleArr).then(() => {
            $.getScript(ORIGIN_URL + 'assets/scripts/glide/glide.js', function () {
                // here you can use anything you defined in the loaded script

                $.getScript(ORIGIN_URL + 'contentbuilder/contentbuilder.min.js', function () {
                    self.initiate();
                });
                $.getScript(ORIGIN_URL + 'block/block.js', function () {
                    // initiate();
                });
            });
        }).catch(() => {

        });
    }

    initiate() {
        builderOptions = {
            container: '.container',
            imageQuality: .6,
            canvas: true,
            previewURL: ORIGIN_URL + 'preview-canvas.html', // a must for canvas mode
            // pageSize: '10in,10in', // Default: 100%,100vh,web (values: 1000px,1000px,web | 11in,8.5in || 12in,12in ..)

            // snippetModal: true,
            snippetModalLeft: true,
            snippetOpen: true,
            previewStyle: 'bottom:30px;top:auto;left:300px;right:auto;', // default position for Live Preview window on open

            clearPreferences: true, // reset preferences settings
            zoom: 1,

            // To enable AI Assistant
            sendCommandUrl: '/sendcommand',
            // showDisclaimer: false,
            // startAIAssistant: true, // Auto open 'AI Assistant' panel
            enableShortCommands: false,
            speechRecognitionLang: 'en-US',
            triggerWords: {
                send: ['send', 'okay', 'ok', 'execute', 'run'],
                abort: ['abort', 'cancel'],
                clear: ['clear', 'erase']
            },
            AIModalStyle: 'right:300px;', // default position for AI Assistant panel on open

            // // If using DeepGram for speech recognition, specify the speechTranscribeUrl.
            // // speechTranscribeUrl: 'ws://localhost:3002',
            // // The server implementation for ws://localhost:3002 can be found in server.js (Node.js code)
            //
            // // Enabling AI image generation
            // textToImageUrl: '/texttoimage',
            // upscaleImageUrl: '/upscaleimage',
            // // imageAutoUpscale: false,
            // // viewFileUrl: '/viewfile', // If using S3

            // If you need to change some paths:
            snippetUrl: ORIGIN_URL + 'assets/minimalist-blocks/content.js', // Snippet file
            snippetPath: ORIGIN_URL + 'assets/minimalist-blocks/', // Location of snippets' assets
            modulePath: ORIGIN_URL + 'assets/modules/',
            assetPath: ORIGIN_URL + 'assets/',
            fontAssetPath: ORIGIN_URL + 'assets/fonts/',

            // Load plugins
            plugins: [{
                name: 'preview',
                showInMainToolbar: true,
                showInElementToolbar: true
            },
            {
                name: 'wordcount',
                showInMainToolbar: true,
                showInElementToolbar: true
            },
            {
                name: 'symbols',
                showInMainToolbar: true,
                showInElementToolbar: false
            }
            ],
            pluginPath: ORIGIN_URL + 'contentbuilder/', // Location of the plugin scripts

            // Open asset/file browser (can be replaced with your own file/asset manager application)
            imageSelect: ORIGIN_URL + 'assets.html',
            videoSelect: ORIGIN_URL + 'assets.html',
            audioSelect: ORIGIN_URL + 'assets.html',
            fileSelect: ORIGIN_URL + 'assets.html',
            mediaSelect: ORIGIN_URL + 'assets.html', // for images and videos
            // You can replace it with your own asset/file manager application
            // or use: https://innovastudio.com/asset-manager

            // Or use custom:
            // onImageSelectClick: () => {  },
            // onVideoSelectClick: () => {  },
            // onAudioSelectClick: () => {  },
            // onFileSelectClick: () => {  },
            // onMediaSelectClick: () => {  },

            onImageUpload: (e) => {
                uploadFile(e, (response) => {
                    if (!response.error) {
                        const uploadedFileUrl = response.url;
                        if (uploadedFileUrl) {
                            builder.returnUrl(uploadedFileUrl);
                        }
                    }
                });
            },
            onVideoUpload: (e) => {
                uploadFile(e, (response) => {
                    if (!response.error) {
                        const uploadedFileUrl = response.url;
                        if (uploadedFileUrl) {
                            builder.returnUrl(uploadedFileUrl);
                        }
                    }
                });
            },
            onAudioUpload: (e) => {
                uploadFile(e, (response) => {
                    if (!response.error) {
                        const uploadedFileUrl = response.url;
                        if (uploadedFileUrl) {
                            builder.returnUrl(uploadedFileUrl);
                        }
                    }
                });
            },
            onMediaUpload: (e) => { // for image & video
                uploadFile(e, (response) => {
                    if (!response.error) {
                        const uploadedImageUrl = response.url;
                        if (uploadedImageUrl) {
                            builder.returnUrl(uploadedImageUrl);
                        }
                    }
                });
            },
            onFileUpload: (e) => { // for file/document
                uploadFile(e, (response) => {
                    if (!response.error) {
                        const uploadedImageUrl = response.url;
                        if (uploadedImageUrl) {
                            builder.returnUrl(uploadedImageUrl);
                        }
                    }
                });
            },

            onChange: () => { },

            useLightbox: true

        }; // options

        builder = new ContentBuilder(builderOptions); // Start ContentBuilder

        if (!proposalcss) {
            builder.loadSnippets(ORIGIN_URL + 'assets/minimalist-blocks/content.js');
        }

        // localStorage.removeItem('mycanvas'); // clear

        // Load content
        let html = '';
        if (html === '') {
            // sample content
            html = `
              <div class="is-box box-canvas autolayout" data-pagesize="1000px,1000px,web">
                  <div class="is-block block-steady height-auto" style="top: calc(50% - 183.5px); left: calc(14.5644% - 57.6749px); width: 396px;" data--t="calc(50% - 183.5px)" data--l="calc(14.5644% - 57.6749px)" data--b="" data--r="" data--w="396px" data--h="">
    
                      <div class="is-container">
    
                          <div class="row">
                              <div class="column full">
                                  <h1 class="leading-none font-medium size-64">The Space, for you.</h1>
                              </div>
                          </div>
                          <div class="row">
                              <div class="column full">
                                  <div class="spacer height-60"></div>
                              </div>
                          </div>
                          <div class="row">
                              <div class="column">
                                  <p class="italic" style="color: rgb(138, 138, 138);">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                      when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                  <p class="font-semibold size-16">By Anne Marry</p>
                              </div>
                          </div>
    
                      </div>
                  </div>
                  <div class="is-block block-steady height-auto" style="top: calc(50% - 302.5px); left: calc(90.4364% - 327.38px); width: 362px;" data--t="calc(50% - 302.5px)" data--l="calc(90.4364% - 327.38px)" data--b="" data--r="" data--w="362px" data--h="">
    
                      <div class="is-container">
                          <div class="row">
                              <div class="column">
                                  <img src="${ORIGIN_URL}uploads/person5.png" alt="">
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              `;
        }

        builder.loadHTML(html);

        const container = document.querySelector('.container');
        setTimeout(async () => {
            container.style.opacity = ''; // Remove opacity 0 to show the content
        }, 200);

        function uploadFile(e, callback) {
            // For demo purpose (no file upload)
            const file = e.target.files[0];

            if (file.size > FILE_SIZES.max) {
                const error = `File size exceeds ${FILE_SIZES.maxMB}.`;
                messages.simpleToast(error, 'danger');
                if (callback) {
                    callback({
                        error
                    });
                }
                return;
            }

            // new Compressor(file, {
            //   quality: .6,
            //   success(compressedFile) {
            dataServices.upload({
                url: serverUrl.main + 'mediaApi/upload/file',
                data: {
                    file: [compressedFile]
                },
                spinner: false,
                isShowError: false
            }, true)
                .then((response) => {
                    let data = response.data;
                    if (response.status === '406') {
                        let error = 'File couldn\'t be uploaded: System has detected the file as unsafe.';
                        messages.simpleToast(error, 'danger');
                        if (callback) {
                            callback({
                                error
                            });
                        }
                    } else if (data && data.response_code === 200) {
                        if (callback) {
                            callback({
                                url: data.result.success[0].webUrl
                            });
                        }
                    }
                }, (error) => {
                    if (callback) {
                        callback({
                            error
                        });
                    }
                });
        }
    }

    resetController(controller, isExiting) {
        if (isExiting) {
            // This runs when you're leaving the route
            if (builder) {
                builder.destroy(); // Destroy
                builder = null;
            }
            $('.proposalcss').attr('disabled', 'disabled');
        }
    }
}
