window.onload = function () {
  var app = new Vue({
    el: '#app',
    data: {
      titleComputed: '-',
      value: '-',
      percentage: '-',
      phoneNumber: '',
      password: ''
    },
    computed: {
      title: function () {

        // Get data of store  
        chrome.storage.sync.get({
          phoneNumber: '',
          password: ''
        }, items => {
          this.phoneNumber = items.phoneNumber;
          this.password = items.password;
        });

        if (this.phoneNumber != '' && this.password != '') {
          this.$http.post('https://cabinet.altel.kz/login',
            'loginId=' + this.phoneNumber + '&password=' + this.password + '',
            {
              emulateJSON: true,
              method: 'POST',
              credentials: true,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }
          ).then(response => {
          }, response => {
          });

          this.$http.get('https://cabinet.altel.kz/getTariffResources',
            {
              emulateJSON: true,
              method: 'GET',
              responseType: 'json',
              credentials: true
            }
          ).then(response => {
            //this.title = response.data[0].title;
            this.titleComputed = response.data[0].title;
            this.value = response.data[0].value;
            this.percentage = Math.round(response.data[0].percentage, 2) + '%';

          }, response => {
          });
        } else {
          console.log("Not set phone or password in options.");
        }
        return this.titleComputed;
      }
    }
  })
}
function GetStorage(result) {
  chrome.storage.sync.get({
    phoneNumber: '',
    password: ''
  }, function (items) {

    result(items);
  });
}