const FBSDK = require('react-native-fbsdk');
const {
    LoginButton,
    GraphRequestManager,
    LoginManager,
    GraphRequest,
    AccessToken
} = FBSDK;

export const loginWithFacebook = () => {


    return new Promise((resolve, reject) => {
        LoginManager.logOut();
        LoginManager.logInWithReadPermissions(['public_profile']).then(
            function (result) {
                if (result.isCancelled) {
                    reject()
                } else {
                    AccessToken.getCurrentAccessToken().then((token) => {
                        const responseInfoCallback = (error, result) => {
                            if (error) {
                                reject(error)
                            } else {
                                resolve({ token, user: result })
                            }
                        };
                        const infoRequest = new GraphRequest('/me', {
                            accessToken: token.accessToken,
                            parameters: {
                                fields: {
                                    string: 'email,name,first_name,last_name,picture.width(100).height(100)'
                                }
                            }
                        }, responseInfoCallback);
                        new GraphRequestManager().addRequest(infoRequest).start();
                    }).catch(err => reject(err));
                }
            },
            (error) => reject(error)
        );
    });
};
