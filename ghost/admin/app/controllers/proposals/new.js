import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';



export default class ProposalsNewController extends Controller {
  @tracked isModalOpen = false;
  @tracked currentStep = 1;
  @tracked activeTab = 'references';
  @tracked rightNavWidth = 0;
  @tracked isRightNavOpen = false;

   // In your component/controller
@tracked enableSERP = true;
@tracked enableCounter = false;
@tracked autoWhitepaper = true;
@tracked activeRightTab = 'task';
@tracked showTopicSuggestions = false;
@tracked selectedItems = new Set();

@tracked inspiredDetails = [''];
@tracked competitorDetails = [''];



@tracked uploadedFiles = [
  { name: "Case_Study_292.pdf", status: "File Removed (Task Completed)" },
  { name: "Also_Case_Study_223.pdf", status: "File Removed (Task Completed)" }
];

organizations = [
  'Organization',
  'Organization Name Ha',
  'Org A',
  'Org B',
  'Demo Company',
  'Startups Inc.',
  'Tech Org',
  'Nonprofit XYZ'
];

selectedOrganization = null;
@tracked choices = [
  {
    title: 'Action Plan Library Overview',
    description: 'Action Plan Library if you have been following the tips since last year...',
    selected: false,
    saved: false
  },
  {
    title: 'Maximizer Template Library Overview',
    description: 'Template Library if you have been following the tips since last year...',
    selected: false,
    saved: false
  },
  {
    title: 'Maximizer Duplicate Cleanup',
    description: 'Checking for Duplicates and removing them Database cleanup...',
    selected: true,
    saved: true
  },
  {
    title: 'Maximizer CRM Features',
    description: 'Never miss a sales opportunity: Manage leads right in your inbox...',
    selected: false,
    saved: false
  },
  {
    title: 'Maximizer CRM Custom Views',
    description: 'Save time with Column Views! Maximizer CRM lets you customise...',
    selected: true,
    saved: false
  },
  {
    title: 'Maximizer CRM Lead Management',
    description: 'Managing leads Maximizer CRM allows you to manage leads easily...',
    selected: false,
    saved: false
  }
];

@action
toggleChoice(index, event) {
  this.choices = this.choices.map((choice, i) => {
    if (i === index) {
      return {
        ...choice,
        selected: event.target.checked,
      };
    }
    return choice;
  });
}

@action
setRightNavTab(tab) {
  this.activeRightTab = tab;
}

@action
toggleSuggestions() {
  this.showTopicSuggestions = !this.showTopicSuggestions;
}

@action
closeSuggestions() {
  this.showTopicSuggestions = false;
}

@action
addInspiredDetail() {
  this.inspiredDetails = [...this.inspiredDetails, ''];
}

@action
addCompetitorDetail() {
  this.competitorDetails = [...this.competitorDetails, ''];
}


@action
selectOrganization(org) {
  this.set('selectedOrganization', org);
  // Optional: Update badge content or close the nav
  this.set('isRightNavOpen', false);
}

  
    // 👥 Social platform selection
    @tracked socialPlatforms = [
      { name: "x",
        label: "X",
        selected: true,
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M18.42,14.009L27.891,3h-2.244l-8.224,9.559L10.855,3H3.28l9.932,14.455L3.28,29h2.244l8.684-10.095,6.936,10.095h7.576l-10.301-14.991h0Zm-3.074,3.573l-1.006-1.439L6.333,4.69h3.447l6.462,9.243,1.006,1.439,8.4,12.015h-3.447l-6.854-9.804h0Z"></path></svg>
        ` },
        {
          name: "facebook",
          label: "Facebook",
          selected: true,
          icon: `
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M16,2c-7.732,0-14,6.268-14,14,0,6.566,4.52,12.075,10.618,13.588v-9.31h-2.887v-4.278h2.887v-1.843c0-4.765,2.156-6.974,6.835-6.974,.887,0,2.417,.174,3.043,.348v3.878c-.33-.035-.904-.052-1.617-.052-2.296,0-3.183,.87-3.183,3.13v1.513h4.573l-.786,4.278h-3.787v9.619c6.932-.837,12.304-6.74,12.304-13.897,0-7.732-6.268-14-14-14Z"></path></svg>
          `
        },
        {
          name: "threads",
          label: "Threads",
          selected: false,
          icon: `
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M22.7,14.977c-.121-.058-.243-.113-.367-.167-.216-3.982-2.392-6.262-6.046-6.285-.017,0-.033,0-.05,0-2.185,0-4.003,.933-5.122,2.63l2.009,1.378c.836-1.268,2.147-1.538,3.113-1.538,.011,0,.022,0,.033,0,1.203,.008,2.111,.357,2.698,1.04,.428,.497,.714,1.183,.855,2.049-1.067-.181-2.22-.237-3.453-.166-3.474,.2-5.707,2.226-5.557,5.041,.076,1.428,.788,2.656,2.003,3.459,1.028,.678,2.351,1.01,3.727,.935,1.817-.1,3.242-.793,4.236-2.06,.755-.963,1.233-2.21,1.444-3.781,.866,.523,1.507,1.21,1.862,2.037,.603,1.405,.638,3.714-1.246,5.596-1.651,1.649-3.635,2.363-6.634,2.385-3.326-.025-5.842-1.091-7.478-3.171-1.532-1.947-2.323-4.759-2.353-8.359,.03-3.599,.821-6.412,2.353-8.359,1.636-2.079,4.151-3.146,7.478-3.171,3.35,.025,5.91,1.097,7.608,3.186,.833,1.025,1.461,2.313,1.874,3.815l2.355-.628c-.502-1.849-1.291-3.443-2.365-4.764-2.177-2.679-5.361-4.051-9.464-4.08h-.016c-4.094,.028-7.243,1.406-9.358,4.095-1.882,2.393-2.853,5.722-2.886,9.895v.01s0,.01,0,.01c.033,4.173,1.004,7.503,2.886,9.895,2.115,2.689,5.264,4.067,9.358,4.095h.016c3.64-.025,6.206-.978,8.32-3.09,2.765-2.763,2.682-6.226,1.771-8.352-.654-1.525-1.901-2.763-3.605-3.581Zm-6.285,5.909c-1.522,.086-3.104-.598-3.182-2.061-.058-1.085,.772-2.296,3.276-2.441,.287-.017,.568-.025,.844-.025,.909,0,1.76,.088,2.533,.257-.288,3.602-1.98,4.187-3.471,4.269Z"></path></svg>
          `
        },
        {
          name: "linkedin",
          label: "LinkedIn",
          selected: true,
          icon: `
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M26.111,3H5.889c-1.595,0-2.889,1.293-2.889,2.889V26.111c0,1.595,1.293,2.889,2.889,2.889H26.111c1.595,0,2.889-1.293,2.889-2.889V5.889c0-1.595-1.293-2.889-2.889-2.889ZM10.861,25.389h-3.877V12.87h3.877v12.519Zm-1.957-14.158c-1.267,0-2.293-1.034-2.293-2.31s1.026-2.31,2.293-2.31,2.292,1.034,2.292,2.31-1.026,2.31-2.292,2.31Zm16.485,14.158h-3.858v-6.571c0-1.802-.685-2.809-2.111-2.809-1.551,0-2.362,1.048-2.362,2.809v6.571h-3.718V12.87h3.718v1.686s1.118-2.069,3.775-2.069,4.556,1.621,4.556,4.975v7.926Z" fill-rule="evenodd"></path></svg>
          `
        },
        {
          name: "reddit",
          label: "Reddit",
          selected: true,
          icon: `
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M27.332,10.323c-1.07,0-2.055,.361-2.842,.967-2.143-1.326-4.848-2.16-7.807-2.271v-.013c0-1.983,1.474-3.629,3.386-3.9v-.003c.347,1.47,1.666,2.564,3.242,2.564,1.84,0,3.331-1.491,3.331-3.331s-1.491-3.331-3.331-3.331c-1.609,0-2.95,1.14-3.262,2.657-2.694,.289-4.798,2.574-4.798,5.343v.017c-2.93,.123-5.605,.957-7.729,2.274-.789-.611-1.779-.974-2.853-.974-2.578,0-4.668,2.09-4.668,4.668,0,1.871,1.099,3.483,2.688,4.228,.155,5.419,6.06,9.778,13.323,9.778s13.176-4.364,13.323-9.787c1.576-.75,2.666-2.357,2.666-4.217,0-2.578-2.09-4.668-4.668-4.668ZM7.334,17.952c.078-1.693,1.203-2.992,2.51-2.992s2.307,1.373,2.229,3.066c-.078,1.693-1.054,2.308-2.363,2.308s-2.453-.689-2.375-2.382Zm13.596,4.424c-.804,1.922-2.703,3.273-4.919,3.273s-4.114-1.351-4.919-3.273c-.095-.228,.061-.483,.306-.508,1.437-.145,2.991-.225,4.613-.225s3.175,.08,4.613,.225c.245,.025,.401,.28,.306,.508Zm1.384-2.043c-1.307,0-2.285-.614-2.363-2.308-.078-1.693,.92-3.066,2.229-3.066s2.433,1.299,2.51,2.992c.078,1.693-1.068,2.382-2.375,2.382Z"></path></svg>
          `
        }
      
    ];
    
  constructor() {
    super(...arguments);
    // Initial calculation (optional, in case the right nav is open on page load)
    this.calculateRightNavWidth();
    
    // Listen for window resizing to recalculate right nav width
    window.addEventListener('resize', this.calculateRightNavWidth);
  }

  willDestroy() {
    // Clean up the event listener when the component is destroyed
    window.removeEventListener('resize', this.calculateRightNavWidth);
  }

  // Calculate the right nav width
  calculateRightNavWidth() {
    const rightNav = document.querySelector('.right-nav');
    if (rightNav && this.isRightNavOpen) {
      this.rightNavWidth = rightNav.offsetWidth;
    } else {
      this.rightNavWidth = 0;
    }
  }

  // Getter to determine the bottom section width based on right nav state
  get bottomSectionWidth() {
    return this.isRightNavOpen ? `calc(100% - ${this.rightNavWidth}px)` : '100%';
  }

  @action
  openRightNav(contentType) {
    this.rightNavContentType = contentType;
    this.isRightNavOpen = true;
    this.calculateRightNavWidth(); // Recalculate width when opening the right nav
  }

  @action
  closeRightNav() {
    this.isRightNavOpen = false;
    this.rightNavContentType = null;
    this.rightNavWidth = 0; // Reset width when closing the right nav
  }

  @action openModal() {
    this.isModalOpen = true;
    this.currentStep = 1;
  }

  @action closeModal() {
    this.isModalOpen = false;
  }

  @action
nextStep() {
  if (this.currentStep < 3) { // 2 is the last step index if you have 3 steps
    this.currentStep++;
  }
}

@action
prevStep() {
  if (this.currentStep > 1) {
    this.currentStep--;
  }
}

  // @action nextStep() {
  //   this.currentStep++;
  // }

  // @action prevStep() {
  //   this.currentStep--;
  // }
  @action setTab(tab) {
      this.activeTab = tab;
  }
  @action
  nextTab() {
    const tabs = ['references', 'pdfs', 'social'];
    const currentIndex = tabs.indexOf(this.activeTab);
    if (currentIndex < tabs.length - 1) {
      this.setTab(tabs[currentIndex + 1]);
    } else {
      this.closeModal();
    }
  }
  @action
  togglePlatform(name) {
    this.socialPlatforms = this.socialPlatforms.map(p =>
      p.name === name ? { ...p, selected: !p.selected } : p
    );
  }

  @action
  toggleSERP() {
    this.enableSERP = !this.enableSERP;
  }


  @action
  toggleCounter() {
    this.enableCounter = !this.enableCounter;
  }

  @action
  toggleWhitepaper() {
    this.autoWhitepaper = !this.autoWhitepaper;
  }

  // handleDragOver(event) {
  //   event.preventDefault();
  // }

  // handleFileDrop(event) {
  //     event.preventDefault();
  //     const files = event.dataTransfer.files;
  //     // handle files here
  //     console.log('Dropped files:', files);
  // }

  // handleFileSelect(event) {
  //     const files = event.target.files;
  //     // handle file selection
  //     console.log('Selected files:', files);
  // }
  @action
  triggerFileDialog() {
    const fileInput = document.getElementById('pdf-upload');
    if (fileInput) {
      fileInput.click();
    }
  }

@action
handleDragOver(event) {
  event.preventDefault();
}

@action
handleFileDrop(event) {
  event.preventDefault();
  const files = event.dataTransfer?.files;
  if (files?.length > 0) {
    this.handleFile(files[0]);
  }
}

// @action
// handleFileSelect(event) {
//   const file = event.target?.files?.[0];
//   if (file) {
//     this.handleFile(file);
//   }
// }

// Your main handler (reuse this)
handleFile(file) {
  console.log('File uploaded:', file);
  
  // Add file processing logic here
}
  @action
  handleFileSelect(event) {
    const input = event.target;
    const files = input.files;

    if (files && files.length > 0) {
      for (const file of Array.from(files)) {
        this.uploadedFiles = [
          ...this.uploadedFiles,
          { name: file.name, status: "Uploaded Successfully" }
        ];
      }
    }
  }
  @action
toggleSelectAll(event) {
  const isChecked = event.target.checked;

  this.choices = this.choices.map(choice => {
    return {
      ...choice,
      selected: isChecked
    };
  });
}

  @action
  toggleItemSelection(itemId, event) {
    if (event.target.checked) {
      this.selectedItems = new Set(this.selectedItems).add(itemId);
    } else {
      const updated = new Set(this.selectedItems);
      updated.delete(itemId);
      this.selectedItems = updated;
    }
  }

  isItemSelected(itemId) {
    return this.selectedItems.has(itemId);
  }
  @action
  askSuggestions() {
    // logic here
  }
 
  // @tracked isRightNavOpen = false;
  // @tracked rightNavSection = ''; // 'inspired' or 'competitor'

  // @action openRightNav(section) {
  //     this.rightNavSection = section;
  //     this.isRightNavOpen = true;
  // }

  // @action closeRightNav() {
  //     this.isRightNavOpen = false;
  //     this.rightNavSection = '';
  // }

}
