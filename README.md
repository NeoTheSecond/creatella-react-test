# Products grid

## Install the dependency

npm install

## Run the app

npm run dev

React app is served on localhost:3000, server is served on localhost:5000
Make sure port 3000 and 5000 is not occupied.

## The following is the features that I have implemented in the test app.

I have tried to include all features in the test app except for two features:

## "To improve the user's experience, we should always pre-emptively fetch the next batch of results in advance, making use of idle-time. But they still should not be displayed until the user has scrolled to the bottom of the product grid."

The app will try to fetch new product when the user scroll down to near the end of the page and append the newly fetched products to the state.

## "Ads should be randomly selected, but a user must never see the same ad twice in a row."

The ads are randomly selected but I did not have the time to implement filtering so as no same ad is served twice in a row.

## I have also implemented sorting using React and javascript instead of using the API.
