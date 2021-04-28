function removeRow(e){
	e.preventDefault();
	$(e.target).parent().parent().remove();
}

$(document).ready(function () {
	var newAcademicsNo = 1 ;
	$('.add-more').click(function (e) {
		e.preventDefault();
		var newIn ='<tr class="row gtr-0 appliRow'+newAcademicsNo+'" id="field1"> <td class="col-2 col-12-small" style="text-align: center; padding: 0;">'+
		'<input type="text" name="othCourse' + newAcademicsNo +'" id="othCourse' + newAcademicsNo +'" style="margin: 0; background-color: transparent; border: none;" placeholder="Enter Course" required></td><td class="col-2 col-12-small" style="text-align: center; padding: 0;">'+
		'<input type="text" name="othName' + newAcademicsNo +'" id="othName' + newAcademicsNo +'" style="margin: 0;" placeholder="Name of Board/College/University"  required></td><td class="col-1 col-12-small" style="text-align: center; padding: 0;">'+
		'<input type="text" name="othPercent' + newAcademicsNo +'" id="othPercent' + newAcademicsNo +'" value="" style="margin: 0;" placeholder="% of Marks" required></td><td class="col-2 col-12-small" style="text-align: center; padding: 0;">'+
		'<input type="text" name="othSubject' + newAcademicsNo +'" id="othSubject' + newAcademicsNo +'" value="" style="margin: 0;" placeholder="Subject(s)" required></td><td class="col-2 col-12-small" style="text-align: center; padding: 0; font-size: xx-small;">'+
		'<select name="othyop' + newAcademicsNo +'" id="othyop' + newAcademicsNo +'"><option value="0">Select Year</option></select></td><td class="col-3 col-12-small" style="text-align: center; padding: 0;">'+
		'<div style="margin: 4%;"><input type="file" id="othFile' + newAcademicsNo +'" name="othFile' + newAcademicsNo +'"></div>'+
		'<button class="but" onclick=removeRow(event) style="padding: 0%; height: auto;">-</button>'+
		'</td></tr>' ;
	$('.academic-tbody').append(newIn);
	newAcademicsNo+=1;
  });
});

(function ($) {
  var $window = $(window),
    $body = $('body'),
    $main = $('#main');

  // Breakpoints.
  breakpoints({
    xlarge: ['1281px', '1680px'],
    large: ['981px', '1280px'],
    medium: ['737px', '980px'],
    small: ['481px', '736px'],
    xsmall: ['361px', '480px'],
    xxsmall: [null, '360px'],
  });

  // Play initial animations on page load.
  $window.on('load', function () {
    window.setTimeout(function () {
      $body.removeClass('is-preload');
    }, 100);
  });

  // Nav.
  var $nav = $('#nav');

  if ($nav.length > 0) {
    // Shrink effect.
    $main.scrollex({
      mode: 'top',
      enter: function () {
        $nav.addClass('alt');
      },
      leave: function () {
        $nav.removeClass('alt');
      },
    });

    // Links.
    var $nav_a = $nav.find('a');

    $nav_a
      .scrolly({
        speed: 1000,
        offset: function () {
          return $nav.height();
        },
      })
      .on('click', function () {
        var $this = $(this);

        // External link? Bail.
        if ($this.attr('href').charAt(0) != '#') return;

        // Deactivate all links.
        $nav_a.removeClass('active').removeClass('active-locked');

        // Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
        $this.addClass('active').addClass('active-locked');
      })
      .each(function () {
        var $this = $(this),
          id = $this.attr('href'),
          $section = $(id);

        // No section for this link? Bail.
        if ($section.length < 1) return;

        // Scrollex.
        $section.scrollex({
          mode: 'middle',
          initialize: function () {
            // Deactivate section.
            if (browser.canUse('transition')) $section.addClass('inactive');
          },
          enter: function () {
            // Activate section.
            $section.removeClass('inactive');

            // No locked links? Deactivate all links and activate this section's one.
            if ($nav_a.filter('.active-locked').length == 0) {
              $nav_a.removeClass('active');
              $this.addClass('active');
            }

            // Otherwise, if this section's link is the one that's locked, unlock it.
            else if ($this.hasClass('active-locked'))
              $this.removeClass('active-locked');
          },
        });
      });
  }

  // Scrolly.
  $('.scrolly').scrolly({
    speed: 1000,
  });
})(jQuery);

/////   Profile Pic   /////
$('#profileImage').click(function (e) {
  $('#imageUpload').click();
});
function fasterPreview(uploader) {
  if (uploader.files && uploader.files[0]) {
    $('#profileImage').attr(
      'src',
      window.URL.createObjectURL(uploader.files[0])
    );
  }
}

$('#imageUpload').change(function () {
  fasterPreview(this);
});
