# IMOBI Places

One Paragraph of project description goes here

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

### Installing

This project uses IONIC v3. To install it, follow the steps below:

```
git clone https://dtriboni@bitbucket.org/imobi_places_team/imobi_places.git
ionic serve -la
ionic cordova run [platform]
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds
imobiplaces@gmail.com - a mesma senha

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [BitBucket](http://bitbucket.org/) for versioning. For the versions available and if you have permission to clone or view this project, see the [repository](https://bitbucket.org/imobi_places_team/imobi_places/src/master/) . 

## DEV Team

* **Daniel Triboni** - *Project Manager* - [PurpleBooth](https://github.com/DanielTriboni)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Publishing de App

* jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore imobiplaces.keystore /Users/globalthings/IONIC/imobi_places/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk imobiplaces

* Input the password for keystore: places-imobi@2020

* ./zipalign -v 4 /Users/IONIC/imobi_places/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk /Users/IONIC/imobi_places/imobiplaces.apk

* Upload signed APK to Google Play Store
# imobi
