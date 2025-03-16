#Habits Admin App
The Habits Admin App is a Next.js-based application designed to help administrators manage challenges, habits, and users, as well as view statistics and analytics. This app is fully Dockerized and includes comprehensive testing for reliability and scalability.

#Features
#Admin Dashboard:

Manage challenges, habits, and users.

View detailed statistics and analytics.

Monitor user progress and engagement.

Dockerization:

Easy setup and deployment using Docker.

Consistent development and production environments.

#Testing:

Comprehensive unit and integration tests.

End-to-end testing for critical workflows.

#Getting Started
Prerequisites
Node.js (v18 or higher)

Docker (v20 or higher)

npm or yarn

Installation
Clone the repository:

```bash

git clone https://github.com/hissoune/myhabits-admin
cd habits-admin-app
```
Install dependencies:

```bash

npm install

# or
yarn install

```
Set up environment variables:

Create a .env file in the root directory.

Add the required environment variables (e.g., database connection, API keys).

Running the App
Local Development
Start the development server:

```bash

npm run dev
# or
yarn dev
```
Access the app at http://localhost:3000.

Docker
Build the Docker image:

```bash

docker-compose build
```
Run the app in Docker:

```bash

docker-compose up
```
Access the app at http://localhost:3000.

Testing
Unit and Integration Tests
Run tests:

```bash

npm run test
# or
yarn test
```

#Admin Features
Managing Challenges
Create Challenges:

Admins can create new challenges with details like name, description, start date, and end date.

Update Challenges:

Admins can modify existing challenges, including updating progress or extending deadlines.

Delete Challenges:

Admins can remove challenges that are no longer relevant.

#Managing Habits
Create Habits:

Admins can define new habits and associate them with specific challenges or users.

Update Habits:

Admins can edit habit details, such as frequency or completion status.

Delete Habits:

Admins can remove habits that are no longer needed.

#Managing Users
View Users:

Admins can see a list of all users and their details.

ban Users:

Admins can ban or unban user information, such as roles or progress.



Viewing Statistics
Challenges Statistics:

Admins can view metrics like participation rates, completion rates, and user engagement for each challenge.

Habits Statistics:

Admins can track habit completion rates and user progress over time.

User Statistics:

Admins can monitor individual user activity, including completed habits and challenges.

Dockerization
Docker Compose Setup
The app uses Docker Compose to manage containers for the Next.js app and any dependencies (e.g., databases).

Dockerfile:

The Dockerfile defines the Next.js app container.

docker-compose.yml:

The docker-compose.yml file orchestrates the app and its dependencies.

Running in Docker
Build and start the app:

```bash
docker-compose up --build
```
Stop the app:

```bash
docker-compose down
```
Testing
Unit Tests
Jest is used for unit  testing.

Tests are located in the __tests__ directories.




Contributing
Fork the repository.

Create a new branch for your feature or bugfix.

Submit a pull request with a detailed description of your changes.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Support
For any issues or questions, please open an issue on the GitHub repository.

This README provides a comprehensive overview of your app, including setup instructions, features, and how admins can manage the system. Let me know if you need further customization! 🚀