# expo-dom-ios-inject-reject

Minimal reproduction: on **iOS**, mounting a `'use dom'` component after app startup logs an uncaught
promise rejection from `DomWebView.injectJavaScript`. No app code calls `injectJavaScript`.

```
ERROR  [Error: Uncaught (in promise, id: 0): "Error: Unable to find the 'DomWebView' view with tag '22'"]
```

Related: https://github.com/expo/expo/issues/49173 (Android cold start, same root cause),
https://github.com/expo/expo/pull/49257 (proposed fix).

## Environment

- expo 58.0.26, @expo/dom-webview 58.0.2, react-native 0.88.1, react 19.3.0
- iOS 26.5 simulator, development build (`npx expo run:ios`)
- Created from `npx create-expo-app --template blank-typescript@sdk-58`

## Steps

1. `npm install`
2. `npx expo run:ios`
3. Tap **Show DOM component**.
4. One uncaught rejection is logged in Metro and shown as a LogBox toast.
5. Tap **Hide DOM component**, then **Show DOM component** again. Every mount logs one more rejection
   (4 mounts → 4 rejections in my runs).

## Files

- `components/HelloDom.tsx`: a `'use dom'` component that renders one paragraph.
- `App.tsx`: a button that mounts and unmounts it.

## Expected

No uncaught rejection. The first `$$props` emit from `expo/src/dom/webview-wrapper.tsx` runs on the
first commit, before the native `DomWebView` can be resolved by tag, and its promise is not caught.
