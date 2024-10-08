# Project Description

So this is website use for find the movie which it will provide the detail of movie and rating, User can search the movie by title , genre annd release year, they can add the movie in there favorite list

### Home page
- In Home page there will be two section the newest movies and recommend movies which it will have navbar that contain ```search bar``` , ```menu icon``` and ```sigin button``` if user haven't login yet

![alt text](assets/image.png)

- The newest movies section will be the carousel that show the new movie that the website have upload to the website 

![alt text](assets/image-1.png)

- The recommend movies section will be the carousel that show the movies base it's rating, it will show the movies that high rating which the maximum of rating will be ```5``` out of ```5```

![alt text](assets/image-2.png)

- When user click the menu icon it will show the drawer menu from the left side , which it provide the menu base on ```genre of movie``` , ```the release year``` , and user ```favorite movies list```

![alt text](assets/image-3.png)


### Login and Register page

- In Login and Register page it will provide a form for user , if user don't have an account , they can click ```NO ACCOUNT YET? ``` the form will change from login form to register form

![alt text](assets/image-4.png)

![alt text](assets/image-5.png)

- After you have login to the website it will show you ```account name``` with the ```logout icon```

![alt text](assets/image-6.png)

### Movies list from selected menu page
- In this page it will show the movies list base from of the menu user have select so they have select "Action" genre it will show the movies that have genere of "Action" ,In this page also provide ```pagination``` which set limit of the page is ```10```

**Base on Action movie**
![alt text](assets/image-7.png)

![alt text](assets/image-8.png)

**Base on release year**
![alt text](assets/image-9.png)

### Movies list from search page

- Like I said user can search base on ```movies title``` , ```movie genre``` and ```release year``` in ```search bar```
after they input and clikc the icon button to search it will lead they to page that match with the input

**Base on movies title**
![alt text](assets/image-10.png)

**Base on genre**
![alt text](assets/image-11.png)

**Base on release year**
![alt text](assets/image-12.png)

### Movie Detail page
- In this page it will show the image of the movie, ```movie title``` , ```release year``` , ```movie description```, its ```rating``` , ```genres``` , ```Add to favorite button``` to add the movie to favorite list , if the the movie already add to the favorite list it will show ```Remove from favorite button``` also there will be ```Other Movies You Might Like``` section which it will random the movie for the user

![alt text](assets/image-15.png)

![alt text](assets/image-16.png)


### Movies favorite list page
- So if user didn't login to the website if they click ```My favorite``` in the menu it will lead them to ```Login and Register page ``` , So if user don't have any movie in there favorite list it with will show ```No favorite movies``` text, user can add the movie to their favorite by click on the ```favorite icon``` on the movie card or they can click into the card to read the movie detail first and click add to ```favorite button``` , they also can remove the movie from their favorite list my click on ```unfavorite button``` or click ```Remove from favorite button``` on the movies detail page

![alt text](assets/image-13.png)

**When user have the favorite movie list**
![alt text](assets/image-14.png)

# Project Setup Guide ⚙️

## Setup Instructions

### Install Project Dependencies 📦

You need to run to initialize ```node_module``` to project
before run the project
```
npm install
```

## Run The Server Instructions

### Run server 🖥️

Use this command to start the server which the port of the server will be ```3001``` because the port ```3000``` will be duplicate with the backend, the systm will ask you ```Would you like to run the app on another port instead?```you can type ```Y``` so you can use ```localhost:3001```
```
npm start