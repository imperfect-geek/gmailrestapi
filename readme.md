# Gmail REST API

_Recomended Procedure_

To run the application in **Development mode** (on Windows):

1. Install all dependencies including development dependencies.
2. Create a .env file containing
   - PORT
   - GOOGLE_CLIENT_ID
   - GOOGLE_CLIENT_SECRET
   - SESSION_SECRET
3. run command **npm run dev**
4. Login using **GET /auth/google**
5. Send mail using **POST /sendmail**
   by running below mentioned script in cosole of the browser:
   
   const data = {
   to: "sample@example.com",
   subject: "Assignment Test",
   message: "Hello World"
   }
   
   fetch("_{{url}}_/sendmail", {
   
   method: 'POST',
   
   headers: {
   
   'Content-Type': 'application/json'
   
   },
   
   body: JSON.stringify(data)
   
   }).then(response => response.json())
   
   .then(data => console.log(data)).catch(error => console.log(error))
   
   

_Alternative Procedure_

To run the application in **Production mode** (on Windows):

1. Install all necessary dependencies.
2. Set these environment variables

   - PORT
   - GOOGLE_CLIENT_ID
   - GOOGLE_CLIENT_SECRET
   - SESSION_SECRET

3. run command **npm run start**

**Step 4** and **Step 5** same as above.

On Linux change scripts in _package.json_ accordingly.
