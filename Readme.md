# Backend authentification service for [sprint-board-extension](https://github.com/nerijusdu/sprint-board-extension)

## Endpoints

### `/GetAccessToken`
  - Request body:
  ```
  {
    "code": "{code from callback}",
    "callbackUrl": "{app callback url}"
  }
  ```


### `/RefreshAccessToken`
  - Request body:
  ```
  {
    "refreshToken": "{user refresh token}",
    "callbackUrl": "{app callback url}"
  }
  ```

### Shared
#### Response:
```
{
  "success": true,
  "data": {
    "access_token": "{access token}",
    "token_type": "jwt-bearer",
    "expires_in": "{token expiration in seconds}",
    "refresh_token": "{refresh token}",
    "scope": "{allowed scopes}"
  }
}
```

#### Response if error:
```
{
  "success": false,
  "error": "{error message}",
  "data": {
    // error data from auth request
  }
}
```