# Angular AuthGaurd Project

- Created Angular App using angular-cli
- Configured the App with Angular material  
- Routing of App
- User Registration Page
- auth service & auth guard
    - injected auth service for validation
- Created Profile Page
- Integrated fetch User details api
- Profile Page
    - Header
    - Main Container
    - Simple Loader when no data received

- Wrote Test Cases 
- Added auth guard for redirecting to profile page
- Resolved bugs for redirecting to registration
- Increased test coverage each 95% above
 
# Features

- Sign Up
    - Sign Up Form
    - Auth guard for Registration Page (RegistrationAuthGuardGuard)
        - redirect to profile page if the user is not logged out 
- Profile Page(after authentication)
    - Header
    - Profile Details Section
    - AuthGuard for Profile page (AuthGuard)
        - redirect to profile page on successful registration else stay on the registered page
