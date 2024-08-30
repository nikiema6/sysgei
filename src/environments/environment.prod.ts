export const environment = {
  production: true,
    serverUrl: '/api',
    keycloak: {
        issuer: 'http://10.1.25.218:18080/auth/',
        // Realm
        realm: 'sysgeirealm',
        clientId: 'sysgei-app',
    }

};
