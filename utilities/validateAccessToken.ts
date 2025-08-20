import crypto from 'crypto';

export type ValidateAccessToken = {
  accessToken: string;
  validationToken: string;
  spaceId: string;
  timestamp: string;
};

export const isEditorValid = ({
  accessToken,
  validationToken,
  spaceId,
  timestamp,
}: ValidateAccessToken) => {
  if (!accessToken || !validationToken || !spaceId || !timestamp) {
    return false;
  }

  const validationString = `${spaceId}:${accessToken}:${timestamp}`;
  const generatedToken = crypto.createHash('sha1').update(validationString).digest('hex');

  return generatedToken === validationToken;
};
