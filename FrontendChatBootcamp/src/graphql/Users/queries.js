import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query ($search: String) {
    users(search: $search) {
      id
      firstName
      lastName
      isLoggedIn
    }
  }
`;

// const useGetUsers =({variables:{search}})=>{
//     const getUsersQuery = useQuery(GET_USERS,{
//         variables:{
//             search
//         }
//     })
//     console.log("getuserss",getUsersQuery)
//     return getUsersQuery.data?.users ?? []
// }
// export default useGetUsers
