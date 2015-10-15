(function($){

	/* ---------------------------------------------- /*
	 * Preloader
	/* ---------------------------------------------- */

	$(window).load(function() {
		$('#status').fadeOut();
		$('#preloader').delay(300).fadeOut('slow');
	});

	$(document).ready(function() {
		
	/* ---------------------------------------------- /*
	 * Input text to frm
	/* ---------------------------------------------- */   
	$('textarea').blur(function() {
	  $('#contact textarea').each(function() {
		$this = $(this);
		if (this.value != '') {
		  $this.addClass('focused');
		  $('textarea + label + span').css({
			'opacity': 1
		  });
		} else {
		  $this.removeClass('focused');
		  $('textarea + label + span').css({
			'opacity': 0
		  });
		}
	  });
	});

	$('#contact .field:first-child input').blur(function() {
	  $('#contact .field:first-child input').each(function() {
		$this = $(this);
		if (this.value != '') {
		  $this.addClass('focused');
		  $('.field:first-child input + label + span').css({
			'opacity': 1
		  });
		} else {
		  $this.removeClass('focused');
		  $('.field:first-child input + label + span').css({
			'opacity': 0
		  });
		}
	  });
	});

	$('#contact .field:nth-child(2) input').blur(function() {
	  $('#contact .field:nth-child(2) input').each(function() {
		$this = $(this);
		if (this.value != '') {
		  $this.addClass('focused');
		  $('.field:nth-child(2) input + label + span').css({
			'opacity': 1
		  });
		} else {
		  $this.removeClass('focused');
		  $('.field:nth-child(2) input + label + span').css({
			'opacity': 0
		  });
		}
	  });
	});
	
	/* ---------------------------------------------- /*
	 * Skills
	/* ---------------------------------------------- */    
	//var color = $('#home').css('backgroundColor');

	$('.skills').waypoint(function(){
		$('.chart').each(function(){
		$(this).easyPieChart({
				size:140,
				animate: 2000,
				lineCap:'butt',
				scaleColor: false,
				barColor: '#f05f40',
				trackColor: 'transparent',
				lineWidth: 10
			});
		});
	},{offset:'80%'});
	
	/* ---------------------------------------------- /*
	 * E-mail validation
	/* ---------------------------------------------- */

	function isValidEmailAddress(emailAddress) {
		var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
		return pattern.test(emailAddress);
	};

	/* ---------------------------------------------- /*
	 * Contact form ajax
	/* ---------------------------------------------- */

	$('#contact-form').submit(function(e) {

		e.preventDefault();

		var c_name = $('#c_name').val();
		var c_email = $('#c_email').val();
		var c_message = $('#c_message ').val();
		var response = $('#contact-form .ajax-response');
		
		var formData = {
			'name'       : c_name,
			'email'      : c_email,
			'message'    : c_message
		};

		if (( c_name== '' || c_email == '' || c_message == '') || (!isValidEmailAddress(c_email) )) {
			response.fadeIn(500);
			response.html('<i class="fa fa-warning"></i> Please fix the errors and try again.');
		}

		else {
				 $.ajax({
						type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
						url         : 'assets/php/contact.php', // the url where we want to POST
						data        : formData, // our data object
						dataType    : 'json', // what type of data do we expect back from the server
						encode      : true,
						success		: function(res){
										var ret = $.parseJSON(JSON.stringify(res));
										response.html(ret.message).fadeIn(500);
						}
					});
			}           
			return false;
		});

	});

})(jQuery);