import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
      scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar',
    }),
  ],
  secret: process.env.GOOGLE_CLIENT_SECRET,
  callbacks: {
    async jwt(token: any, user: any, account: any, profile: any, isNewUser: any) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      console.log(token);
      return token;
    },
  }
}

export default (req, res) => NextAuth(req, res, options)
