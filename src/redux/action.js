import { config } from '../../src/config';
let conf = config.headers;
//function for login 
 function receivePosts(json) {
   
    return {
        type: "RECEIVE_POSTS",
        json

    }
 }
//function for change pwd
function changepwd(json) {
    
     return {
         type: "RECEIVE_PWD",
         json
 
     }
 }
 

// // api call
 export function login(username, password) {

     return (dispatch) => {
         console.log(config.apiUrl)
        return new Promise((resolve, reject) =>{
         
        fetch(config.apiUrl + 'user/login?username=' + username + '&password=' + password,
         {
           headers: {
             'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
  },
           method: 'GET' 
    })
            .then((response) => response.json())
            .then((json) => {
                debugger;
                dispatch(receivePosts(json))
               resolve(json);            })
          .catch((error) => {
            reject(error);
          });
            });
     }
 }





// Password api call
export function password( data) {
    console.log(data);
        return (dispatch) => {
            console.log(config.apiUrl)
            return new Promise((resolve, reject) =>{
             
            fetch(config.apiUrl + 'user/resetPassword',
             {
               headers: {
                'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
     },
              method: 'PUT' ,
              body:JSON.stringify(data)
        })
                .then((response) => response.json())
                .then((json) => {
                    debugger;
                    dispatch(changepwd(json))
                    resolve(json);
                })
               .catch((error) => {
                reject(error);
               });
               });
        }
    }
