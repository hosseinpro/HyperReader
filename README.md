# HyperReader

## Adding Firebase and react-native-push-notification

Changed files to add Firebase and react-native-push-notification:
android/build.gradle
android/settings.gradle
android/app/build.gradle
android/app/google-services.json
android/app/src/main/AndroidManifest.xml
android/app/src/res/values/colors.xml
android/app/src/main/java/com/mobilenfcreader/MainApplication.java

## Build Android release

Changed files:
android/gradle.properties
android/app/build.gradle

cd android
./gradlew bundleRelease

output:
android/app/build/outputs/bundle/release/app.aab

test:
cd ..
react-native run-android --variant=release

take screenshot:
adb shell screencap -p /sdcard/screencap.png
adb pull /sdcard/screencap.png
