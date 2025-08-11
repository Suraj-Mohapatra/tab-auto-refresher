document.addEventListener('DOMContentLoaded', function () {
  var intervalInput = document.getElementById('interval');
  if (intervalInput) {
    intervalInput.addEventListener('input', function (e) {
      this.value = this.value.replace(/[^0-9]/g, '');
    });
  }
});
