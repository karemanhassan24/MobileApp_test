# MobileApp

This project wraps the original HTML/JavaScript location page as a Capacitor mobile app.

## Run Locally

```bash
npm install
npm run dev
```

## Generate Android App

```bash
npm install
npm run build
npx cap add android
npx cap sync android
npx cap open android
```

After Android Studio opens, run the app on a device or emulator.

## GPS / Location

The app uses `@capacitor/geolocation`. On Android, Capacitor will add the required location permissions when the Android project is generated and synced.

## Google Play

To upload to Google Play, generate a signed Android App Bundle from Android Studio:

```text
Build > Generate Signed Bundle / APK > Android App Bundle
```

Google Play requires a signed `.aab`, app icon, screenshots, app description, privacy policy, and a Google Play Developer account.
