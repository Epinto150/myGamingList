

class UserSerializer {

    static async getSummary(user) {
        const allowedAttributes = ['username', 'cryptedPassword']
    
        let serializedUser  = {}
        for (const attribute of allowedAttributes) {
          serializedUser[attribute] = user[attribute]
        }
    
        const relatedSteamID = await user.$relatedQuery("steamID")
        
    
        return serializedUser
      }

    static async getDetails(user, currentUserId) {
        const serializedUser = await UserSerializer.getSummary(user)
        const relatedSteamID = await user.$relatedQuery("steamID")
        serializedUser.steamID = await Promise.all(relatedSteamID.map(steam => {
            return UserSerializer.getSummary(steam, currentUserId)
        }))
        return serializedUser
    }
}

export default UserSerializer