
# Hospital API 🚀
Welcome to the Hospital API. This API is designed for doctors and patients to manage patient reports and track patient health, aiming to control the spread of COVID-19 effectively.


## Features
- **Authentication**: Secure authentication system for doctors.
- **Authorization**: Role-based access control for managing resources.
- **Operations**: Create, read, and update doctors, and patients.
- **Relationships**: Establish relationships between hospitals, doctors, and patients.
- **Search**: Search functionality to find hospitals, doctors, and patients by various criteria.
- **Error Handling**: Proper error handling and response messages.

## File Structure
```csharp
├── config/                     
├── middlewares/               
├── src/                       
|    └── doctors/             
|    |     └── controllers/    
|    |     └── models/         
|    |     └── routes/        
|    └── patients/            
|    |     └── controllers/    
|    |     └── models/         
|    |     └── routes/         
|    └── utils/                 
├── index.js                    
├── package.json               
├── README.md                  
├── .gitignore                  
|── swagger.json               

```
## 🔥 Getting Started With The Project

1. Clone the repository:

    ```bash
    git clone https://github.com/joewish/HospitalAPI.git
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory and add the following variables:

    ```plaintext
    PORT=6000
    DB_URL=your_mongodb_uri
    JWT_Secret=your_jwt_secret
    JWT_Expire=specify days in which token expires

    ```

4. Start the server:

    ```bash
    npm start
    ```

