import bcrypt from "bcrypt";

export async function hashPassword(password){ 
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashed = await bcrypt.hash(password, salt);
  
  return hashed;
}

export async function verifyPasswords(password, passwordhashed){
  const matches = await bcrypt.compare(password, passwordhashed);

  if(matches) return true;
  
  return false;
}