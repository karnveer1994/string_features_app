git clone https://github.com/dguptaruby/string_features_app

cd string_features_app

bundle install

change config/database.yml

rake db:create

rake db:migrate

rails s





Ruby on Rails and React Challenge

The Challenge
Build a Ruby on Rails api-only backend and a React.js frontend to communicate with the
backend.
Features
● User model
● Authentication using email (Signup, Login and logout). You can use devise,
devise_token_auth gem or similar
● Provide a backend endpoint to perform a string calculation as follow:
○ Given two strings A and B, determine if B is a non-continous substring of B Examples:
A: “abcdefg”
B: “beg”
Answer: YES
(substring charachters: abcdefg)
A: “abcadebabdeb”
B: “baabd”
Answer: YES
(substring charachters: abcadebabdeb)
A: “abcadebabdeb”
B: “baabbd”
Answer: NO

● Build a frontend form to allow registered users to submit calculations and view the answer
● Store the history of the user calculation requests and show them in the front-end to the user
● User ability to remove a calculation from their submission history
● Optional features
○ Ability to reset password
○ Ability to see the matching characters of B in A as underlined characters on the
frontend, like abcadebabdeb

Deliverables
● The frontend and backend code on a GitHub repository
● Automated tests

● Clear documentation in README on how to run the server and the frontend
● Clear documentation in README on how to run the tests
