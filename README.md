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
These are pages where all teams and employees are showcased with the Employees page featuring a grid of all the teams the employee is a part of and the Teams page indicating the total amount of members in the team and also the team's manager.

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

## Print screens ##

![quantive-results-copy project - Imgur (1)](https://github.com/denizMishev/quantive-results-copy/assets/115874978/fe374de2-4d8e-472a-8479-537f9be9a5ab)

![quantive-results-copy project - Imgur (2)](https://github.com/denizMishev/quantive-results-copy/assets/115874978/ccebc6da-9714-4926-a880-15c6bf27ac1d)

![quantive-results-copy project - Imgur (3)](https://github.com/denizMishev/quantive-results-copy/assets/115874978/d9ee7f35-d7e9-4429-84c4-b6a6b2ccbf12)

![quantive-results-copy project - Imgur (4)](https://github.com/denizMishev/quantive-results-copy/assets/115874978/b0f254d4-4050-4141-86ab-a23ae3bd6075)

![quantive-results-copy project - Imgur (5)](https://github.com/denizMishev/quantive-results-copy/assets/115874978/a6980df1-9376-4565-a3ba-951a92b385ef)

![quantive-results-copy project - Imgur (6)](https://github.com/denizMishev/quantive-results-copy/assets/115874978/a1e8fa19-dd4c-4980-b450-384c61a7f2d2)

![quantive-results-copy project - Imgur (7)](https://github.com/denizMishev/quantive-results-copy/assets/115874978/5263aa07-6610-498d-93cb-2e4c0d02daa3)

![quantive-results-copy project - Imgur (8)](https://github.com/denizMishev/quantive-results-copy/assets/115874978/070258c1-f8dc-4ba6-b85b-61ff1275cc97)

![quantive-results-copy project - Imgur (9)](https://github.com/denizMishev/quantive-results-copy/assets/115874978/4dee34be-28ca-4b91-aaeb-10a9c22af13c)




