export type IsEditorValidProps = {
  accessToken: string;
  validationToken: string;
  spaceId: string;
  timestamp: string;
};

/**
 * Validates Storyblok editor access using signed token verification.
 *
 * This implements Storyblok's recommended security validation:
 * 1. Verifies the SHA-1 hash of spaceId:accessToken:timestamp matches the provided token
 * 2. Ensures the timestamp is within the last hour (3600 seconds) to prevent replay attacks
 *
 * @see https://www.storyblok.com/faq/how-to-verify-the-preview-query-parameters-of-the-visual-editor
 */
export const isEditorValid = async ({
  accessToken,
  validationToken,
  spaceId,
  timestamp,
}: IsEditorValidProps) => {
  // Validate all required parameters are present
  if (!accessToken || !validationToken || !spaceId || !timestamp) {
    return false;
  }

  // Validate timestamp is within the last hour (3600 seconds)
  // This prevents replay attacks with old tokens
  const timestampNum = parseInt(timestamp, 10);
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const oneHourAgo = currentTimestamp - 3600;

  if (isNaN(timestampNum) || timestampNum < oneHourAgo) {
    return false;
  }

  // Generate SHA-1 hash of the validation string
  const validationString = `${spaceId}:${accessToken}:${timestamp}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(validationString);
  const hash = await crypto.subtle.digest('SHA-1', data);
  const generatedToken = Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');

  // Compare generated token with provided token
  return generatedToken === validationToken;
};
