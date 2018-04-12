import {config} from '../config';


function receivePosts(response) {
    return {
        type: "RECEIVE_POSTSAPI",
        response

    }
}

// CREATE CLIENT APICALL
export function createClient(data) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            fetch(config.apiUrl + 'client', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
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

