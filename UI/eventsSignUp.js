var module = (function () {
        function getUser(username) {
            var users = JSON.parse(localStorage.getItem('users'));
            return (users.find((user)=>{return user.username === username}));
        }
        function getPassword(usermame) {
            var users = JSON.parse(localStorage.getItem('users'));
            for (var item = 0; item < users.length; item++) {
                if(users[item].username === usermame){
                    return users[item].password;
                }
            }
        }
        function events() {

            document.getElementById('button_registration').addEventListener('click', (event)=> {
                var username = document.registrationForm.username.value;
                if (getUser(username) === undefined){

                    alert("Incorrect username!");
                } else{
                    var password = document.registrationForm.password.value;
                   if(password === getPassword(username)){
                       localStorage.setItem('user', JSON.stringify(username));
                       event.target;
                   }else{
                       alert("Incorrect password!");
                   }
                }
            });
        }
        return {
            events: events

        }
    }
)();
module.events();



