Portfolio Project for learning: Copy of some of the core functionality and visual look of the Quantive Results app 
This repository serves as a portfolio/learning project, being a reduced version of the Quantive Results app. This cut-down version includes some of the core features of the application, such as CRUD operations with objectives, teams and comments

Features

1. User Authentication
The project uses secure user authentication with hashed passwords and JWT tokens for user sessions. Registering automatically grants a logged in state.
2. Access control
Only the creators of the specific item (Team / OKR / Comment) are able to do CRUD operations on it. 
2. Landing page
A landing page where users can either log in or register
3. Home page 
The home page the users are redirected to once they login/register serving as a dashboard to showcase OKRs that the currently logged in users owns, and the teams they're a part of, be it ones that they manage or ones they're only a member in.
4. OKRs Page
A page in which a user can find all the OKRs in the app and filter them by ownership
5. OKR Details
Page showcasing OKR owners, the OKR's editor (the creator who can do CRUD operations on the item), comments on the OKR owner  
6. Teams page, team details page
7. Employees page, employee details page 

Technologies Used
The app uses vanilla HTML&CSS, React and React router dom for the front end, the REST API is SoftUni's practice server - https://github.com/softuni-practice-server/softuni-practice-server/blob/master/JSONSTORE.md

Future Enhancements
I'm planning on refactoring the HTML&CSS utility classes and adding pagination for the Teams, Employees and OKRs page.
