# myGamingList

Welcome to myGamingList! An app for tracking videogames that you are playing, have played, or plan to play! 

It does this by having an ever-expanding database and printing out lists linked to the individual User's games. 

The App webscrapes videogame covers using the Game title and Places the image in it's respective tiles allowing the User to have a clear visual associated with all of their games helping with jogging their memory or bringing back the feelings of playing the game.

## Technologies Used
- HTML
- SCSS (Including FontAwesome and Foundation)
- NodeJS
- SQL
- React
- Express
- Objection
- Axios/Cheerio
- Steam API

## Features
- Individualized lists for each user.
- Ability to Add, Delete or Move games between the lists
- Game cover auto-generation
- Ability to sync your Steam games to your list
- Trophy system that awards the user 1 trophy for having a game in their in process list and 2 trophies for games that are completed. (Users recieve 1 trophy for Steam Games that have more than 50% of the achievements completed and 2 trophies for games that have all achievements unlocked)

## User Guide

In order to make use of myGamingList a user must make an account with a username and password. Once an account has been made the user may now add games to his lists under "Complete" "In Progress" and "Not Started" respectfully. 

A user can also sync to their Steam account using their Steam ID to add their steam Games to their gaming list automatically. The app will cycle through the owned games on Steam and add them to their database. Once all games have been added the User can refresh the page to see the new list of Steam games printed on the page.
As Steam games contain games that are not clearly defined as "Complete" with games such as MMORPGs or Multiplayer titles the user may assign these games to "Complete", "In Progress", "Not Started" using their own judgment once they are added.

Nintendo and Playstation account syncs are planned for future release.

myGamingList is designed to aid the user in their own tracking ambitions and self planning when figuring out what they want to play and in what order. As such the Trophy system is only viewable on your account and can be shared with friends however nothing is gained by individuals who go for highscores by faking their lists.