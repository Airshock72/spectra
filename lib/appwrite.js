import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite'

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.airshock.spectra',
  projectId: '66aa8c210032535e0c49',
  databaseId: '66aa8d76003adabc7ac7',
  userCollectionId: '66aa8d940008c5a2c0be',
  videoCollectionId: '66aa8db6000ea3212b7b',
  storageId: '66ab69f80030e83797b1',
}

const client = new Client()

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform)

const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username,
    )

    if (!newAccount) throw Error

    const avatarUrl = avatars.getInitials(username)

    await signIn(email, password)

    return await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl
      }
    )
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export const signIn = async (email, password) => {
  try {
    const currentSession = await account.getSession('current')
    if (currentSession) return currentSession
    return await account.createEmailPasswordSession(email, password)
  } catch (error) {
    throw new Error(error)
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get()
    if (!currentAccount) throw Error

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )

    if (!currentUser) throw Error

    return currentUser.documents[0]

  } catch (error) {
    console.log(error)
  }
}
