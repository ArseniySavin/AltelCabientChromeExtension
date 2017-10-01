function save_options() {
    var phone = document.getElementById('phoneId').value;
    var pass = document.getElementById('passId').value;

    chrome.storage.sync.set({
        phoneNumber: phone,
        password: pass
    }, function() {
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }

  function restore_options() {
    chrome.storage.sync.get({
        phoneNumber: '',
        password: ''
    }, function(items) {
      document.getElementById('phoneId').value = items.phoneNumber;
      document.getElementById('passId').value = items.password;
    });
  }
  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click',
      save_options);