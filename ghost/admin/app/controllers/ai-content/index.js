import Controller from '@ember/controller';
import fetch from 'fetch';
import {action} from '@ember/object';
import {htmlSafe} from '@ember/template';
import {tracked} from '@glimmer/tracking';

export default class AiContentController extends Controller {
  @tracked activeTab = 'content';

  get tabItems() {
      return [
          {
              id: 'content',
              label: 'Content',
              icon: 'https://img.icons8.com/material-rounded/24/ingredients-list.png'
          },
          {
              id: 'notes',
              label: 'Notes',
              icon: 'https://img.icons8.com/material-rounded/24/ingredients-list.png'
          },
          {
              id: 'archive',
              label: 'Archive',
              icon: 'https://img.icons8.com/material-rounded/24/ingredients-list.png'
          }
      ];
  }

  @action
  setTab(tabId) {
      this.activeTab = tabId;
  }

  get activeTabLabel() {
      return this.tabItems.find(tab => tab.id === this.activeTab)?.label ?? '';
  }

  get items() {
      const icons = {
          note: htmlSafe(`<svg class="list-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">
                  <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                      <path d="M 38.069 88 H 7.943 c -3.153 0 -5.719 -2.565 -5.719 -5.719 V 7.719 C 2.225 4.565 4.79 2 7.943 2 h 56.725 c 3.153 0 5.719 2.565 5.719 5.719 V 16.8 c 0 0.552 0.447 1 1 1 s 1 -0.448 1 -1 V 7.719 C 72.387 3.462 68.924 0 64.668 0 H 7.943 C 3.687 0 0.225 3.462 0.225 7.719 v 74.563 C 0.225 86.537 3.687 90 7.943 90 h 30.126 c 0.552 0 1 -0.447 1 -1 S 38.622 88 38.069 88 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                      <path d="M 55.111 15.8 H 17.5 c -0.552 0 -1 0.448 -1 1 s 0.448 1 1 1 h 37.611 c 0.553 0 1 -0.448 1 -1 S 55.664 15.8 55.111 15.8 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                      <path d="M 55.111 34.6 H 17.5 c -0.552 0 -1 0.448 -1 1 s 0.448 1 1 1 h 37.611 c 0.553 0 1 -0.448 1 -1 S 55.664 34.6 55.111 34.6 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                      <path d="M 42.578 53.4 H 17.5 c -0.552 0 -1 0.447 -1 1 s 0.448 1 1 1 h 25.078 c 0.552 0 1 -0.447 1 -1 S 43.13 53.4 42.578 53.4 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                      <path d="M 34.744 74.2 c 0.552 0 1 -0.447 1 -1 s -0.448 -1 -1 -1 H 17.5 c -0.552 0 -1 0.447 -1 1 s 0.448 1 1 1 H 34.744 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                      <path d="M 89.317 35.149 c 0.063 -0.153 0.123 -0.307 0.173 -0.463 c 0.004 -0.013 0.007 -0.026 0.011 -0.04 c 0.347 -1.111 0.369 -2.3 0.045 -3.446 c -0.005 -0.018 -0.015 -0.033 -0.02 -0.051 c -0.102 -0.351 -0.235 -0.693 -0.398 -1.02 c -0.022 -0.043 -0.047 -0.084 -0.07 -0.126 c -0.163 -0.307 -0.348 -0.604 -0.564 -0.881 c -0.026 -0.033 -0.055 -0.063 -0.081 -0.095 c -0.224 -0.276 -0.47 -0.537 -0.745 -0.774 c -0.015 -0.013 -0.032 -0.024 -0.047 -0.037 c -0.29 -0.245 -0.605 -0.467 -0.948 -0.659 l -6.102 -3.414 c -0.048 -0.027 -0.098 -0.047 -0.146 -0.072 c -0.134 -0.07 -0.268 -0.141 -0.405 -0.2 c -0.025 -0.011 -0.051 -0.019 -0.076 -0.029 c -1.258 -0.528 -2.646 -0.62 -3.981 -0.242 c -0.022 0.006 -0.041 0.018 -0.063 0.024 c -0.344 0.101 -0.679 0.231 -1.001 0.391 c -0.048 0.024 -0.093 0.052 -0.141 0.077 c -0.304 0.162 -0.597 0.345 -0.872 0.558 c -0.036 0.028 -0.068 0.06 -0.104 0.089 c -0.273 0.222 -0.531 0.465 -0.766 0.737 c -0.016 0.018 -0.029 0.039 -0.045 0.057 c -0.242 0.288 -0.463 0.6 -0.654 0.94 l -5.887 10.52 c 0 0.001 0 0.002 -0.001 0.002 L 47.243 71.288 c -0.085 0.152 -0.129 0.324 -0.127 0.498 l 0.17 17.224 c 0.004 0.358 0.199 0.688 0.512 0.863 C 47.949 89.958 48.118 90 48.286 90 c 0.179 0 0.356 -0.048 0.515 -0.143 l 14.768 -8.865 c 0.149 -0.09 0.272 -0.217 0.358 -0.369 l 25.076 -44.815 c 0.101 -0.18 0.191 -0.364 0.272 -0.55 C 89.291 35.222 89.302 35.185 89.317 35.149 z M 87.749 33.298 c -0.024 0.222 -0.078 0.441 -0.14 0.66 c -0.012 0.041 -0.014 0.084 -0.027 0.124 c -0.082 0.256 -0.189 0.507 -0.325 0.75 l -5.398 9.647 l -13.192 -7.382 l 5.398 -9.648 c 0.136 -0.243 0.293 -0.465 0.468 -0.668 c 0.034 -0.04 0.077 -0.07 0.113 -0.109 c 0.148 -0.158 0.299 -0.313 0.467 -0.443 c 0.02 -0.016 0.044 -0.026 0.065 -0.042 c 0.793 -0.592 1.779 -0.872 2.765 -0.793 c 0.04 0.003 0.08 -0.002 0.12 0.002 c 0.2 0.022 0.399 0.073 0.597 0.126 c 0.062 0.017 0.126 0.021 0.187 0.041 c 0.217 0.069 0.429 0.168 0.637 0.276 c 0.036 0.019 0.075 0.028 0.11 0.048 l 6.102 3.414 c 0.032 0.018 0.058 0.044 0.09 0.062 c 0.206 0.122 0.403 0.254 0.579 0.405 c 0.042 0.036 0.074 0.081 0.114 0.118 c 0.156 0.146 0.309 0.296 0.439 0.463 c 0.017 0.022 0.029 0.049 0.046 0.071 c 0.603 0.812 0.888 1.823 0.788 2.83 C 87.748 33.267 87.751 33.283 87.749 33.298 z M 62.311 79.414 l -13.042 7.83 l -0.149 -15.212 l 18.571 -33.19 l 13.193 7.381 L 62.311 79.414 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                  </g>
              </svg>`),
          heart: htmlSafe(` <svg class="list-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">
                              <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                                  <path d="M 45 84.334 L 6.802 46.136 C 2.416 41.75 0 35.918 0 29.716 c 0 -6.203 2.416 -12.034 6.802 -16.42 c 4.386 -4.386 10.217 -6.802 16.42 -6.802 c 6.203 0 12.034 2.416 16.42 6.802 L 45 18.654 l 5.358 -5.358 c 4.386 -4.386 10.218 -6.802 16.42 -6.802 c 6.203 0 12.034 2.416 16.42 6.802 l 0 0 l 0 0 C 87.585 17.682 90 23.513 90 29.716 c 0 6.203 -2.415 12.034 -6.802 16.42 L 45 84.334 z M 23.222 10.494 c -5.134 0 -9.961 2 -13.592 5.63 S 4 24.582 4 29.716 s 2 9.961 5.63 13.592 L 45 78.678 l 35.37 -35.37 C 84.001 39.677 86 34.85 86 29.716 s -1.999 -9.961 -5.63 -13.592 l 0 0 c -3.631 -3.63 -8.457 -5.63 -13.592 -5.63 c -5.134 0 -9.961 2 -13.592 5.63 L 45 24.311 l -8.187 -8.187 C 33.183 12.494 28.356 10.494 23.222 10.494 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                              </g>
                          </svg>`),
          new: htmlSafe(`<svg class="list-icon new-tag-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">
                              <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                                  <path d="M 89.941 25.767 L 88.703 12.89 C 88.113 6.748 83.252 1.887 77.11 1.297 L 64.233 0.059 c -3.83 -0.368 -7.623 0.994 -10.344 3.715 L 2.714 54.948 c -3.619 3.619 -3.619 9.487 0 13.107 l 19.231 19.231 c 3.619 3.619 9.487 3.619 13.107 0 l 51.174 -51.174 C 88.946 33.391 90.309 29.597 89.941 25.767 z M 80.103 16.319 c -1.773 1.773 -4.648 1.773 -6.422 0 s -1.773 -4.648 0 -6.422 s 4.648 -1.773 6.422 0 S 81.876 14.545 80.103 16.319 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(234,73,73); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                                  <path d="M 23.487 51.07 c -0.818 -0.818 -2.143 -0.818 -2.96 0 c -0.818 0.818 -0.818 2.142 0 2.96 l 10.672 10.673 l -19.41 -3.609 c -0.903 -0.173 -1.807 0.271 -2.235 1.082 c -0.427 0.811 -0.276 1.807 0.372 2.455 L 25.37 80.073 c 0.408 0.409 0.944 0.613 1.48 0.613 s 1.072 -0.204 1.48 -0.613 c 0.818 -0.818 0.818 -2.142 0 -2.96 L 17.657 66.441 l 19.41 3.609 c 0.905 0.172 1.808 -0.272 2.235 -1.082 c 0.427 -0.811 0.276 -1.807 -0.372 -2.455 L 23.487 51.07 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                                  <path d="M 50.577 51.907 l -6.382 6.381 l -4.762 -4.762 l 5.029 -5.029 c 0.818 -0.818 0.818 -2.142 0 -2.96 c -0.817 -0.818 -2.143 -0.818 -2.96 0 l -5.029 5.029 l -4.762 -4.762 l 6.381 -6.382 c 0.818 -0.817 0.818 -2.143 0 -2.96 c -0.817 -0.818 -2.143 -0.818 -2.96 0 l -7.862 7.862 c -0.392 0.392 -0.613 0.925 -0.613 1.48 c 0 0.555 0.221 1.088 0.613 1.48 l 15.443 15.442 c 0.409 0.409 0.944 0.613 1.48 0.613 s 1.072 -0.204 1.48 -0.613 l 7.862 -7.861 c 0.818 -0.818 0.818 -2.142 0 -2.96 C 52.719 51.089 51.395 51.089 50.577 51.907 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                                  <path d="M 73.928 32.086 l -12.407 -18.48 c -0.644 -0.96 -1.942 -1.217 -2.904 -0.571 c -0.96 0.644 -1.215 1.945 -0.57 2.904 l 9.017 13.43 l -10.442 -3.421 c -0.747 -0.245 -1.574 -0.051 -2.132 0.509 c -0.558 0.557 -0.755 1.382 -0.509 2.131 l 3.421 10.442 l -13.43 -9.017 c -0.96 -0.644 -2.26 -0.388 -2.904 0.571 c -0.644 0.96 -0.388 2.26 0.571 2.904 l 18.479 12.406 c 0.354 0.237 0.76 0.356 1.167 0.356 c 0.446 -0.001 0.891 -0.143 1.263 -0.425 c 0.712 -0.54 1.004 -1.472 0.726 -2.32 l -4.028 -12.293 l 12.293 4.028 c 0.847 0.278 1.78 -0.014 2.321 -0.725 C 74.398 33.804 74.427 32.827 73.928 32.086 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                              </g>
                          </svg>`)
      };
      const defaultIcons = {
          note: icons.note,
          heart: icons.heart,
          new: icons.new
      };

      const allItems = {
          posted: [
              {
                  title: 'Welcome Email Series',
                  description: 'Draft for onboarding campaign.',
                  author: 'Jane Doe',
                  createdDate: '2025-04-22',
                  icons: defaultIcons,
                  isNew: true,
                  isFavorite: true,
                  isNote: true
              },
              {
                  title: 'Newsletter Ideas',
                  description: 'Topics for May newsletters.',
                  author: 'John Smith',
                  createdDate: '2025-04-21',
                  icons: defaultIcons,
                  isNew: true,
                  isFavorite: true,
                  isNote: true
              }
          ],
          roadmap: [
              {
                  title: 'Summer Content Plan',
                  description: 'Outline of blog posts from June to August.',
                  author: 'Jane Doe',
                  createdDate: '2025-04-20',
                  icons: defaultIcons,
                  isNew: true,
                  isFavorite: true,
                  isNote: true
              }
          ],
          notes: [],
          plan: [
              {
                  title: 'Campaign Timeline',
                  description: 'Marketing milestones for Q2.',
                  author: 'Alex Kim',
                  createdDate: '2025-04-18',
                  icons: defaultIcons,
                  isNew: true,
                  isFavorite: true,
                  isNote: true
              }
          ]
      };

      return allItems[this.activeTab] || [];
  }

  get hasItems() {
      return this.items.length > 0;
  }

  @action
  async getList() {
      const url = 'https://frostsa2.ed1.jacktrade.xyz/api/v2/business-locations';
      const apiKey = 'j7DFV7m64WR9q2MctqtyQTCogTYHVIHv21kulYjqoq7wKKj8vB7BFsXSIBIUHm7Z';

      const notePayload = {
          customer_id: 19,
          body: '<div>ques 121</div>',
          type: 'post',
          mdl_id: '19',
          mdl: 10,
          labels: [],
          entity_id: '66559f72c090606ac36cdc09'
      };

      const formData = new FormData();
      formData.append('data', JSON.stringify(notePayload));

      const fullUrl = `${url}`;

      const response = await fetch(fullUrl, {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${apiKey}`,
              Accept: 'application/json'
          }
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
  }
}
