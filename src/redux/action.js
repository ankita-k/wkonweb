import { config } from '../config';
let apikey=config.headers

function receivePosts(response) {
    return {
        type: "RECEIVE_POSTSAPI",
        response

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


