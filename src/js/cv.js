// todo: get rid of these ancient jQuery crap
import $ from 'jquery';

export const setEventHandlers = () => {
  console.debug("CV/Main");

  $(function () {
    $('ul.nav').on('click', 'a.nav-link', function (e) {
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