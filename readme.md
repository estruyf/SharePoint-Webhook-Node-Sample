# Sample Node.js SharePoint webhook application

This is a sample webhook application built with the use of Node.js. Feel free to explore.

![Notification sample](./assets/homepage-view.png)

## Azure AD application and certificate configuration
To test out this sample, you will have to create a service application on Azure AD. 

> For more information you can read this article: [Building daemon or service app with the Microsoft Graph API](https://www.eliostruyf.com/building-daemon-or-service-app-with-the-microsoft-graph-api/). Instead of defining Microsoft Graph permissions, you will need to configure it for SharePoint Online instead.

![Read & Write permissions](./assets/azure-ad-permissions.png)

In the linked article you can read how to do it for a C# application. This can be done a bit differently for Node.js. The Azure AD application creation stays the same.

- Run `$ npm install -g keycred`
- Run `$ keycred`
    - Fill in the questions
- Once you provided all the info, your certificate gets created:
![Certificate information](./assets/certificate.png)

- Add the following information in your Azure AD manifest file:
    - customKeyIdentifier
    - value
    - keyId

```JSON
"keyCredentials": [
    {
        "customKeyIdentifier": "customKeyIdentifier",
        "keyId": "keyId",
        "type": "AsymmetricX509Cert",
        "usage": "Verify",
        "value":  "value"
    }
],
```

![keyCredentials config](./assets/manifest.png)

- In your folder, create a new **privatekey.pem** file and paste in the private key information:

```
-----BEGIN RSA PRIVATE KEY-----
THE KEY ITSELF
-----END RSA PRIVATE KEY-----
```

- Add the fingerPrint ID to the config.json file (check configuration section)

## Installation
Follow the next steps if you want to test it out:
- Clone this repo
- Open your command prompt and navigate to the folder
- Add your configuration to the config.json file (you can use the sample file)
    - adalConfig
        - authority: change the tenant name
        - clientId: specify your Azure AD client application ID
        - subscriptionUrl: the URL that SharePoint has to call. Use ngrok for testing.
        - resouce: the URL of your SharePoint site for which you want to retrieve the access token
        - fingerPrint: finger print of your certificate
    - webhookConfig
        - url: URL of the SharePoint site
        - listName: name of the list / library to which you want to subscribe your webhook
        - clientState: clientState name you want to use for your subscription
- Run: `$ npm install`
- Run: `$ tsd install`

**During development:** 
- open another command prompt. Navigate to the ngrok folder and run:*
    - `$ ngrok http 3000`
    - copy the **https** forwarding URL of ngrok and use it in the config.json file for the **subscriptionUrl**
- Run: `$ npm start`
    - This transpiles TypeScript to JavaScript and start the server on http://localhost:3000
- Navigate to http://localhost:3000/create which automatically creates a new subscription for the config you provided