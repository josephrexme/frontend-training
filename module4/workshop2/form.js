(function(){
  // JavaScript Way
  /*
  var contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', function(event) {
    // Obsolete way
    // return false;
    event.preventDefault();
  });
  */
  // jQuery Way
  var contactForm = $('#contactForm');
  var name = $('#name');
  var email = $('#email');
  var message = $('#message');
  contactForm.submit(function(event){
    event.preventDefault();
    console.log(name.val(), email.val(), message.val());
  });
}());