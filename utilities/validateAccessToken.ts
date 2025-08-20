import crypto from 'crypto';

export type ValidateAccessToken = {
  accessToken: string;
  validationToken: string;
  spaceId: string;
  timestamp: string;
};

export const isEditorValid = async ({
  accessToken,
  validationToken,
  spaceId,
  timestamp,
}: ValidateAccessToken) => {
  if (!accessToken || !validationToken || !spaceId || !timestamp) {
    return false;
  }

  const validationString = `${spaceId}:${accessToken}:${timestamp}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(validationString);
  const hash = await crypto.subtle.digest('SHA-1', data);
  const generatedToken = Array.from(new Uint8Array(hash)).map((byte) => byte.toString(16).padStart(2, '0')).join('');

  return generatedToken === validationToken;
};
