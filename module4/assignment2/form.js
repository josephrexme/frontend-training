(function(){
  // jQuery Way
  var contactForm = $('#contactForm');
  var modal = new tingle.modal();
  var name = $('#name');
  var email = $('#email');
  var message = $('#message');
  contactForm.submit(function(event){
    event.preventDefault();
    // Cache variables in event for change
    if(name.val() && email.val()) {
      modal.setContent(
        "<h1>Hello " + name.val() +
        ",</h1><p>We received your message:</p><blockquote>" + message.val() +
        "</blockquote><p>A reply has been sent to your email: " + email.val()
        );
    } else {
      modal.setContent("<h1>A name and email is required!!!</h1>")
    }
    modal.open();
    // Empty form fields
    name.val('');
    email.val('');
    message.val('');
  });
}());

