import * as bcrypt from 'bcrypt';

export function validPassword(userPassword: string, password: string) {
  return bcrypt.compareSync(password, userPassword);
}

export async function encryptPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const cryptedPassword = await bcrypt.hash(password, saltRounds);

  return cryptedPassword;
}