$(function() {
  $('#registerForm').on('submit', function(e) {
    e.preventDefault();

    $.post('backend/register.php', $(this).serialize())
      .done(response => {
        alert(response);
        window.location.href = 'login.html';
      })
      .fail(xhr => {
        alert(xhr.responseText);
      });
  });
});
