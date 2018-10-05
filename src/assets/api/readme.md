#Libcal Api Implementation

How to use:

1.) First, obtain a libcal client id and client secret. Place these in `/src/assets/api/auth.json`
2.) Import lib_Auth into your main controller
3.) Optionally, if you want to see the bearer itself, just plop lib_GetBearer into the constructor of whichever page you want to have access to the bearer, and save it to state. Most functions shouldn't require this, however.
