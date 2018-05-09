import { config } from '../../src/config';
import { push } from 'react-router-redux';
import { developerList } from './reducers/developerList';

let conf = config.headers;



//function for change pwd
function changepwd(json) {

    return {
        type: "RECEIVE_PWD",
        json

    }
}


// API call for login
export function login(logindata, location) {
    return (dispatch) => {
        dispatch(loaders(true))
        fetch(config.apiUrl + 'user/login?username=' + logindata.email + '&password=' + logindata.password,
            {
                headers: {
                    'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
                },
                method: 'GET'
            })
            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON.error) {
                    dispatch(loaders(false));
                    dispatch(toast('error', 'No Such User Exist'));

                }
                else {
                    dispatch(loaders(false));
                    if (responseJSON.result && responseJSON.result.lastLogin) {
                        if (logindata.checkbox == true) {
                            console.log('local Storage')
                            localStorage.setItem('id', responseJSON.result._id);
                            location.push('/dashboard');
                        }
                        else {
                            console.log('session Storage')
                            sessionStorage.setItem('id', responseJSON.result._id);
                            location.push('/dashboard');
                        }
                    }
                    else if (responseJSON.result && !responseJSON.result.lastLogin) {
                        if (logindata.checkbox == true) {
                            localStorage.setItem('id', responseJSON.result._id);
                            location.push('/passwordchange');
                        }
                        else {
                            sessionStorage.setItem('id', responseJSON.result._id)
                            location.push('/passwordchange');
                        }
                    }
                }


            })
            .catch((error) => {
                dispatch(loaders(false));
                dispatch(toast('error', 'No Such User Exist'))

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
        dispatch(loaders(true))
        // return new Promise(function (resolve, reject) {
        fetch('/assets/countrieslist.json', { method: 'GET' })
            .then((response) => {

                response.json()
                    .then(function (myJson) {
                        dispatch(countryList(myJson))
                        dispatch(loaders(false))
                    }, function (error) {
                        dispatch(loaders(false))
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

//....................... CRUD FOR CLIENT.........................................

/*CLIENT CREATION BY API CALL AND GET NEW CLIENT LIST IMMEDIATELY*/
export function createClient(data, location) {
    return (dispatch) => {
        dispatch(loaders(true))
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
                    dispatch(loaders(false))
                } else {
                    console.log(responseJSON)
                    let url = config.apiUrl + "client/clientlist?userId=" + data.userId;

                    fetch(url,
                        { headers: { 'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk=' }, method: 'GET' })
                        .then((response) => response.json())
                        .then((responseJSON) => {
                            dispatch(toast('success', 'Client Added Successfully!'));
                            /** FETCH DASHBOARD CUSTOMER DATA*/
                            let newurl = config.apiUrl + 'user/clientDashboardDetails?id=' + data.userId;
                            fetch(newurl,
                                { headers: { 'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk=' }, method: 'GET' })
                                .then((response) => response.json())
                                .then((responseJSON) => {
                                    dispatch(dashboardcustomer(responseJSON.result));

                                })
                                .catch((error) => {
                                    dispatch(dashboardcustomer({}));

                                });
                            /*FETCH DASHBOARD CUSTOMER DATA ENDS*/

                            dispatch(clientList(responseJSON.result));
                            dispatch(loaders(false));
                            dispatch(menuKeys('client_list'));
                            location.push("../dashboard/clientlist");
                        })
                        .catch((error) => {
                            dispatch(clientList([]));
                            dispatch(toast('warning', 'Client Creation Failed!'));
                            dispatch(loaders(false))
                        });

                }
            })
            .catch((error) => {
                dispatch(toast('success', 'Client Creation failed!'));
                dispatch(loaders(false))
            });
    }
}

//FUNCTION FOR API CALL FOR GETTING CLIENT LIST AND DISPATCHING ACTION
export function clientlist(userId) {
    console.log("clientlist api call")
    return (dispatch) => {
        dispatch(loaders(true))
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
                dispatch(clientList(responseJSON.result))
                dispatch(loaders(false))
            })
            .catch((error) => {
                dispatch(clientList([]))
                dispatch(loaders(false))
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
        dispatch(loaders(true));
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
                    dispatch(loaders(false))
                } else {
                    let url = config.apiUrl + "client/clientlist?userId=" + userid;

                    fetch(url,
                        { headers: { 'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk=' }, method: 'GET' })
                        .then((response) => response.json())
                        .then((responseJSON) => {
                            dispatch(toast('success', 'Client Updated Successfully!'));
                            dispatch(clientList(responseJSON.result))
                            dispatch(loaders(false));
                            dispatch(menuKeys('client_list'));
                            location.push("../dashboard/clientlist")
                        })
                        .catch((error) => {
                            dispatch(clientList([]));
                            dispatch(toast('warning', 'Client Updation Failed!'));
                            dispatch(loaders(false))
                        });

                }
            })
            .catch((error) => {
                dispatch(toast('Warning', 'Client Updation failed!'));
                dispatch(loaders(false))
            });
    }
}
/*DELETE CLIENT BY API CALL AND GET NEW CLIENT LIST IMMEDIATELY*/
export function deleteclient(id, userid, location) {
    console.log(id)

    return (dispatch) => {
        dispatch(loaders(true))
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
                    dispatch(loaders(false))
                } else {
                    console.log(responseJSON)
                    let url = config.apiUrl + "client/clientlist?userId=" + userid;

                    fetch(url,
                        { headers: { 'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk=' }, method: 'GET' })
                        .then((response) => response.json())
                        .then((responseJSON) => {
                            dispatch(toast('success', 'Client Deleted Successfully!'));
                            dispatch(clientList(responseJSON.result))
                            /** FETCH DASHBOARD CUSTOMER DATA*/
                            let newurl = config.apiUrl + 'user/clientDashboardDetails?id=' + userid;
                            fetch(newurl,
                                { headers: { 'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk=' }, method: 'GET' })
                                .then((response) => response.json())
                                .then((responseJSON) => {
                                    dispatch(dashboardcustomer(responseJSON.result));
                                })
                                .catch((error) => {
                                    dispatch(dashboardcustomer({}))
                                });
                            /*FETCH DASHBOARD CUSTOMER DATA ENDS*/

                            dispatch(loaders(false));
                            dispatch(menuKeys('client_list'));
                            location.push("../dashboard/clientlist")
                        })
                        .catch((error) => {
                            dispatch(clientList([]));
                            dispatch(toast('Warning', 'Client Deletion failed!'));
                            dispatch(loaders(false))
                        });

                }
            })
            .catch((error) => {
                dispatch(toast('Warning', 'Client Deletion failed!'));
                dispatch(loaders(false))
            });

    }
}
//.............................. END OF CRUD FOR CLIENT.....................................



//....................... CRUD FOR PROJECT.........................................

// CREATE PROJECT APICALL WITH  GETTING PROJECT LIST AND DISPATCHING ACTION
export function addProject(data, location) {
    console.log(data)
    return (dispatch) => {
        dispatch(loaders(true))
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
                    dispatch(toast('warning', 'Project Creation failed!'));
                    dispatch(loaders(false))
                } else {
                    let url = config.apiUrl + 'project/projectlist?userId=' + data.userId;

                    fetch(url,
                        { headers: { 'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk=' }, method: 'GET' })
                        .then((response) => response.json())
                        .then((responseJSON) => {
                            dispatch(Projectlist(responseJSON.result))
                            dispatch(toast('success', 'Project Added Successfully!'));
                            /** FETCH DASHBOARD PROJECT DATA*/
                            let newurl = config.apiUrl + 'user/dashboardDetails?id=' + data.userId;
                            console.log(data.userId)
                            fetch(newurl,
                                { headers: { 'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk=' }, method: 'GET' })
                                .then((response) => response.json())
                                .then((responseJSON) => {
                                    dispatch(dashboardproject(responseJSON.result));
                                    dispatch(loaders(false));
                                })
                                .catch((error) => {
                                    dispatch(dashboardproject({}))
                                    dispatch(loaders(false))
                                });
                            /*FETCH DASHBOARD PROJECT DATA ENDS*/
                            dispatch(loaders(false));
                            dispatch(menuKeys('project_list'));
                            location.push("../dashboard/projectlist")

                        })
                        .catch((error) => {
                            dispatch(Projectlist([]))
                            dispatch(toast('warning', 'Project Creation failed!'));
                            dispatch(loaders(false))
                        });

                }
            })
            .catch((error) => {
                dispatch(toast('warning', 'Project Creation failed!'));
                dispatch(loaders(false))
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
        dispatch(loaders(true))
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
                dispatch(loaders(false))
            })
            .catch((error) => {
                dispatch(Projectlist([]))
                dispatch(loaders(false))
            });

    }
}
//API FOR EDIT PROJECT WITH GETTING PROJECT LIST AND DISPATCHING ACTION
export function editproject(data, userId, id, location) {
    console.log('edit', data)
    console.log(id)
    return (dispatch) => {
        dispatch(loaders(true))
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
                    dispatch(toast('warning', 'Project Updation failed!'));
                    dispatch(loaders(false))
                } else {
                    console.log(userId)
                    let url = config.apiUrl + 'project/projectlist?userId=' + userId;

                    fetch(url,
                        { headers: { 'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk=' }, method: 'GET' })
                        .then((response) => response.json())
                        .then((responseJSON) => {
                            console.log(responseJSON)
                            dispatch(Projectlist(responseJSON.result))
                            dispatch(toast('success', 'Project Updated Successfully!'));
                            dispatch(loaders(false));
                            dispatch(menuKeys('project_list'));
                            location.push("../dashboard/projectlist")
                        })
                        .catch((error) => {
                            console.log('........Error.......', error)
                            dispatch(Projectlist([]))
                            dispatch(toast('warning', 'Project Updation failed!'));
                            dispatch(loaders(false))
                        });

                }
            })
            .catch((error) => {
                dispatch(toast('warning', 'project Updation failed!'));
                dispatch(loaders(false))
            });
    }
}
//API FOR DELETE PROJECT WITH GETTING PROJECT LIST AND DISPATCHING ACTION
export function deleteproject(userId, id, location) {
    console.log(id)
    return (dispatch) => {
        dispatch(loaders(true))
        fetch(config.apiUrl + 'project/' + id, {
            headers: {
                'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
            },
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON.error) {
                    dispatch(toast('Warning', 'Project Deletion failed!'));
                    dispatch(loaders(false))
                } else {
                    let url = config.apiUrl + 'project/projectlist?userId=' + userId;

                    fetch(url,
                        { headers: { 'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk=' }, method: 'GET' })
                        .then((response) => response.json())
                        .then((responseJSON) => {
                            dispatch(Projectlist(responseJSON.result))
                            dispatch(toast('success', 'Project Deleted Successfully!'));
                            /** FETCH DASHBOARD PROJECT DATA*/
                            let newurl = config.apiUrl + 'user/dashboardDetails?id=' + userId;
                            fetch(newurl,
                                { headers: { 'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk=' }, method: 'GET' })
                                .then((response) => response.json())
                                .then((responseJSON) => {
                                    dispatch(dashboardproject(responseJSON.result));

                                })
                                .catch((error) => {
                                    dispatch(dashboardproject({}))

                                });
                            /*FETCH DASHBOARD PROJECT DATA ENDS*/
                            dispatch(loaders(false));
                            dispatch(menuKeys('project_list'));
                            location.push("../dashboard/projectlist")
                        })
                        .catch((error) => {
                            dispatch(Projectlist([]))
                            dispatch(toast('warning', 'Project Deletion failed!'));
                            dispatch(loaders(false))
                        });

                }
            })
            .catch((error) => {
                dispatch(toast('warning', 'Project Deletion failed!'));
                dispatch(loaders(false))
            });
    }
}


// API FOR STATUS CHANGED IN  PROJECT AND API FOR ADD MEMBER IN  PROJECT 
export function addMember(data, id) {
    console.log('edit', data);
    console.log(id);
    return (dispatch) => {
        fetch(config.apiUrl + 'project/' + id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
            },
            method: 'PUT',
            body: JSON.stringify({ status: "InProgress" })
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON.error) {
                } else {                                                    // API FOR ADD MEMBER IN  PROJECT 
                    let url = config.apiUrl + 'project/addmember?id=' + id;
                    console.log(data, id);
                    fetch(url,
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
                            console.log('member Added', responseJSON)
                            dispatch(toast('success', 'Member Added Sucessfully!'));

                        })
                        .catch((error) => {
                            console.log('........Error.......', error)
                            dispatch(Projectlist([]))
                            dispatch(toast('warning', 'Member Added  failed!'));
                            dispatch(loaders(false))
                        });

                }
            })
            .catch((error) => {
                dispatch(toast('warning', 'Member Added  failed!'));
                dispatch(loaders(false))
            });
    }
}
//API FOR REMOVE MEMBER FROM PROJECT AND UPDATE
export function removeMember(data, projectId) {
    console.log('member Removed',data, projectId)
    return (dispatch) => {
        fetch(config.apiUrl + 'project/deletemember?id=' + projectId,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
                },
                method: 'PUT',
                body: JSON.stringify({userId:data})
            })
            .then((response) => response.json())
            .then((responseJSON) => {
console.log(responseJSON.members)
                console.log('Member Deleted',responseJSON)
                dispatch(toast('success', 'Member Deleted!'));
                dispatch(member(responseJSON.result.members));

            })
            .catch((error) => {
                dispatch(toast('warning', 'Member Deleted  failed!'));
            });

    }

}
// MEMBER REMOVE ACTION
function member(list) {
    return {
        type: "MEMBER_REMOVE",
        list

    }
}


//.............................. END OF CRUD FOR PROJECT.....................................


//.....................CRUD FOR USER MANGEMENT.....................................

// CREATE USER APICALL WITH  GETTING USER LIST AND DISPATCHING ACTION
export function createUser(data, location) {

    return (dispatch) => {
        dispatch(loaders(true))
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
                    dispatch(toast('warning', 'User Creation failed!'));
                    dispatch(loaders(false))
                } else {
                    let url = config.apiUrl + "user/getAllUser";

                    fetch(url,
                        { headers: { 'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk=' }, method: 'GET' })
                        .then((response) => response.json())
                        .then((responseJSON) => {
                            dispatch(userlist(responseJSON.result))
                            dispatch(toast('success', 'User Added Successfully!'));
                            dispatch(loaders(false));
                            dispatch(menuKeys('user_list'));
                            location.push("../dashboard/userlist")
                        })
                        .catch((error) => {
                            dispatch(userlist([]))
                            dispatch(toast('warning', 'User Creation failed!'));
                            dispatch(loaders(false))
                        });

                }
            })
            .catch((error) => {
                dispatch(toast('warning', 'User Creation failed!'));
                dispatch(loaders(false))
            });
    }
}

//FUNCTION FOR API CALL FOR GETTING USER LIST AND DISPATCHING ACTION
export function userList() {
    return (dispatch) => {
        dispatch(loaders(true))
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
                dispatch(loaders(false))


            })
            .catch((error) => {

                dispatch(userlist([]))
                dispatch(loaders(false))
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
export function editUser(data, id, location) {
    console.log('edit', data)
    console.log(id)

    return (dispatch) => {
        dispatch(loaders(true))
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
                    dispatch(toast('warning', 'User Updation failed!'));
                    dispatch(loaders(false))
                } else {
                    let url = config.apiUrl + "user/getAllUser";

                    fetch(url,
                        { headers: { 'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk=' }, method: 'GET' })
                        .then((response) => response.json())
                        .then((responseJSON) => {
                            dispatch(userlist(responseJSON.result))
                            dispatch(toast('success', 'User Updated Successfully!'));
                            dispatch(loaders(false));
                            dispatch(menuKeys('user_list'));
                            location.push("../dashboard/userlist")
                        })
                        .catch((error) => {
                            dispatch(userlist([]))
                            dispatch(toast('warning', 'User Updation failed!'));
                            dispatch(loaders(false))
                        });

                }
            })
            .catch((error) => {
                dispatch(toast('warning', 'User Updation failed!'));
                dispatch(loaders(false))
            });
    }
}
//API FOR DELETE USER WITH GETTING USER LIST AND DISPATCHING ACTION
export function deleteUser(id, location) {
    console.log(id)
    return (dispatch) => {
        dispatch(loaders(true))
        fetch(config.apiUrl + 'user/delete?id=' + id, {
            headers: {
                'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
            },
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON.error) {
                    dispatch(toast('warning', 'User Deletion failed!'));
                    dispatch(loaders(false))
                } else {
                    let url = config.apiUrl + "user/getAllUser"

                    fetch(url,
                        { headers: { 'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk=' }, method: 'GET' })
                        .then((response) => response.json())
                        .then((responseJSON) => {
                            dispatch(userlist(responseJSON.result))
                            dispatch(toast('success', 'User Deleted Successfully!'));
                            dispatch(loaders(false));
                            dispatch(menuKeys('user_list'));
                            location.push("../dashboard/userlist")
                        })
                        .catch((error) => {
                            dispatch(userlist([]))
                            dispatch(toast('warning', 'User Deletion failed!'));
                            dispatch(loaders(false))
                        });

                }
            })
            .catch((error) => {
                dispatch(toast('warning', 'User Deletion failed!'));
                dispatch(loaders(false))
            });
    }
    //.............................. END OF CRUD FOR USER MANGEMENT.....................................
}


//.....................CRUD FOR Bill.....................................
/*BILL CREATION BY API CALL AND GET NEW BILL LIST IMMEDIATELY*/
export function billCreate(billdata, location) {
    return (dispatch) => {
        dispatch(loaders(true))
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
                    dispatch(toast('warning', 'Bill Creation failed!'));
                    dispatch(loaders(false))
                }
                else {
                    let url = config.apiUrl + "bill?userId=" + billdata.userId;

                    fetch(url,
                        { headers: { 'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk=' }, method: 'GET' })
                        .then((response) => response.json())
                        .then((responseJSON) => {
                            dispatch(toast('success', 'Bill Created Successfully!'));
                            dispatch(BillList(responseJSON.result))
                            dispatch(loaders(false));
                            dispatch(menuKeys('bill_list'));
                            location.push("../dashboard/billlist")
                        })
                        .catch((error) => {
                            dispatch(BillList([]))
                            dispatch(toast('warning', 'Bill Creation failed!'));
                            dispatch(loaders(false))
                        });

                }
            })
            .catch((error) => {
                dispatch(toast('warning', 'Bill Creation Failed!'));
                dispatch(loaders(false))
            });

    }
}



/* GET  BILL LIST BY API CALLING AND DISPATCHING ACTION*/
export function billlist(userId) {
    return (dispatch) => {
        dispatch(loaders(true))
        fetch(config.apiUrl + 'bill?userId=' + userId,
            {
                headers: {
                    'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
                },
                method: 'GET'
            })
            .then((response) => response.json())
            .then((responseJSON) => {
                console.log(responseJSON);
                dispatch(BillList(responseJSON.result));
                dispatch(loaders(false))
            })
            .catch((error) => {
                dispatch(BillList([]));
                dispatch(loaders(false))
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
        dispatch(loaders(true))
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
                    dispatch(toast('warning', 'Bill Updation failed!'));
                    dispatch(loaders(false))
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
                            dispatch(loaders(false));
                            dispatch(menuKeys('bill_list'));
                            location.push("../dashboard/billlist")
                        })
                        .catch((error) => {
                            dispatch(BillList([]))
                            dispatch(toast('warning', 'Bill Updation Failed!'));
                            dispatch(loaders(false))
                        });

                }
            })

            .catch((error) => {
                dispatch(toast('warning', 'Bill Updation Failed!'));
                dispatch(loaders(false))
            });
    }
}
//.....................CRUD FOR Bill END.....................................

//.............................. END OF CRUD FOR BILL.....................................

//User ROLE API
export function findByRole(role) {
    return (dispatch) => {
        console.log(config.apiUrl)
        dispatch(loaders(true))

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
                dispatch(loaders(false))
            })
            .catch((error) => {
                dispatch(developerlist([]))
                dispatch(loaders(false))
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
        dispatch(loaders(true))
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
                    dispatch(loaders(false))
                }
            })
            .catch((error) => {
                dispatch(RoleWithTags([]))
                dispatch(loaders(false))
            });
    }
}

function RoleWithTags(list) {
    return {
        type: "VERTICAL_LEAD",
        list

    }
}


/*********    GET DASHBOARD DATA FOR PROJECT  *******/
export function dashboardProject(userId) {

    return (dispatch) => {
        dispatch(loaders(true))
        fetch(config.apiUrl + 'user/dashboardDetails?id=' + userId,
            {
                headers: {
                    'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
                },
                method: 'GET'
            })
            .then((response) => response.json())
            .then((responseJSON) => {
                dispatch(dashboardproject(responseJSON.result));
                dispatch(loaders(false));
            })
            .catch((error) => {
                dispatch(dashboardproject({}))
                dispatch(loaders(false))
            });

    }
}

/******       GET DASHBOARD   DATA FOR CUSTOMER   ********/
export function dashboardCustomer(userId) {
    return (dispatch) => {
        dispatch(loaders(true));
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
                    dispatch(loaders(false))
                }

            })
            .catch((error) => {
                dispatch(dashboardcustomer({}))
                dispatch(loaders(false))
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
// FULL PAGE LOADER ACTION DISPACTHED
function loaders(data) {
    return {
        type: "FULL_PAGE_LOADER",
        data
    }
}


// API CALL FOR FETCHING LOGGED USER DETAILS AND DISPATCHING ACTION
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


/**CHANGE COLOR OF SELECTED KEY OF MENU ITEM */
export function menuKeys(data) {
    return (dispatch) => {
        dispatch(menuItem(data))
    }
}
/* DISPATCHING ACTION FOR MENU ITEM SELECTED KEY*/
function menuItem(data) {
    return {
        type: "MENU_SELECTED_KEY",
        data
    }
}

/**OPEN SELECTED KEY OF SELECTED KEY OF MENU ITEM */
export function openkey(data) {
    return (dispatch) => {
        dispatch({
            type: "OPEN_SELECTED_MENU_KEY",
            data
        })
    }
}


