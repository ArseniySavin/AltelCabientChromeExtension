window.onload = function () {
  var app = new Vue({
    el: '#app',
    data: {
      phoneNumber: '',
      password: '',
      isSuccess: false,
      tariffs: [{}]
    },
    computed: {
      tariffsData: function () {

        if (!this.isSuccess) {
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
              this.tariffs = response.data;
              this.isSuccess = true;
            }, response => {
            });
          } else {
            console.log("Don't forget set authentication data.");
          }
        }
        return this.tariffs;
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