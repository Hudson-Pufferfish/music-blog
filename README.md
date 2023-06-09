# Web Development Final Project - *Supaship Music App Blog*

Submitted by: **Hudson Nguyen**

This web app: **Music App Blog - Let's ship Spotify lovers together!**

Time spent: **10** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **A create form that allows the user to create posts**
- [x] **Posts have a title and optionally additional textual content and/or an image added as an external image URL**
- [x] **A home feed displaying previously created posts**
- [x] **By default, the time created, title, and number of upvotes for each post is shown on the feed**
- [x] **Clicking on a post shall direct the user to a new page for the selected post**
- [x] **Users can sort posts by either their created time or upvotes count**
- [x] **Users can search for posts by title**
- [x] **A separate post page for each created post, where any additional information is shown is linked whenever a user clicks a post**
- [x] **Users can leave comments underneath a post on the post's separate page**
- [x] **Each post should have an upvote button on the post's page. Each click increases its upvotes count by one and users can upvote any number of times**
- [x] **A previously created post can be edited or deleted from its post page**

The following **optional** features are implemented:

- [x] Users can only edit and deleted posts or delete comments by entering the secret key, which is set by the user during post creation
- [x] Upon launching the web app, the user is assigned a random user ID. It will be associated with all posts and comments that they make and displayed on them.
- [x] Users can repost a previous post by referencing its post ID. On the post page of the new post, the referenced post is displayed and linked, creating a thread
- [x] Users can customize the interface of the web app
- [x] Users can share and view web videos
- [x] Users can set flags while creating a post. Then users can filter posts by flags on the home feed.
- [x] Users can upload images directly from their local machine as an image file
- [x] Display a loading animation whenever data is being fetched

The following **additional** features are implemented:

* [x] TypeScript for better type safety, Playwright for E2E testing

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='src/assets/final_project.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with [peek](https://github.com/phw/peek) for Linux. -->

## Notes

### Quick start

Make sure docker is running, then:

```bash
git clone https://github.com/Hudson-Pufferfish/music-blog.git && \
  cd supaship.io && \
  yarn && \
  yarn add -D supabase && \
  yarn debug
```

^ Installs the app and runs e2e tests in debug mode. (Good for a quick overview of all the app does).

### Local Dev

Install the supabase cli (this needs to be done manually to get the cli bin):

```bash
yarn add -D supabase
```

Start supabase (make sure docker is running). This will run in background without taking a terminal, use `npx supabase stop` to end it.

```bash
npx supabase start --debug
```

Start dev server:

```bash
yarn dev
```

To watch tailwind styles, run this in another terminal while developing:

```bash
 npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch
```

### Prod Build

```bash
yarn build
```

### Deploy

Manual. Run build and then drop `/dist` into Netlify buccket
(Will automate later)
I did automate in the end :">>

### e2e

Note: will drop all data from tables when you run it.

```bash
yarn test
```

To step through tests:

```bash
yarn debug
```


## License

    Copyright [2023] [Hudson Nguyen]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.