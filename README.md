# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: **Lester Zhang**

Time spent: **5** hours spent in total

Link to project: https://glitch.com/edit/#!/fork-precious-whip

## Required Functionality

The following **required** functionality is complete:

* [X] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [X] "Start" button toggles between "Start" and "Stop" when clicked. 
* [X] Game buttons each light up and play a sound when clicked. 
* [X] Computer plays back sequence of clues including sound and visual cue for each button
* [X] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [X] User wins the game after guessing a complete pattern
* [X] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [ ] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [ ] Buttons use a pitch (frequency) other than the ones in the tutorial
* [X] More than 4 functional game buttons
* [X] Playback speeds up on each turn
* [X] Computer picks a different pattern each time the game is played
* [X] Player only loses after 3 mistakes (instead of on the first mistake)
* [ ] Game button appearance change goes beyond color (e.g. add an image)
* [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [ ] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [ ] List anything else that you can get done to improve the app!

## Video Walkthrough

Here's a walkthrough of implemented user stories:
![](your-link-here)


## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 

I used w3school.com for finding out what kind of colors I want my 5th button which I use orange by default and orangered when clicked.
Again, w3school has a tutorial for javscript mainly I looked up setTimeout to make sure I understood how it works. I got a weird
glitch that occurred with AudioContext in Google Chrome which I talked more about in reflection question #2.
Online resources: 
https://www.w3schools.com/js/js_timing.asp
https://www.w3schools.com/cssref/css_colors.asp
https://stackoverflow.com/questions/55026293/google-chrome-javascript-issue-in-getting-user-audio-the-audiocontext-was-not 


2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 

When coding up optional features 4, Give the player 3 strikes, I encountered a weird warning stating that 
"The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page" and it kept on reoccuring
after each reload. This made the buttons not produce any sound when I clicked or when the computer plays a clue.
The fix was to add context.resume() to multiple places in the code, importantly before playing
a tone when either the computer gives us a clue or when I just press a button before starting a game. This seems
like an odd error to pop up suddenly and might be due to Google Chrome's new policy. 

Besides that warning, coding the game logic was a bit difficult. I had to rewatch the video tutorial again to give me a sense
of what "Is turn over?" meant in the flow diagram. And conluded that "Turn is over?" meant that the user has clicked all buttons 
that match the current progress in the game and if it is not allow the user to click until the current progreess is completed.

Playing sequence faster as the game went by was a bit tricky also. Initially I just had my clueHoldTime decrease by 50
after each clue but forgot set the clueHoldTime to 1000 again. So the next iteration of playing the sequence was way to fast.
Found a sweet spot that the speed was is manageable till the last round by taking account
the user's proggress in the game and decreasing the clueholdtime with a constant value after
each clue is given.

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 

This project is done on Glitch where I am able to share the project with others on the web
given a link. I still very curious on what kind of technologies that I would need if I needed
to host this game if I built it locally rather than Glitch. Also the project did not connect
into a database which obsivously you did not need one. But in future project that we need to store information like users, which database
should we use and how do we connection to it to store and retrieve the data we need in our app.

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 

An additional feature to the game would be added a slider that allows users to pick difficulty of the game. If it
medium difficulty maybe we can have the clueHoldTime start at 900 milliseconds instead of 1000. We can
also have a mode where after guessing the whole pattern, we can create a new pattern and have the user
keep playing until the user strikes out and loses the game.



## License

    Copyright [YOUR NAME]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.