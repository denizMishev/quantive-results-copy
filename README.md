# Quantive Results copy - A cut-down version of the Quantive Results webapp

## **Project description**

This project copies the general design and a part of the main functionalities from [Quantive Results](https://quantive.com/). I've used a React & HTML&CSS front-end and [Softuni's Practice Server](https://github.com/softuni-practice-server) for the REST API & authentication functionality.

## **Key features** ##

- Landing page
The user is first broght to a landing page from where they can either log in or register as the app requires the user to be authenticated in order to proceed further

- Login/Register 
This project uses a secure user authentication with hashed passwords and JWT tokens for user sessions. Registering automatically grants a logged in state.

- Home page
Home page displays the user's name, the teams they're a part of, indicating specifically the ones they're a manager of and also a grid of the OKR items that are assigned to them or a team they're a part of

- OKRs page
A page in which a use can find all the OKRs in the app and filter them by their owner

- OKR details page
This page showcases all the details regarding the OKR item and features a commenting functionality as well where users can post comments and edit or delete them

- Teams page and Employees page
These are pages where all teams and employees are showcased with the teams page featuring a grid of all the employees assigned to this team

- Team details page and Employee details page
Pages showcasing details regarding the team and the employee, both of these pages also showcase all OKR items that are owned by the team / employee

- Access control
Only the creator of a specific item (A team or an OKR) can perform CRUD operations on the item, the creators are labeled as " Editors " in the app and can be seen in the details pages of the teams and OKRs. 

## **Built with:**
- React 18.2.0
- [Softuni's practice server](https://github.com/softuni-practice-server)
- React error boundary 4.0.11
- Prettier 2.8.8

## **Local setup**

**Server setup** 
1. Go to https://github.com/softuni-practice-server/softuni-practice-server
2. Clone the repository
3. Build the executable script using the given sequence of commands in the repository's README.md Build section
4. Run `node server.js`

**Client setup**

1. Clone this repository
2. Run `npm install`
3. Run `npm start`

App will automatically open at a localhost URL.

##Print screens##

![quantive-results-copy project - Imgur (1)](https://github.com/denizMishev/quantive-results-copy/assets/115874978/fe374de2-4d8e-472a-8479-537f9be9a5ab)


