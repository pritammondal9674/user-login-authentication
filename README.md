This project is a Post and Comment Management System built using Laravel (backend) and React with Inertia.js (frontend).
It allows users to register/login, create posts, and comment on posts.
Admins can view, edit, and delete any post or comment, while normal users can manage only their own.

The main purpose of this assignment is to show a working CRUD system with authentication, using Laravel Fortify, Inertia.js, and React TypeScript together in one full-stack setup.


Login Credentials (for reference) (Database access not shared — these are sample credentials used during local testing)
* Admin – mondalpritam152@gmail.com / 123456
* Normal User – mondalroni151@gmail.com / 123456
Database Architecture (used in local setup) Main tables used: users, posts, role_user, roles, comments
Relationships:
* One user can have many posts.
* One post can have many comments.
* One user can have many comments. All relationships are connected using Eloquent Models in Laravel.
Completed Features
1. Authentication (Laravel Fortify)
    * Secure login system for Admin and User.
    * Redirects to proper pages after login.
    * Session maintained properly.
2. Post Management
    * Create, edit, view, and delete posts.
    * Posts linked to their creator (user_id).
    * Delete confirmation popup added.
    * Admin can manage all posts.
3. Comment System
    * Users and admins can comment on posts.
    * All comments shown under each post.
    * Basic comment delete setup done.
    * Structure ready for user-based permissions.
Main Technical Logics
* Laravel Fortify: Handles authentication and session management.
* Inertia.js + React: Provides frontend rendering without page reload.
* Component Division:
    * Index.tsx – Displays all posts.
    * Show.tsx – Shows a single post with comments.
    * Comments.tsx – Handles adding and deleting comments.
