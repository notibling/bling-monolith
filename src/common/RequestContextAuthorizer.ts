export type RequestContextAuthorizer = {
	jwt: {
		claims: {
			aud: string;
			azp: string;
			exp: string;
			email: string;
			iat: string;
			iss: string;
			scope: string;
			sub: string;
		};
		scopes: string[];
	};
};
