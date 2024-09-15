# **Week3 Assignment Reflection: Cookie clicker game 🍪**

I have left debugging reflections in my javascript too which are in **red**. I wrote them as the problems occured which was quite a lot of times 😅 but went back with a green tick ✅ if i was able to fix them

## Help Links:

- https://github.com/Tech-Educators/software-dev-014/blob/main/demos/week3/week3-assignment-walking-skeleton/app.js - _Walking skeleton 🩻_
- https://cookie-upgrade-api.vercel.app/api/upgrades - _Upgrades API_
- https://www.geeksforgeeks.org/convert-a-string-to-an-integer-in-javascript/ - _Data type issue when page was refreshed_
- https://www.w3schools.com/cssref/css_pr_scale.php - _Scaling up the cookie when clicked_
- https://dev.to/shantanu_jana/how-to-play-sound-on-button-click-in-javascript-3m48#:~:text=forEach(button%20%3D%3E%20%7B%20button,Play%20Sound%20on%20Button%20Click. - _Adding audio elements_
- https://www.w3schools.com/tags/av_prop_muted.asp - _Mute Button_
- https://www.basedash.com/blog/how-to-change-an-image-src-with-javascript - _Changing the image source from JS_

## Refelection:

- I managed to meet all the **user** requirements of the assignment so my user could:
  -Purchase upgraded from the shop if they have enough cookies
  -See the cookie count incrementing automatically
  -Refresh the page and continue with their previous count
- Use my page on different screen sizes

-I also managed to complete the **developer** requirements by:
-Retreiving the data from the API to display the upgrades
-Using functions to sort an organise my code

**JAVASCRIPT**
-The hardest part for me was actually wrangling the data from the API to use in multiple different parts of my code. I initially had two different functions to create and display my upgrades (createUpgradesFailed() and displayUpgrades()) but quickly realised that data from the upgrades will be needed in many other functions in my game
-I took some inpiration from the example page given to us where they did all the data wrangling in one function and passed the data retreived as arguments to other functions. It took me the most time but i was glad i spent time on it as it worked really well in the end
-A lot of the process are repeated in the clicker game so it actually saved a lot of time writing specific tasks as functions because they could be re-used easily. I did however start to lose track of the names of some fucntions and their purposes so i had to craete a functionGlossary at the to for myself 😅
-It made referencing elements a lot easier to declare everything at the top of my code so that i could quickly search them through my code if necessary.

**CSS**
-I took Joe's advice from the week one assignment and used the position:relative and position:absolute elements to position the containers on the screen. It helped massively when writing the media queries as i could shift entire containers where i wanted but the elements inside them remained positioned in reference to their parent container
-I imported some fonts from google fonts to upgrade the look of my site as well

**STRETCH GOALS 🏹**
-I enlisted the help of my siblings to help with the user interactivity section. I started by adding hover and click colour changes to all my buttons including the cookie itself to help the user identify the buttons on the page
-My younger sister suggested that i add a background colour change when i bought items or when i didn't have enough cookies.
-I added audio elements to make a "ker-ching" sound when an item was successfully purchased and a incorrect buzzer sound when they didn't have enough cookies and a "crunch" cound when the cookie was clicked. For customisation i added a mute button to the main container which would allow the user to turn off the sound effects.
-I though it would be really cool to be able to customise the cookie you're clicking so i saved different cookie images and made a cookie toggle button. Each time this was clicked the 'src' of the image was changed to a different one in the cookie image array. I got my family to choose different biscuits they would like. The "boring cracker" was in there per my mum's request 😂
-I also saved this to local storage so that the users cookie of choice will be the same when refreshed

- I did have a deployment issue right at the end because it was waiting to get data from local storage when there was no data there yet. I fixed this by adding or statements as an alternative

-I absolutely loved 💖 working on this assignmennt. I was heavy on the javascript which is my favoutite part and i loved that i could include my family in the interactivity sections.
