# dotRemember

## What is this?

This is a mobile application developed by a set a notification to be displayed after the selected time.

## Techonologies

* TypeScript
* Ionic Native

## Development

```
$ ionic start --v2 dotRemember blank
$ cd dotRemember
$ git init
$ git remote add origin https://github.com/diegopctba/dotRemember.git 
$ git fetch --all
$ git reset --hard origin/master 
```

```
$ ionic plugin add de.appplant.cordova.plugin.local-notification
$ npm install @ionic-native/local-notifications --save
```

## Icons and splash
Save the icon.png in the folder 'resources' and execute the commands below:
$ ionic resources android --icon
$ ionic resources android --splash