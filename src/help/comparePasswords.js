import bcrypt from 'bcryptjs';
export const comparePasswords = async (plainPassword, hashedPassword) => {
    try {
        const passwordMatch = await bcrypt.compare(plainPassword, hashedPassword);
        return passwordMatch;
    } catch (error) {
        // Handle error
        console.error('Error comparing passwords:', error);
        return false;
    }
};
