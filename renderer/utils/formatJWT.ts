export const formatJWTtoJSON = (token: string) => {
  const base64Payload = token.split('.')[1]; //value 0 -> header, 1 -> payload, 2 -> VERIFY SIGNATURE
  const payload = Buffer.from(base64Payload, 'base64');
  const result = JSON.parse(payload.toString());
  // console.log(result);
  return result;
};
