(function ($) {
    "use strict";

    jQuery(document).ready(function ($) {
        $(document).on('submit', '#contact_form_submit', function (e) {
            e.preventDefault();
            var name = $('#name').val();
            var email = $('#email').val();
            var message = $('#message').val();
            if (name && email && message) {
                $.ajax({
                    type: "POST",
                    url: 'contact.php',
                    data: {
                        'name': name,
                        'email': email,
                        'message': message,
                    },
                    success: function (data) {
                        $('#contact_form_submit').children('.email-success').remove();
                        $('#contact_form_submit').prepend('<span class="mx-3 w-100 alert alert-success email-success">' + data + '</span>');
                        $('#name').val('');
                        $('#email').val('');
                        $('#message').val('');
                        $('.email-success').fadeOut(3000);
                    },
                    error: function (res) {
                    }
                });
            } else {
                $('#contact_form_submit').children('.email-success').remove();
                $('#contact_form_submit').prepend('<span class="mx-3 w-100 alert alert-danger email-success">All Fields are Required.</span>');
                $('.email-success').fadeOut(3000);
            }

        });
    })

}(jQuery));