$(function() {
  $('#loginForm').on('submit', function(e) {
    e.preventDefault();

    $.post('backend/login.php', $(this).serialize())
      .done(() => {
        alert('Logged in successfuly');
        window.location.href = 'index.html'; 
      })
      .fail(xhr => {
        if (xhr.status === 404) {
          alert(xhr.responseText); 
        } else if (xhr.status === 401) {
          alert(xhr.responseText); 
        } else {
          alert('Error: ' + xhr.responseText);
        }
      });
  });
});
