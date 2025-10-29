Project Documentation

Overview
This is a blog site made with Laravel. Users and admins can log in, write posts, and comment on posts. The login system is secure. The project shows how the backend and frontend work together.

Database
The main database tables are:
* users: stores user details like name, email, password, and role (user or admin)
* posts: stores blog posts with title, description, and who posted it
* comments: stores comments with the comment text, who wrote it, and which post it is for
Relations:
* One user can write many posts
* One post can have many comments
* Each comment belongs to one user and one post
Features Done
* Login system for users and admins
* After login, users and admins go to different dashboards
* Users and admins can create, edit, view, and delete posts
* Users see only their own posts, admins see all posts
* Users and admins can add comments on posts
* Can edit or delete comments
* A confirmation popup appears before deleting a post
Still Working On
* Showing a success message after deleting a post or comment
* Fixing who can delete comments (permissions)
* Login with google/facebook
* Adding a summary section on the admin dashboard
How to Install and Run

1. Clone the project: git clone [user-login-authentication]
2. Go to the project folder: cd user-login-authentication (Whatever project name)
3. Install PHP dependencies: composer install
4. Install JavaScript dependencies: npm install
5. Setup environment file: Copy the .env.example file and name it .env Then update your database name, username, and password inside the .env file
6. Run database migrations: php artisan migrate
7. Start the development server: php artisan serve
Note
(Used LARAVEL v12.35 and php 8.4)
The database login details are not included for security. You can create your own test data after running the migrations. All the main code is available on GitHub.
