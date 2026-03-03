$(function () {
 
  function submitForm($form, url, successMsg) {
    $form.on('submit', function (e) {
      e.preventDefault();
      $.post(url, $form.serialize())
        .done(() => {
          alert(successMsg);
          $form[0].reset();
        })
        .fail(xhr => alert('Error: ' + xhr.responseText));
    });
  }

  submitForm($('#bookingForm'), 'backend/save_reservation.php', 'Thank you, your reservation was saved.');
  submitForm($('.form-box'), 'backend/save_message.php', 'Message sent.');
  

  // formularz rezerwacji + sprawdzenie dat
  const $modal = $('#bookingModal');
  const $openBtns = $('.openBooking');
  const $closeBtn = $('#closeBooking');
  const $checkIn = $modal.find('[name="check_in"]');
  const $checkOut = $modal.find('[name="check_out"]');

  const today = () => new Date();
  const fmt = date => date.toISOString().split('T')[0];
  const addDays = (date, days) => { 
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  };

  function syncDates() {
    const inDate = new Date($checkIn.val() || today());
    const minOut = fmt(addDays(inDate, 1));
    $checkIn.attr('min', fmt(today()));
    $checkOut.attr('min', minOut);

    if (!$checkOut.val() || new Date($checkOut.val()) < addDays(inDate, 1)) {
      $checkOut.val(minOut);
    }
    if (!$checkIn.val() || new Date($checkIn.val()) < today()) {
      $checkIn.val(fmt(today()));
    }
  }

  function openModal() {
    if (!$checkIn.val()) $checkIn.val(fmt(today()));
    if (!$checkOut.val()) $checkOut.val(fmt(addDays(today(), 1)));
    syncDates();
    $modal.addClass('show').attr('aria-hidden', 'false');
  }

  function closeModal() {
    document.activeElement.blur();
    $modal.removeClass('show').attr('aria-hidden', 'true');
  }

  $openBtns.on('click', openModal);
  $closeBtn.on('click', closeModal);
  $checkIn.on('change', syncDates);

//karuzele
  function carousels($carousel) {
    const $track = $carousel.find('.carousel-track');
    const $slides = $track.children();
    const $prev = $carousel.find('.carousel-button.prev');
    const $next = $carousel.find('.carousel-button.next');
    const $dots = $carousel.find('.carousel-nav').children();
    let index = 0;
    const slideCount = $slides.length;
    let autoplayId = null;

    function goToSlide(i) {
      i = ((i % slideCount) + slideCount) % slideCount;
      if ($slides.length) $track.css('transform', `translateX(-${i * 100}%)`);
      $slides.each((j, el) => $(el).toggleClass('current', j === i));
      $dots.each((j, el) => $(el).toggleClass('current', j === i));
      index = i;
    }

    $prev.on('click', () => { goToSlide(index - 1); restartAutoplay(); });
    $next.on('click', () => { goToSlide(index + 1); restartAutoplay(); });
    $dots.each((i, el) => $(el).on('click', () => { goToSlide(i); restartAutoplay(); }));
    $(window).on('resize', () => goToSlide(index));

    function startAutoplay() {
      stopAutoplay();
      if ($slides.length) autoplayId = setInterval(() => goToSlide(index + 1), 4000);
    }
    function stopAutoplay() { if (autoplayId) { clearInterval(autoplayId); autoplayId = null; } }
    function restartAutoplay() { stopAutoplay(); startAutoplay(); }

    startAutoplay();
  }

  
  $('.carousel, .room-carousel').each(function () {
    carousels($(this));
  });

// scroll  
   const btn = $(".scrollBtn");
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 300) {
      btn.fadeIn();
    } else {
      btn.fadeOut();
    }
  });

  btn.on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, "smooth");
  });

// status logowania
  $(function () {
    $.get('backend/session_status.php', function (res) {
      const data = JSON.parse(res);

      if (data.logged) {
        $('#loginLink').hide();
        $('#logoutBtn').show();
      } else {
        $('#loginLink').show();
        $('#logoutBtn').hide();
      }
    });

    $('#logoutBtn').on('click', function () {
      $.post('backend/logout.php').done(() => {
        alert('Logged out');
        location.reload();
      });
    });
  });

});
