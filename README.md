# ProcessWire Boilerplate
This is a basic boilerplate for basic, standard ProcessWire projects.

It features version control, complete separation between installation and source, SCSS compiling, javascript combining, and template asset mirroring for images, vendor scripts, etc.



# Getting started

First, clone the repository:

```
$ git clone git://github.com/heldercervantes/PWBoilerplate.git
```

Next, You will need node and npm to pull in the libraries. Once you're all set with those then, assuming you have Node.js and npm already installed, proceed by installing local dev dependencies:

```
$ npm install
```

This will install everything you need to run. But don't do it just yet.

Then move to the `dist` directory and run your PW installation there. After that you shouldn't need to touch any files inside `dist`.

At this point you can start Gulp and begin creating your next masterpiece, working inside the `src/templates` directory.

```
$ gulp
```



# Building templates

All your work should focus on the `src` directory. `dist` is ignored by Git, to ensure only relevant code is version controlled.

## PHP files

All your PHP files are mirrored into `dist` as you save them.

## SCSS

Included is a structure for a BEM-like approach to handling SCSS ([More on BEM here](http://getbem.com/)). The main.scss file imports all global styles, modules and components. These are compiled and minified into `dist/site/templates/css/main.css`. This is the file you should be loading in your template's header.

Global files:
- **reset.scss**: For all your CSS resetting needs;
- **fonts.scss**: Loads any embedded fonts;
- **variables.scss**: Stores the basic variables, such as breakpoints, colours, fonts and mixins for default font sizes;
- **helpers.scss**: Basic mixins. I tend to put reusable effects mixins here as well, such as drop-shadows;
- **defaults.scss**: I usually store some default styles here, such as H1, H2, H3, link color, body text color and default fonts, etc.

## Javascript

In `src/templates/js` you can add as many JS files as you like. I tend to create one per feature to keep things accessible. These files are combined into a single JS in `dist/site/templates/js/main.js`. Beware of conflicting variable and function names.

## Vendor scripts

Two things happen to vendor scripts. They are combined into the main.js file AND the `vendor` directory is also duplicated into your template folder. This causes some redundancy, but it leaves the door open for you to load them separately from your main.js file should you need to. Also some scripts include assets (css, images) that are mirrored into your `dist` folder.

Included vendor scripts:
- **jQuery 2.2.0**: For who can live without it;
- **Modernizr**: Basic, only touchevents detection so you can make hover's that dont require double tapping on touch devices;
- **Swiper 3.4.2**: Just because this ends up in 90% of my projects.

Don't need any of these? Just delete the files.

## Other files

You may need other files to be considered. On some projects you need to create custom modules, add other assets to the template file such as videos. With some tinkering on `gulpfile.js` you can get these mirrored easily.
