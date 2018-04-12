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


// COUNTRY LIST ACTION DISPATCHED
function countrylist(list) {
    return {
        type: "COUNTRY_LIST",
        list

    }
}


// CREATE CLIENT APICALL
export function createClient(data) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            fetch(config.apiUrl + 'client', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
                },
                method: 'POST',
                body: JSON.stringify(data)
            })
                .then((response) => response.json())
                .then((responseJSON) => {
                    dispatch(receivePosts(responseJSON))
                    resolve(responseJSON);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

//GET COUNTRIES LIST 
export function countrylist() {
    return (dispatch) => {

        return new Promise(function (resolve, reject) {
            fetch('/assets/countrieslist.json', { method: 'GET' })
                .then((response) => {
                    response.json()
                        .then(function (myJson) {
                            dispatch(countrylist(myJson))
                            resolve(myJson);
                        }, function (error) {
                            reject(error);
                        });
                });
        })

    }
}


