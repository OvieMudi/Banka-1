/* eslint-disable no-unused-vars */
const toggleSidebar = () => {
  const sidebar = document.getElementById('sidebar');
  if (sidebar.style.display === 'none') {
    sidebar.style.display = 'block';
  } else {
    sidebar.style.display = 'none';
  }
};

const toggleActiveDeactive = () => {
  const btn = document.getElementById('btn-act');
  if (btn.innerHTML === 'ACTIVATE') {
    btn.innerHTML = 'DEACTIVATE';
  } else {
    btn.innerHTML = 'ACTIVATE';
  }
};

const lists = document.querySelectorAll('.menu-items li');

const removeClass = () => {
  const activeMenu = document.querySelector('.dashboard-area .items.active');
  activeMenu.classList.remove('active');
};

const showCurrentMenu = (menuId) => {
  document.getElementById(menuId)
    .classList.add('active');
};

Array.from(lists).forEach((listItem) => {
  listItem.addEventListener('click', (event) => {
    const tartgetSectionId = event.target.dataset.menu;
    removeClass();
    showCurrentMenu(tartgetSectionId);
    document.getElementById('menuTopic').innerHTML = tartgetSectionId.replace(/-/g, ' ');
  });
});

// function goToDashboard() {
//   const email = document.getElementById('emailInput').value;
//   if (email === 'admin@banka.com') {
//     window.location = 'dashboard-admin.html';
//   } else if (email === 'staff@banka.com') {
//     window.location = 'dashboard-staff.html';
//   } else { window.location = 'dashboard.html'; }
//   return false;
// }
