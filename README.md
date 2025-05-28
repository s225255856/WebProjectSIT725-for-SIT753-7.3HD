# 🎁 Giftzy - SIT725 Group Project

Giftzy is a web application built using **Node.js** that provides smart solutions for **gift recommendation**, **event planning**, and **event marking**. It is designed to assist users in making thoughtful and timely decisions for various events and special occasions.

## 💡 Project Features

- 📅 Event Planning Assistant
- 🌍 Gift Ideas Community
- ✅ Event Marking and Tracking System
- 🔐 User Authentication and Role Management
- 🎁 Gift Recommendations

## 🛠️ Tech Stack

- **Backend**: Node.js, Express
- **Frontend**: EJS (Embedded JavaScript) Templates
- **Database**: MongoDB
- **Authentication**: JWT / Cookie-based sessions

## 👨‍👩‍👧‍👦 Team Members

| Name             | Student ID |
| ---------------- | ---------- |
| Tsz Hin Yee      | 223983938  |
| Cynthia Wijaya   | 225138694  |
| My Chi Nguyen    | 225255856  |
| Nethmi Weeraman  | 224350062  |
| Janaki Chaudhary | 224941505  |

## HI-FI Figma Prototype
- [**📅 Event Planning Assistant**](https://www.figma.com/proto/SkomSEUBv37MkNrlGSykxv/Event-Reminder?node-id=1-1848&p=f&t=VgbUJUZ9nTjrLNsE-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A1848&show-proto-sidebar=1)
- [**🌍 Gift Ideas Community**](https://www.figma.com/proto/yrB3WDk7yrwd1viMnE9Mpp/GiftzyWebProject?node-id=607-27&t=1fn8KJwkaiQzboOE-1&scaling=scale-down&content-scaling=fixed&pageid=1669%3A162202&starting-point-node-id=607%3A27)
- **🛒 Gift Marketplace** :
- **✨ Secret Angel Game** :
- [**🎁Gift Recommendations** :](https://www.figma.com/design/eYVMqe8pcDNxO87Vr5MK6v/SIT725-Wireframes?node-id=1-2&t=S7klg0PxhvFi3bn7-1) 

  
## API Documentation

/api/users

- `GET` : Get all users

/api/users/google

- `GET` : Authenticate user login by Google

/api/users/login

- `POST` : User login

/api/users/forget-password

- `POST` : user forget password

/api/posts/addpost

- `POST` : Upload new Post

/api/posts/loadMorePosts

- `GET` : Load more 5 Posts

/api/posts/like/:postId

- `POST` : Toggle like a post

/api/communityMainPage

- `GET` : Load gift ideas community page

/api/detailPostPage

- `GET` : Load detail post page

/api/posts/quizSubmit

- `POST` : Submit quiz answers and receive gift suggestions

/quizForm

- `GET` : Load multi-step quiz form

/quizAdminLogin

- `GET` : Render admin login page
- `POST` : Validate admin login

/quizAdminDashboard

- `GET` : Show all quiz submissions (admin only)

/quizAdmin/delete/\:id

- `POST` : Soft delete a quiz submission

/quizAdmin/restore/\:id

- `POST` : Restore a soft-deleted quiz submission


/api/eventReminder

- `GET` : Load all events on to calendar

/api/eventReminder/create

- `POST` : Upload/Create new event

/api/eventReminder/edit/:id

- `PUT` : Edit/Update selected event

/api/eventReminder/bulk-delete

-`DELETE`: Delete selected events

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB running locally or on the cloud

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/cynthiawjy135/WebProjectSIT725.git
   cd giftzy
   ```

2. Run the install script:

```
npm install
```

3. Make sure to create a .env file with the necessary environment variables:
   Please refer to the .env.example

```
MONGO_URI=
JWT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

4. To run the project, use this command:

```
npm run start
```

5. Open your web broswer at

```
http://localhost:3000
```

6. Backend Architecture Summary

```mermaid
flowchart TD
    subgraph Client["Browser (Client)"]
        A[EJS Templates] -->|Fetch API| B[HTTP Requests]
        A -->|WebSocket| C[Socket.IO Client]
    end

    subgraph Server["Node.js Server"]
        B --> D[Express Routes]
        D --> E[Controllers]
        E --> F[Services]
        F --> G[(MongoDB)]

        C --> H[Socket.IO Server]
        H --> I[Socket Handlers]
        I -->|Read/Write| G
        I -->|Broadcast| C

        %% Email Service Integration
        F --> J[Email Service]
        J -->|SendGrid/Nodemailer| K[(SMTP Server)]
        I -->|Trigger Emails| J
    end

    A -->|Render| L[HTML/CSS/JS]
    L -->|Display| Client
    F -->|Return Data| E
    E -->|JSON| D
    D -->|JSON| B

    %% Email Triggers
    E -->|User Signup| J
    F -->|Password Reset| J
    I -->|Game Invites| J
```

_Diagram created by Tsz Hin Yee (223983938)_

https://deakin365-my.sharepoint.com/:w:/g/personal/s223983938_deakin_edu_au/EQw_A4UQl99PktAWoutjvIkBtAvXk3CUKvHzwA9ePMLXiA?e=qI0UNy
