# Frontdoor Chrome Extension

[Demo video](https://www.youtube.com/watch?v=Cxni4qf0F4w)

## Setup

You will need Docker available on your machine to run the server.

1. Edit `.env` to replace the <API_KEY> placeholder with your own OpenAI API key
2. Run ./setup.sh
3. Load the directory `client/dist` into Chrome as an unpacked extension


## Notes

### Approach
The backend was built first by visualizing the UI and inferring the API endpoints that would be needed.
Main components were built and connected with the API in a POC phase to display plain data and test the user journey.
Styling was done towards the end once all the main components had stabilized, so as to limit any wasted effort of styling components which could get thrown away.
Candidate components for reusability were genericized & extracted into common folders.


### Challenges

#### Standing out!
There's always candidates much more experienced than myself applying for roles.

#### Creating a Chrome extension for the first time
Before starting I made sure to research the fundamentals by watching some tutorials and surveying Google's documentation as well as any quality blog posts.


#### Positioning the tooltip
I considered writing the logic for this myself by determining the cursor position and running some basic geometrical calcuations to choose the optimal placement, but given all the inevitable edge cases I thought it would be better to look for a library that has already accomplished this - I discovered Floating UI, a newer rewrite of Popper, and hammered an existing example into a reusable component I could employ.


#### Sharing extension state between the popup and background service worker
Resolved by creating a messaging system that wraps the Chrome messaging api, and which is injectable into components with hooks.
Unresolved issue: Propagating updated extension state to all open tabs from the background service worker - e.g. if I toggle the theme in one tab, all other tabs should now use that new theme in their content scripts. Currently unimplemented as the Chrome messaging API was producing errors.


### Areas for improvement
* Style encapsulation is needed to prevent leakage of styles into the webpage (perhaps hashed class names as a build step or use the shadow DOM)
* State management is growing in complexity and is nearing the point where a reducer pattern would be worth following.
* Some UI actions (for instance saving a summary) could do with improved visual feedback that the action was successful.  
* Undo/Redo of deletion in the library would be helpful.  
* Perhaps tuning the OpenAI integration with prompts could yield improved responses.
* The optional stretch goals all sounded very good.  
* More component testing is always valuable if time allows. Library pagination in particular should be tested.  
* E2E testing on the front-end. Could use Cypress for this. I attempted to use msw to mock the API integration but couldn't get it set up for Chrome extension development and was unsuccessful in troubleshooting.
