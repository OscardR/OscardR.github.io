import $ from 'jquery';

export const setEventHandlers = () => {
  console.debug("CV/Main");

  // todo: get rid of these ancient jQuery crap
  $(function () {
    $('a').on('click', function (e) {
      $(this).closest('li').addClass('active').siblings().removeClass('active');
      $('html, body')
        .animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 50
          },
          500
        );
    });
  });
};