function saveOption(option) {
  setStorage('option', option).then(() => {});
  loadSelectedOption();
  notify('Options is saved.');
}

function notify(message) {
  alert(message);
}

function load() {
  //load event listeners for options
  $('input[name="options"]').on('change', function (e) {
    saveOption(e.target.value);
  });

  loadSelectedOption();

  $('#button-send-message').on('click', function () {
    sendMessageToBackground();
  });
}

$(document).ready(function () {
  load();
});

function loadSelectedOption() {
  getStorage('option').then(function (value) {
    $.each($('input[name="options"]'), function (index, value) {
      $(value).parent().removeClass('active');
    });

    var seletedOption = $('input[name="options"][value="' + value + '"]');

    if (seletedOption.length > 0) {
      $(seletedOption[0]).parent().addClass('active');
    }
  });
}
