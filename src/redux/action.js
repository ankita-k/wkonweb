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

function countryList(list) {
    console.log("action dispatched")
    return {
        type: "COUNTRY_LIST",
        list

    }
}




//GET COUNTRIES LIST 
export function countrylist() {

    return (dispatch) => {


        console.log("action")

        // return new Promise(function (resolve, reject) {
        fetch('/assets/countrieslist.json', { method: 'GET' })
            .then((response) => {

                response.json()
                    .then(function (myJson) {
                        dispatch(countryList(myJson))
                        // resolve(myJson);
                    }, function (error) {
                        // reject(error);
                    });
            });
        // })

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
        default: { }
    }

}


//Api call for fetching loggedin user on header
export function username(id) {

    return (dispatch) => {

        console.log(config.apiUrl)
        return new Promise((resolve, reject) => {



            fetch(config.apiUrl + 'user/' + id,
                {
                    headers: {
                        'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
                    },
                    method: 'GET'
                })
                .then((response) => response.json())
                .then((responseJSON) => {

                    console.log('response');

                    dispatch(user(responseJSON))
                    resolve(responseJSON);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

//function for loggedin username 
//clientlist func
function user(list) {
    return {
        type: "USER_NAME",
        list

    }
}

function deleterow(list) {
    return {
        type: "DELETE_PROJECT",
        list

    }
}
//....................... CRUD FOR CLIENT.........................................

/*CLIENT CREATION BY API CALL AND GET NEW CLIENT LIST IMMEDIATELY*/
export function createClient(data, location) {
    return (dispatch) => {
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
                if (responseJSON.error) {
                    dispatch(toast('Warning', 'Client Creation failed!'));
                } else {
                    console.log(responseJSON)
                    let url = config.apiUrl + "client/clientlist?userId=" + data.userId;

                    fetch(url,
                        { headers: { 'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk=' }, method: 'GET' })
                        .then((response) => response.json())
                        .then((responseJSON) => {
                            dispatch(toast('success', 'Client Added Successfully!'));
                            dispatch(clientList(responseJSON.result))

                            location.push("../dashboard/clientlist")
                        })
                        .catch((error) => {
                            dispatch(clientList([]));
                            dispatch(toast('success', 'Client Added Successfully!'));
                        });

                }
            })
            .catch((error) => {
                dispatch(toast('success', 'Client Creation failed!'));
            });
    }
}

//FUNCTION FOR API CALL FOR GETTING CLIENT LIST AND DISPATCHING ACTION
export function clientlist(userId) {
    console.log("clientlist api call")
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
                console.log(responseJSON)
                return dispatch(clientList(responseJSON.result))
            })
            .catch((error) => {
                return dispatch(clientList([]))
            });

    }
}
// CLIENTLIST  ACTION
function clientList(list) {
    return {
        type: "CLIENT_LIST",
        list

    }
}
/*UPDATE CLIENT BY API CALL AND GET NEW CLIENT LIST IMMEDIATELY*/
export function updateclient(data, id, userid, location) {
    console.log(data, id)
    return (dispatch) => {
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

                if (responseJSON.error) {
                    dispatch(toast('Warning', 'Client Updation failed!'));
                } else {
                    let url = config.apiUrl + "client/clientlist?userId=" + userid;

                    fetch(url,
                        { headers: { 'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk=' }, method: 'GET' })
                        .then((response) => response.json())
                        .then((responseJSON) => {
                            dispatch(toast('success', 'Client Updated Successfully!'));
                            dispatch(clientList(responseJSON.result))

                            location.push("../dashboard/clientlist")
                        })
                        .catch((error) => {
                            dispatch(clientList([]));
                            dispatch(toast('success', 'Client Updated Successfully!'));
                        });

                }
            })
            .catch((error) => {
                dispatch(toast('Warning', 'Client Updation failed!'));
            });
    }
}
/*DELETE CLIENT BY API CALL AND GET NEW CLIENT LIST IMMEDIATELY*/
export function deleteclient(id, userid, location) {
    console.log(id)

    return (dispatch) => {
        fetch(config.apiUrl + 'client/' + id,
            {
                headers: {
                    'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk=',

                },
                method: 'DELETE'
            })
            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON.error) {
                    dispatch(toast('Warning', 'Client Deletion failed!'));
                } else {
                    console.log(responseJSON)
                    let url = config.apiUrl + "client/clientlist?userId=" + userid;

                    fetch(url,
                        { headers: { 'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk=' }, method: 'GET' })
                        .then((response) => response.json())
                        .then((responseJSON) => {
                            dispatch(toast('success', 'Client Deleted Successfully!'));
                            dispatch(clientList(responseJSON.result))

                            location.push("../dashboard/clientlist")
                        })
                        .catch((error) => {
                            dispatch(clientList([]));
                            dispatch(toast('success', 'Client Deleted Successfully!'));
                        });

                }
            })
            .catch((error) => {
                dispatch(toast('Warning', 'Client Deletion failed!'));
            });

    }
}
 //.............................. END OF CRUD FOR CLIENT.....................................



//....................... CRUD FOR PROJECT.........................................

// CREATE PROJECT APICALL WITH  GETTING PROJECT LIST AND DISPATCHING ACTION
export function addProject(data, location) {
console.log(data)
    return (dispatch) => {
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
                if (responseJSON.error) {
                    dispatch(toast('Warning', 'Project Creation failed!'));
                } else {
                    let url = config.apiUrl + 'project/projectlist?userId=' + data.userId ;

                    fetch(url,
                        { headers: { 'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk=' }, method: 'GET' })
                        .then((response) => response.json())
                        .then((responseJSON) => {
                            dispatch(Projectlist(responseJSON.result))
                            dispatch(toast('success', 'Project Added Successfully!'));
                            location.push("../dashboard/projectlist")
                        })
                        .catch((error) => {
                            dispatch(Projectlist([]))
                            dispatch(toast('warning', 'project Added Successfully!'));
                        });

                }
            })
            .catch((error) => {
                dispatch(toast('warning', 'Project Creation failed!'));
            });
    }
}
// PROJECTLIST  ACTION
function Projectlist(list) {
    return {
        type: "PROJECT_LIST",
        list

    }
}
//FUNCTION FOR API CALL FOR GETTING PROJECT LIST AND DISPATCHING ACTION
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
//API FOR EDIT PROJECT WITH GETTING PROJECT LIST AND DISPATCHING ACTION
export function editproject(data, id,location) {
    console.log('edit', data)
    console.log(id)

    return (dispatch) => {
        fetch(config.apiUrl + 'project/' + id, {
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
                if (responseJSON.error) {
                    dispatch(toast('Warning', 'Project Updation failed!'));
                } else {
                    let url = config.apiUrl + 'project/projectlist?userId=' + data.userId ;

                    fetch(url,
                        { headers: { 'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk=' }, method: 'GET' })
                        .then((response) => response.json())
                        .then((responseJSON) => {
                            dispatch(Projectlist(responseJSON.result))
                            dispatch(toast('success', 'Project Updated Successfully!'));
                            location.push("../dashboard/projectlist")
                        })
                        .catch((error) => {
                            dispatch(Projectlist([]))
                            dispatch(toast('warning', 'Project Updated Successfully!'));
                        });

                }
            })
            .catch((error) => {
                dispatch(toast('warning', 'project Updation failed!'));
            });
    }
}
//API FOR DELETE PROJECT WITH GETTING PROJECT LIST AND DISPATCHING ACTION
export function deleteproject(userId,id,location) {
    console.log(id)
    return (dispatch) => {
        fetch(config.apiUrl + 'project/'+id, {
            headers: {
                'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
            },
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON.error) {
                    dispatch(toast('Warning', 'Project Deleted failed!'));
                } else {
                    let url = config.apiUrl + 'project/projectlist?userId=' + userId ;

                    fetch(url,
                        { headers: { 'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk=' }, method: 'GET' })
                        .then((response) => response.json())
                        .then((responseJSON) => {
                            dispatch(Projectlist(responseJSON.result))
                            dispatch(toast('success', 'Project Deleted Successfully!'));
                            location.push("../dashboard/projectlist")
                        })
                        .catch((error) => {
                            dispatch(Projectlist([]))
                            dispatch(toast('warning', 'project Deleted Successfully!'));
                        });

                }
            })
            .catch((error) => {
                dispatch(toast('warning', 'Project Deleted failed!'));
            });
    }
}

//API FOR ADD MEMBER IN  PROJECT 
export function addMember(data,id) {
    return (dispatch) => {
        fetch(config.apiUrl + 'project/addmember?id=' + id, {
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
                console.log(responseJSON)
                if (!responseJSON.error)
                dispatch(toast('success', 'Member Added Sucessfully!'));  

            })
            .catch((error) => {
                    dispatch(toast('Warning', 'Member Added  failed!'));
            });

    }
}

 //.............................. END OF CRUD FOR PROJECT.....................................


 //.....................CRUD FOR USER MANGEMENT.....................................

// CREATE USER APICALL WITH  GETTING USER LIST AND DISPATCHING ACTION
export function createUser(data, location) {

    return (dispatch) => {
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
                if (responseJSON.error) {
                    dispatch(toast('Warning', 'User Creation failed!'));
                } else {
                    let url = config.apiUrl + "user/getAllUser";

                    fetch(url,
                        { headers: { 'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk=' }, method: 'GET' })
                        .then((response) => response.json())
                        .then((responseJSON) => {
                            dispatch(userlist(responseJSON.result))
                            dispatch(toast('success', 'User Added Successfully!'));
                            location.push("../dashboard/userlist")
                        })
                        .catch((error) => {
                            dispatch(userlist([]))
                            dispatch(toast('warning', 'User Added Successfully!'));
                        });

                }
            })
            .catch((error) => {
                dispatch(toast('warning', 'User Creation failed!'));
            });
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
//API FOR EDIT USER WITH GETTING USER LIST AND DISPATCHING ACTION
export function editUser(data, id,location) {
    console.log('edit', data)
    console.log(id)

    return (dispatch) => {
        fetch(config.apiUrl + 'user/' + id, {
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
                if (responseJSON.error) {
                    dispatch(toast('Warning', 'User Updation failed!'));
                } else {
                    let url = config.apiUrl + "user/getAllUser";

                    fetch(url,
                        { headers: { 'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk=' }, method: 'GET' })
                        .then((response) => response.json())
                        .then((responseJSON) => {
                            dispatch(userlist(responseJSON.result))
                            dispatch(toast('success', 'User Updated Successfully!'));
                            location.push("../dashboard/userlist")
                        })
                        .catch((error) => {
                            dispatch(userlist([]))
                            dispatch(toast('warning', 'User Updated Successfully!'));
                        });

                }
            })
            .catch((error) => {
                dispatch(toast('warning', 'User Updation failed!'));
            });
    }
}
//API FOR DELETE USER WITH GETTING USER LIST AND DISPATCHING ACTION
export function deleteUser(id,location) {
    console.log(id)
    return (dispatch) => {
        fetch(config.apiUrl + 'user/delete?id=' + id, {
            headers: {
                'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
            },
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON.error) {
                    dispatch(toast('Warning', 'User Deleted failed!'));
                } else {
                    let url = config.apiUrl + "user/getAllUser"

                    fetch(url,
                        { headers: { 'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk=' }, method: 'GET' })
                        .then((response) => response.json())
                        .then((responseJSON) => {
                            dispatch(userlist(responseJSON.result))
                            dispatch(toast('success', 'User Deleted Successfully!'));
                            location.push("../dashboard/userlist")
                        })
                        .catch((error) => {
                            dispatch(userlist([]))
                            dispatch(toast('warning', 'User Deleted Successfully!'));
                        });

                }
            })
            .catch((error) => {
                dispatch(toast('warning', 'User Deleted failed!'));
            });
    }
    //.............................. END OF CRUD FOR USER MANGEMENT.....................................
}


 //.....................CRUD FOR Bill.....................................


/*BILL CREATION BY API CALL AND GET NEW BILL LIST IMMEDIATELY*/
export function billCreate(billdata, location) {
    return (dispatch) => {
        // return new Promise((resolve, reject) => {
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
                if (responseJSON.error) {
                    dispatch(toast('Warning', 'Bill Creation failed!'));
                }
                else {
                    let url = config.apiUrl + "bill?userId=" + billdata.userId;

                    fetch(url,
                        { headers: { 'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk=' }, method: 'GET' })
                        .then((response) => response.json())
                        .then((responseJSON) => {
                            dispatch(toast('success', 'Bill Created Successfully!'));
                            dispatch(BillList(responseJSON.result))

                            location.push("../dashboard/billlist")
                        })
                        .catch((error) => {
                            dispatch(BillList([]))
                            dispatch(toast('warning', 'Bill Created  Successfully!'));
                        });

                }
            })
            .catch((error) => {
                dispatch(opentoast('error', 'Bill Creation Failed!'))
            });

    }
}

/* GET  BILL LIST BY API CALLING AND DISPATCHING ACTION*/ 
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
/*BILL UPDATION BY API CALL AND GET NEW BILL LIST IMMEDIATELY*/
export function BillEdit(data, id, location) {
    console.log('edit', data)
    console.log(id)
    return (dispatch) => {
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
                if (responseJSON.error) {
                    dispatch(toast('Warning', 'Bill Updation failed!'));
                }
                else {
                    let url = config.apiUrl + "bill?userId=" + data.userId;

                    fetch(url,
                        { headers: { 'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk=' }, method: 'GET' })
                        .then((response) => response.json())
                        .then((responseJSON) => {
                            console.log(responseJSON.result)
                            dispatch(toast('success', 'Bill Updated Successfully!'));
                            dispatch(BillList(responseJSON.result))

                            location.push("../dashboard/billlist")
                        })
                        .catch((error) => {
                            dispatch(BillList([]))
                            dispatch(toast('warning', 'Bill Updated  Successfully!'));
                        });

                }
            })

            .catch((error) => {

            });
    }
}

    //.............................. END OF CRUD FOR BILL.....................................



// function editrow(list) {
//     return {
//         type: "EDIT_PROJECT",
//         list

//     }
// }


// GET DASHBOARD DETAILS

export function dashboardData(userId) {

    return (dispatch) => {
        console.log(config.apiUrl)
        return new Promise((resolve, reject) => {

            fetch(config.apiUrl + 'user/dashboardDetails?id=' + userId,
                {
                    headers: {
                        'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
                    },
                    method: 'GET'
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

//User ROLE API
export function findByRole(role) {
    return (dispatch) => {
        console.log(config.apiUrl)


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


//API FOR GET VERTICAL LEAD AND DISPACTHING ACTION
export function tagsList(tags) {
    return (dispatch) => {
        fetch(config.apiUrl + 'user/findBytags?tags=' + tags,
            {
                headers: {
                    'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
                },
                method: 'GET'
            })
            .then((response) => response.json())
            .then((responseJSON) => {
                if (!responseJSON.error) {
                    dispatch(RoleWithTags(responseJSON.result))
                }
            })
            .catch((error) => {

            });
    }
}

function RoleWithTags(list) {
    return {
        type: "VERTICAL_LEAD",
        list

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
                    dispatch(dashboardproject(responseJSON.result));
                // loader(false);
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
                if (!responseJSON.error) {
                    dispatch(dashboardcustomer(responseJSON.result))
                    // dispatch(loader(false))
                }

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


// FULL PAGE LOADER
export function loader(data) {
    console.log(data)
    return (dispatch) => {
        dispatch(loaders(data))
    }

}

function loaders(data) {
    return {
        type: "FULL_PAGE_LOADER",
        data
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

