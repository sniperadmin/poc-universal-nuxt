import scrypt from 'scrypt-js'

const hashPassword = async (password: string) => {
  // Convert base64 strings to Uint8Array
  const base64ToArray = (base64: string) => Uint8Array.from(Buffer.from(base64, 'base64'))
  const salt = base64ToArray('BW==')
  const keyLength = 64
  const params = {
    N: 2 ** 8, // Number of iterations, equivalent to rounds in bcrypt
    r: 8, // Block size
    p: 1, // Parallelization factor
  };

  // Generate the SCRYPT key
  const key = await scrypt.scrypt(Buffer.from(password), salt, params.N, params.r, params.p, keyLength);
  // Convert the derived key to base64 string for storage
  return Buffer.from(key).toString('base64');
}

export default hashPassword
