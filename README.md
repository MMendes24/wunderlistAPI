## Deployment

https://wunderlist-3.herokuapp.com/

## Basic Structure

![FlowChart](/asset/flowchart.png)

## End-points:

---

### USERS

Users need to register and login to get access to the task interface.

* /api/users/register (POST)

    an expample of the request body:
    ```
        {
        "username": "one",
        "password": "one111",
        "name": "jacob",
        "email": "jacob@abc.com",
        "phone": "902-902902",
        "role": 1
        }
    ```

    username, password, name and email are **required.**

    phone and role are **optional.**

    There are two type of user role, which are **1 - admin** and **2 - user**. If the role is not specified in the request, it will be set to 2 by default. If the user's role are explictly set to 1, the user will have the admin privilage.

* /api/users/login (POST)

    an expample of the login body:
    ```
        {
        "username": "one",
        "password": "one111",
        }
    ```
    API returns a token as well as the user's id.

* /api/users (GET)

    Return a list of users.

    User needs to be an admin and logged in.

* /api/users/:id (DELETE)

    Delete the user with certain id.

    User needs to be an admin and logged in.


* /api/users/:id (PUT)

    update the user info with certain id.

    User needs to be logged in.

### Tasks

All the task end points require a token to get access.

* /api/tasks (GET)

    return a list of all tasks

* api/tasks/:id (GET a single task via ID)

    return a task 

* api/tasks/user/:id (Get all tasks belonging to a user)

    return a list of tasks

* api/tasks (POST)

    add a new task or an array of tasks.

    an expample of the request:
    ```
        {
        "task": "something to do",
        "user_id": 1,
        "completed": false,
        }
    ```
    task and user_id are **required**

    completed is **optional** and defaulted to false. 

* api/tasks/:id (PUT / DELETE)

    update or delete a task with task id.

