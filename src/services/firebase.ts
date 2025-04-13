import { db, auth } from '../firebase/config';
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  doc, 
  setDoc 
} from 'firebase/firestore';
import { 
  createUserWithEmailAndPassword, 
  updateProfile 
} from 'firebase/auth';
import { UserProfile } from '@/components/ProfileForm';

export const saveUserToFirebase = async (userData: UserProfile) => {
  try {
    console.log('Starting user creation process...');
    
    // Validate required fields
    if (!userData.email || !userData.password) {
      throw new Error('Email and password are required');
    }

    if (userData.password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    console.log('Creating user with email:', userData.email);
    
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );

    const user = userCredential.user;
    console.log('User created successfully:', user.uid);

    // Update user profile with display name
    console.log('Updating user profile...');
    await updateProfile(user, {
      displayName: userData.fullName
    });

    // Create user document in Firestore
    console.log('Creating Firestore document...');
    const userDocRef = doc(db, 'users', user.uid);
    
    // Prepare user data for Firestore - create a new object without the password field
    const { password, ...userDataWithoutPassword } = userData;
    const userDataForFirestore = {
      ...userDataWithoutPassword,
      uid: user.uid,
      email: user.email,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    console.log('Saving to Firestore:', userDataForFirestore);
    await setDoc(userDocRef, userDataForFirestore);
    console.log('Firestore document created successfully');

    return user.uid;
  } catch (error: any) {
    console.error('Detailed error in saveUserToFirebase:', {
      code: error.code,
      message: error.message,
      stack: error.stack
    });
    throw error;
  }
}; 