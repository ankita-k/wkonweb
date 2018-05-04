import { config } from '../../src/config';
import { push } from 'react-router-redux';
import { developerList } from './reducers/developerList';

let conf = config.headers;



//function for login 
function receivePosts(json) {

    return {
        type: "RECEIVE_POSTS",
        json

    }
}

//function for login 
function loginApi(json) {

    return {
        type: "USER_LOGIN_SUCCESS",
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


// API call for login
export function login(username, password) {

    return (dispatch) => {
        console.log(config.apiUrl)
        return new Promise((resolve, reject) => {

            fetch(config.apiUrl + 'user/login?username=' + username + '&password=' + password,
                {
                    headers: {
                        'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
                    },
                    method: 'GET'
                })
                .then((response) => response.json())
                .then((responseJSON) => {
                    dispatch(loginApi(responseJSON))
                    resolve(responseJSON);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}





// Password api call
export function password(data) {
    console.log(data);
    return (dispatch) => {
        return new Promise((resolve, reject) => {

            fetch(config.apiUrl + 'user/resetPassword',
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
                    },
                    method: 'PUT',
                    body: JSON.stringify(data)

                })
                .then((response) =>
                    response.json())
                .then((responseJSON) => {
                    dispatch(changepwd(responseJSON))
                    resolve(responseJSON);
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


// FUNCTION FOR APICALL OF PROJECT CREATION 
export function addProject(data) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            fetch(config.apiUrl + 'project', {
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

// DISPATCH TOAST VALUE
export function opentoast(type, message) {
    return (dispatch) => {
        dispatch(toast(type, message))
    }
}

// SHOW TOAST NOTIFICATIONS
function toast(type, message) {
    switch (type) {
        case "success":
            return { type: "TOAST", toastype: type, message }
            break;
        case "info":
            return { type: 'TOAST', toastype: type, message }
            break;
        case "warning":
            return { type: "TOAST", toastype: type, message }
            break;
        case "error":
            return { type: "TOAST", toastype: type, message }
            break;
        default: return console.log('no notification')
    }

}
// PROJECTLIST  ACTION
function Projectlist(list) {
    return {
        type: "PROJECT_LIST",
        list

    }
}
// FUNCTION FOR APICALL OF PROJECT LIST
export function projectList(userId) {
    return (dispatch) => {
        fetch(config.apiUrl + 'project/projectlist?userId=' + userId, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
            },
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                if (!responseJSON.error)
                    dispatch(Projectlist(responseJSON.result))

            })
            .catch((error) => {
                dispatch(Projectlist([]))
            });

    }
}

//Client list api 
export function clientlist(userId) {

    return (dispatch) => {

        fetch(config.apiUrl + 'client/clientlist?userId=' + userId,
            {
                headers: {
                    'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
                },
                method: 'GET'
            })
            .then((response) => response.json())
            .then((responseJSON) => {
                dispatch(clientList(responseJSON.result))
            })
            .catch((error) => {
                dispatch(clientList([]))
            });

    }
}
//clientlist func
function clientList(list) {
    return {
        type: "CLIENT_LIST",
        list

    }
}
//Api call for fetching loggedin user on header
export function userdetails(id) {
    return (dispatch) => {
        console.log(config.apiUrl)
        fetch(config.apiUrl + 'user/' + id,
            {
                headers: {
                    'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
                },
                method: 'GET'
            })
            .then((response) => response.json())
            .then((responseJSON) => {
                if (!responseJSON.error)
                    dispatch(userdetail(responseJSON.result))

            })
            .catch((error) => {

            });
    }
}

//function for loggedin username 
function userdetail(detail) {
    return {
        type: "LOGGED_USER_DETAILS",
        detail

    }
}
//API CALL FOR DELETE Project
export function deleteproject(id) {
    console.log(id)

    return (dispatch) => {

        console.log(config.apiUrl)
        return new Promise((resolve, reject) => {
            fetch(config.apiUrl + 'project/' + id,
                {
                    headers: {
                        'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
                    },
                    method: 'DELETE'
                })
                .then((response) => response.json())
                .then((responseJSON) => {

                    console.log('response');

                    dispatch(deleterow(responseJSON))
                    resolve(responseJSON);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

function deleterow(list) {
    return {
        type: "DELETE_PROJECT",
        list

    }
}
// FOR USER MANAGEMENT
function user(json) {
    return {
        type: "USER_CREATE",
        json

    }
}
// CREATE USER APICALL
export function createUser(data) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            fetch(config.apiUrl + 'user', {
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
                    dispatch(user(responseJSON))
                    resolve(responseJSON);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}
//API call for client delete
export function deleteclient(id) {
    console.log(id)
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            fetch(config.apiUrl + 'client/' + id,
                {
                    headers: {
                        'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk=',

                    },
                    method: 'DELETE'
                })
                .then((response) => response.json())
                .then((responseJSON) => {

                    console.log('response');

                    dispatch(deleteclientrow(responseJSON))
                    resolve(responseJSON);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

function deleteclientrow(list) {
    return {
        type: "DELETE_CLIENT",
        list

    }
}

//API edit client
export function updateclient(data, id) {
    console.log(data, id)
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            fetch(config.apiUrl + 'client/' + id,
                {
                    headers: {
                        'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk=',
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    method: 'PUT',
                    body: JSON.stringify(data)
                })
                .then((response) => response.json())
                .then((responseJSON) => {

                    console.log('response');

                    dispatch(updateclientlist(responseJSON))
                    resolve(responseJSON);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

//API FOR EDIT PROJECT
export function editproject(data, id) {
    console.log('edit', data)
    console.log(id)
    return (dispatch) => {
        console.log(config.apiUrl)
        return new Promise((resolve, reject) => {

            fetch(config.apiUrl + 'project/' + id,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
                    },
                    method: 'PUT',
                    body: JSON.stringify(data)
                })
                .then((response) => response.json())
                .then((responseJSON) => {

                    dispatch(editrow(responseJSON))
                    resolve(responseJSON);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}


function editrow(list) {
    return {
        type: "EDIT_PROJECT",
        list

    }
}
function updateclientlist(list) {
    return {
        type: "UPDATE_CLIENT",
        list

    }
}



//User ROLE API
export function findByRole(role) {
    return (dispatch) => {

        fetch(config.apiUrl + 'user/findByRole?role=' + role,
            {
                headers: {
                    'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
                },
                method: 'GET'
            })
            .then((response) => response.json())
            .then((responseJSON) => {
                dispatch(developerlist(responseJSON.result))

            })
            .catch((error) => {

            });

    }
}

function developerlist(list) {
    console.log(list)
    return {
        type: "DEVELOPER_LIST",
        list

    }
}
//FUNCTION FOR API CALL FOR GETTING USER LIST AND DISPATCHING ACTION
export function userList() {
    return (dispatch) => {
        fetch(config.apiUrl + 'user/getAllUser',
            {
                headers: {
                    'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
                },
                method: 'GET'
            })
            .then((response) => response.json())
            .then((responseJSON) => {

                console.log(responseJSON)
                dispatch(userlist(responseJSON.result))

            })
            .catch((error) => {
                dispatch(userlist([]))
            });

    }
}
// FOR DISPATCHING ACTION TO REDUCER
function userlist(list) {
    return {
        type: "USER_LIST",
        list

    }
}
//
//API call for User delete
export function deleteUser(id) {
    console.log(id)
    return (dispatch) => {

        return new Promise((resolve, reject) => {

            fetch(config.apiUrl + 'user/delete?id=' + id,

                {
                    headers: {
                        'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk=',

                    },
                    method: 'DELETE'
                })
                .then((response) => response.json())
                .then((responseJSON) => {

                    console.log('response');

                    dispatch(deleteusers(responseJSON))
                    resolve(responseJSON);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

function deleteusers(list) {
    return {
        type: "DELETE_USER",
        list

    }
}

//API FOR EDIT PROJECT
export function editUser(data, id) {
    console.log('edit', data)
    return (dispatch) => {

        return new Promise((resolve, reject) => {
            fetch(config.apiUrl + 'user/' + id,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
                    },
                    method: 'PUT',
                    body: JSON.stringify(data)
                })
                .then((response) => response.json())
                .then((responseJSON) => {



                    dispatch(edituser(responseJSON))
                    resolve(responseJSON);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}


function edituser(list) {
    return {
        type: "EDIT_USER",
        list

    }
}


// API CALL FOR BILL CREATION
export function billCreate(billdata) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            fetch(config.apiUrl + 'bill',
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
                    },
                    method: 'POST',
                    body: JSON.stringify(billdata)
                })
                .then((response) => response.json())
                .then((responseJSON) => {
                    dispatch(billcreate(responseJSON))
                    resolve(responseJSON);
                    // console.log(responseJSON)
                    // if (responseJSON.error) {
                    //     dispatch(opentoast('warning', 'Bill Creation Failed!'))
                    // }
                    // else {
                    //   dispatch(push('/dashboard')) 
                    //     dispatch(billcreate(responseJSON.result))
                    //     dispatch(opentoast('success', 'Bill Created Successfully!'))
                    // }


                })
                .catch((error) => {
                    reject(error);
                    // dispatch(opentoast('error', 'Bill Creation Failed!'))
                });
        })
    }
}

function billcreate(response) {
    return {
        type: "BILL_CREATE_SUCCESS",
        response
    }
}
//Client list api 
export function billlist(userId) {
    console.log(userId)
    return (dispatch) => {

        fetch(config.apiUrl + 'bill?userId=' + userId,
            {
                headers: {
                    'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
                },
                method: 'GET'
            })
            .then((response) => response.json())
            .then((responseJSON) => {
                dispatch(BillList(responseJSON.result))

            })
            .catch((error) => {
                dispatch(BillList([]))
            });

    }
}

//billlist func
function BillList(list) {
    console.log(list)
    return {
        type: "BILL_LIST",
        list

    }
}
//API FOR EDIT BILL
export function BillEdit(data, id) {
    console.log('edit', data)
    console.log(id)

    return (dispatch) => {

        console.log(config.apiUrl)
        return new Promise((resolve, reject) => {



            fetch(config.apiUrl + 'bill?id=' + id,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
                    },
                    method: 'PUT',
                    body: JSON.stringify(data)
                })
                .then((response) => response.json())
                .then((responseJSON) => {



                    dispatch(editdataBill(responseJSON))
                    resolve(responseJSON);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}


function editdataBill(list) {
    return {
        type: "EDIT_BILL",
        list

    }
}
//API FOR GET VERTICAL LEAD
export function verticalLeads(tags) {

    return (dispatch) => {
        console.log(config.apiUrl)
        return new Promise((resolve, reject) => {

            fetch(config.apiUrl + 'user/findBytags?tags=' + tags,
                {
                    headers: {
                        'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
                    },
                    method: 'GET'
                })
                .then((response) => response.json())
                .then((responseJSON) => {
                    dispatch(Vertical(responseJSON))
                    resolve(responseJSON);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

function Vertical(json) {
    return {
        type: "VERTICAL_LEAD",
        json

    }
}

// CLEAR LOGGEN IN USER DATA
function cleardata() {
    return {
        type: "CLEAR_USER_DATA",
    }
}

// GET DASHBOARD DETAILS

export function dashboardProject(userId) {

    return (dispatch) => {
        console.log(config.apiUrl)

        fetch(config.apiUrl + 'user/dashboardDetails?id=' + userId,
            {
                headers: {
                    'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
                },
                method: 'GET'
            })
            .then((response) => response.json())
            .then((responseJSON) => {
                if (!responseJSON.error)
                    dispatch(dashboardproject(responseJSON.result))
            })
            .catch((error) => {
            });

    }
}
//GET CUSTOMERS DATA ON DASHBOARD
export function dashboardCustomer(userId) {
    return (dispatch) => {
        console.log(config.apiUrl)

        fetch(config.apiUrl + 'user/clientDashboardDetails?id=' + userId,
            {
                headers: {
                    'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
                },
                method: 'GET'
            })
            .then((response) => response.json())
            .then((responseJSON) => {
                if (!responseJSON.error)
                    dispatch(dashboardcustomer(responseJSON.result))
            })
            .catch((error) => {

            });

    }
}

// GET DASHBOARD DETAILS FRO PROJECT
function dashboardproject(data) {
    return {
        type: "DASHBOARD_PROJECT",
        data
    }
}
// GET DASHBOARD DETAILS FRO CUSTOMER
function dashboardcustomer(data) {
    return {
        type: "DASHBOARD_CUSTOMER",
        data
    }
}
//API  FOR ADD MEMBER
export function addMember(data, id) {
    return (dispatch) => {
        console.log(config.apiUrl)
        return new Promise((resolve, reject) => {
            fetch(config.apiUrl + 'project/addmember?id=' + id,
                {
                    headers: {
                        'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk=',
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    method: 'PUT',
                    body: JSON.stringify(data)
                })
                .then((response) => response.json())
                .then((responseJSON) => {

                    console.log('response');

                    dispatch(member(responseJSON))
                    resolve(responseJSON);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}
// ADD MEMBER
function member(json) {
    return {
        type: "ADD_MEMBER",
        json
    }
}
