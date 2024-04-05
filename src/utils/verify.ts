import admin from 'firebase-admin';
import { OAuth2Client } from 'google-auth-library'
import axios from 'axios';
import { BadRequestException } from '@nestjs/common';
const GOOGLE_CLIENT_ID = ''
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// async function verifyGoogleToken(accessToken: string, mode: string = 'web') {
//   try {
//     const tokenInfo = (
//       await client.verifyIdToken({
//         idToken: accessToken,
//         audience: [GOOGLE_CLIENT_WEB_ID, GOOGLE_CLIENT_ID]
//       })
//     ).getPayload();
//     console.log('tokenInfo:', tokenInfo)
//     return tokenInfo;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };

async function verifyGoogleToken(googleTokenId: string) {
  console.log('accessToken:', googleTokenId)
  try {
    const ticket = await client.verifyIdToken({
      idToken: googleTokenId,
      audience: GOOGLE_CLIENT_ID,
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    if (!ticket) return null
    const payload = ticket.getPayload();
    return payload
  } catch (error) {
    console.log('Error verifyGoogleToken:', error)
    return null
  }
}

// try {
//   const data = await admin.auth().getUser(accessToken);
//   console.log('data:', data)
//   return data;
// } catch (error) {
//   console.log('error:', error)
//   throw new Error('Wrong access_token !');
// }
// }

async function verifyFacebookToken(accessToken: string) {
  //   try {
  //     const data = await axios.get(
  //       `https://graph.facebook.com/me?fields=name,gender,picture,email,first_name,last_name,link&access_token=${accessToken}`,
  //     );
  //     return data.data;
  //   } catch (error) {
  //     throw new Error('Wrong access_token !');
  //   }
}

export { verifyGoogleToken, verifyFacebookToken };
