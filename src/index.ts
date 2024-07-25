
import { createPiece, PieceAuth } from "@activepieces/pieces-framework";
import { createCustomApiCallAction } from '@activepieces/pieces-common';

export const driverAuth = PieceAuth.OAuth2({
  description: '',
  authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenUrl: 'https://oauth2.googleapis.com/token',
  required: true,
  scope: ['https://www.googleapis.com/auth/cloud-platform']
});

export const gaCosts = createPiece({
  displayName: "Google Cloud API - Billing",
  description: 'Basic wrapper for Google Cloud Billing API',
  auth: driverAuth,
  minimumSupportedRelease: '0.9.0',
  logoUrl: "https://www.gstatic.com/pantheon/images/welcome/supercloud.svg",
  authors: [],
  actions: [
    createCustomApiCallAction({
			auth: driverAuth,
			baseUrl: () => {
				return 'https://cloudbilling.googleapis.com';
			},
			authMapping: async (auth) => {
				return {
					Authorization: `Bearer ${(auth as OAuth2PropertyValue).access_token}`,
				};
			},
		}),
  ],
  triggers: [],
});
