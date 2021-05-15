import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
    providers: [
        Providers.Google({
            clientId: '780143299808-7m272mis5oarvtc9kubdole73cgk8bfu.apps.googleusercontent.com',
            clientSecret: 'YLMUjZjhtvFlXzcb0NoOyYL2',
            authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
            scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly',
        
          }),
    ],
    secret: 'SECRET',
    callbacks: {
        /*async jwt(token: any, user: any, account: any, profile: any, isNewUser: any) {
          if (account?.accessToken) {
            token.accessToken = account.accessToken;
          }
          debugger; 
          console.log(token);
          return token;
        },*/
      }
}

export default (req, res) => NextAuth(req, res, options)
