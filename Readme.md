# Backend authentification service for Azure DevOps
Used in [sprint-board-extension](https://github.com/nerijusdu/sprint-board-extension)

## Setup
- Create Functions App in azure portal
- Add `AzureAppSecret` app setting (App client secret that is registered in Azure DevOps)

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

### Response:
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

### Response if error:
```
{
  "success": false,
  "error": "{error message}",
  "data": {
    // error data from auth request
  }
}
```

### Troubleshooting
- Don't forget to add your domain to CORS policy in your functions app.