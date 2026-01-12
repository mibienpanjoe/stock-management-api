# Google Cloud Console Setup Guide (Specific for Stock Management API)

To get your Google Auth working with your **Flutter frontend** and this **Node.js backend**, follow these steps:

## 1. Create a "Web Application" Client ID (Required for Backend)

Even though you are using Flutter, your **Backend** uses a "Web" client type to verify tokens.

1.  Go to [Google Cloud Console](https://console.cloud.google.com/).
2.  Go to **APIs & Services** > **Credentials**.
3.  Click **+ CREATE CREDENTIALS** > **OAuth client ID**.
4.  **Application type**: Select **Web application**.
5.  **Authorized JavaScript Origins**:
    - Add `http://localhost:3000` (Your API Port).
    - If you are running Flutter Web: Add your Flutter web port (e.g., `http://localhost:5555`).
6.  Click **Create**.

## 2. Create Platform-Specific Client IDs (For Flutter Mobile)

If you are running your Flutter app on **Android** or **iOS**, you need additional IDs:

### For Android:

1.  Create another Client ID > select **Android**.
2.  Enter your **Package Name** (found in `android/app/build.gradle`).
3.  Enter your **SHA-1 certificate fingerprint** (get it by running `./gradlew signingReport` in your flutter android folder).

### For iOS:

1.  Create another Client ID > select **iOS**.
2.  Enter your **Bundle ID** (found in Xcode or `ios/Runner.xcodeproj`).

## 3. Update your Backend .env

Copy the **Web Client ID** (the one created in Step 1) and add it here:

```bash
# /home/mj/projects/stock-management-api/.env
PORT=3000
GOOGLE_CLIENT_ID=xxxxxxxxxxxx-xxxxxxxxxxxxxxxx.apps.googleusercontent.com
```

## 4. Flutter Implementation Tip

In your Flutter code (using `google_sign_in` package):

- On **Android/iOS**: Use the platform-specific IDs.
- **CRITICAL**: When signing in, request the `idToken`. Send this `idToken` to your backend endpoint `POST http://localhost:3000/api/auth/google`.

> [!IMPORTANT]
> The Backend `GOOGLE_CLIENT_ID` in `.env` **must** match the "Audience" info in the token sent by Flutter for verification to pass.
