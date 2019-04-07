# Train-Scheduler
Description: 

create a train schedule app that:
   1. Requires an input for a user to add a train to the schdule.
   2. Creates a table of all trains in the firebase database, the calcuated arrival time and the number of minutes away.

Here's the solution:

I created a user input to add new train name, start time and frequency to schedule.   
Displays schedule in repeating table with next arrival based on current time and frequency of train stops.   
I stored Train info in Firebase for data persistence and retreives information from database on load.   
Schedules refresh every minute to reflect updated arrival information.   

Technical approach:

Javascript  
jQuery  
HTML5  
CSS3  
Firebase  
Moment.js 

https://skajogbola.github.io/Train-Scheduler/

