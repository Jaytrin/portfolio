/* ---------------------------------------------
 Contact form
 --------------------------------------------- */
$(document).ready(callMailHandler);
    
//     function(){
//     $("#submit_btn").click(function(){
        
//         //get input field values
//         var user_name = $('input[name=name]').val();
//         var user_email = $('input[name=email]').val();
//         var user_message = $('textarea[name=message]').val();
        
//         //simple validation at client's end
//         //we simply change border color to red if empty field using .css()
//         var proceed = true;
//         if (user_name == "") {
//             $('input[name=name]').css('border-color', '#e41919');
//             proceed = false;
//         }
//         if (user_email == "") {
//             $('input[name=email]').css('border-color', '#e41919');
//             proceed = false;
//         }
        
//         if (user_message == "") {
//             $('textarea[name=message]').css('border-color', '#e41919');
//             proceed = false;
//         }
        
//         //everything looks good! proceed...
//         if (proceed) {
//             //data to be sent to server
//             post_data = {
//                 'userName': user_name,
//                 'userEmail': user_email,
//                 'userMessage': user_message
//             };
            
//             //Ajax post data to server
//             $.post('./php/mail_handler.php', post_data, function(response){
            
//                 //load json data from server and output message     
//                 if (response.type == 'error') {
//                     output = '<div class="error">' + response.text + '</div>';
//                 }
//                 else {
                
//                     output = '<div class="success">' + response.text + '</div>';
                    
//                     //reset values in all input fields
//                     $('#contact_form input').val('');
//                     $('#contact_form textarea').val('');
//                 }
                
//                 $("#result").hide().html(output).slideDown();
//             }, 'json');
            
//         }
        
//         return false;
//     });
    
//     //reset previously set border colors and hide all message on .keyup()
//     $("#contact_form input, #contact_form textarea").keyup(function(){
//         $("#contact_form input, #contact_form textarea").css('border-color', '');
//         $("#result").slideUp();
//     });
    
// });



function callMailHandler(){
    $("#submitBtn").on('click',function(e) {
        $('img.loadingGif').removeClass('hide');
        const submittingMessage = `<i class="far fa-envelope"></i> Sending message...`
        $('.form-tip').text('').append(submittingMessage);
        e.preventDefault();
        const email = $('input.form-control[name=email]').val();
        const name = $('input.form-control[name=name]').val();
        const body = $('textarea.form-control[name=body]').val();

        const emailRegex =/^(?![ ])(?!.*[ -]$)(?!.*[ ]{2})(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const nameRegex = /^(?![ -])(?!.*[ -]$)(?!.*[ -]{2})[a-zA-Z \-]{2,20}$/;
        const messageRegex = /^.{2,1000}$/;

        const emailCheck = emailRegex.test(email);
        const nameCheck = nameRegex.test(name);
        const messageCheck = messageRegex.test(body);

        if(!emailCheck){
            $('#email').addClass('inputError');
            $('.emailSuccess').addClass('hideMessage');
            $('.emailError').removeClass('hideMessage');
        } else {
            $('#email').addClass('inputSuccess');
            $('.emailSuccess').removeClass('hideMessage');
            $('.emailError').addClass('hideMessage');
        }

        if(!nameCheck){
            $('#name').addClass('inputError');
            $('.nameSuccess').addClass('hideMessage');
            $('.nameError').removeClass('hideMessage');
        } else {
            $('#name').addClass('inputSuccess');
            $('.nameSuccess').removeClass('hideMessage');
            $('.nameError').addClass('hideMessage');
        }

        if(!messageCheck){
            $('#message').addClass('inputError');
            $('.messageSuccess').addClass('hideMessage');
            $('.messageError').removeClass('hideMessage');
        } else {
            $('#message').addClass('inputSuccess');
            $('.messageSuccess').removeClass('hideMessage');
            $('.messageError').addClass('hideMessage');
        }

        if(emailCheck && nameCheck && messageCheck){
            $.ajax({
                type:'POST',
                url: './php/mail_handler.php',
                data: {
                    email: email,
                    name: name,
                    body: body
                },
                success: messageSent,
                error: messageSendFail
            }).then(()=>{
                $('img.loadingGif').addClass('hide');
            })
        } else {
            messageFail();
        }

            
    });
    
    };

function messageSent(){
    const successMessage = `<i class="fas fa-check-circle"></i> Message successfully sent.`;
    $('.form-tip').text('').append(successMessage).css('color','green');
    $('#contact_form input').val('');
    $('#contact_form textarea').val('');
    $('.inputSuccessMessage').addClass('hideMessage');
    $('.inputErrorMessage').addClass('hideMessage');
    $('#name').removeClass('inputError');
    $('#email').removeClass('inputError');
    $('#message').removeClass('inputError');
    $('.input-md').removeClass('inputSuccess inputError');
}

function messageFail(){
    const failedMessage = `<i class="fas fa-exclamation-circle"></i> Please check your inputs.`;
    $('.form-tip').text('').append(failedMessage).css('color','red');
    $('img.loadingGif').addClass('hide');
}

function messageSendFail(){
    const failedMessage = `<i class="fas fa-exclamation-circle"></i> Message Failed to send. Please feel free to reach out at contact@jaytrin.com.`;
    $('.form-tip').text('').append(failedMessage).css('color','red');
}