function showCustomAlert(message) {

  const oldAlert = document.getElementById('customAlertBox');
  if (oldAlert) oldAlert.remove();


  const alertBox = document.createElement('div');
  alertBox.id = 'customAlertBox';
  alertBox.className = 'custom-alert-box';
  alertBox.textContent = message;

  const closeBtn = document.createElement('span');
  closeBtn.className = 'custom-alert-close';
  closeBtn.innerHTML = '&times;';
  closeBtn.onclick = () => alertBox.remove();
  alertBox.appendChild(closeBtn);

  document.body.appendChild(alertBox);


  setTimeout(() => {
    if (alertBox.parentNode) alertBox.remove();
  }, 2500); // 2.5 sec
}
