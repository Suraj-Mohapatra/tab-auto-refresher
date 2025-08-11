let currentTabOptions = [];
let currentActiveTabs = [];

function fetchTabsAndActiveStatus() {
  if (typeof chrome !== 'undefined' && chrome.tabs) {
    chrome.tabs.query({}, function (tabs) {
      const tabOptions = tabs.map(tab => ({
        id: tab.id,
        title: tab.title || tab.url || 'Untitled Tab'
      }));
      currentTabOptions = tabOptions;
      // Get active tabs from storage
      if (chrome && chrome.storage && chrome.storage.local) {
        chrome.storage.local.get({ activeTabs: [] }, function (data) {
          currentActiveTabs = data.activeTabs || [];
          populateDropdown(tabOptions, currentActiveTabs);
        });
      } else {
        populateDropdown(tabOptions, []);
      }
    });
  } else {
    // Fallback for environments where chrome.tabs is not available
    populateDropdown([{ id: 0, title: 'No tabs found' }], []);
  }
}

fetchTabsAndActiveStatus();

const dropdown = document.getElementById('customDropdown');
const selected = dropdown.querySelector('.custom-dropdown-selected');
const list = dropdown.querySelector('.custom-dropdown-list');

function populateDropdown(options, activeTabs = []) {
  list.innerHTML = '';
  options.forEach(option => {
    const item = document.createElement('div');
    item.className = 'custom-dropdown-item';
    item.dataset.value = option.id;

    // Dot indicator
    const indicator = document.createElement('span');
    indicator.textContent = '●';
    indicator.style.marginRight = '7px';
    indicator.style.fontWeight = 'bold';
    indicator.style.fontSize = '1.1em';
    if (activeTabs.includes(option.id)) {
      indicator.style.color = '#28a745'; // green for active
      indicator.title = 'Refresh Active';
    } else {
      indicator.style.color = '#222'; // black for inactive
      indicator.title = 'Inactive';
    }

    // Compose: dot + tab name
    item.appendChild(indicator);
    item.appendChild(document.createTextNode(option.title));

    item.onclick = () => {
      // Also show dot in selected
      selected.innerHTML = '';
      const selDot = indicator.cloneNode(true);
      selected.appendChild(selDot);
      selected.appendChild(document.createTextNode(option.title));
      list.style.display = 'none';
      selected.dataset.value = option.id;
    };
    list.appendChild(item);
  });

  // Update selected display if a tab is already selected
  const selId = selected.dataset.value ? parseInt(selected.dataset.value, 10) : null;
  if (selId && options.some(o => o.id === selId)) {
    const selOption = options.find(o => o.id === selId);
    const isActive = activeTabs.includes(selId);
    selected.innerHTML = '';
    const selDot = document.createElement('span');
    selDot.textContent = '●';
    selDot.style.marginRight = '7px';
    selDot.style.fontWeight = 'bold';
    selDot.style.fontSize = '1.1em';
    selDot.style.color = isActive ? '#28a745' : '#222';
    selDot.title = isActive ? 'Refresh Active' : 'Inactive';
    selected.appendChild(selDot);
    selected.appendChild(document.createTextNode(selOption.title));
  }
}

selected.onclick = function (e) {
  e.stopPropagation();
  // Refresh active status before showing dropdown
  updateDropdownActiveStatus(() => {
    list.style.display = list.style.display === 'block' ? 'none' : 'block';
  });
};

document.addEventListener('click', function () {
  list.style.display = 'none';
});

// Update dropdown with latest active status
function updateDropdownActiveStatus(cb) {
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get({ activeTabs: [] }, function (data) {
      currentActiveTabs = data.activeTabs || [];
      populateDropdown(currentTabOptions, currentActiveTabs);
      if (typeof cb === 'function') cb();
    });
  } else {
    populateDropdown(currentTabOptions, []);
    if (typeof cb === 'function') cb();
  }
}