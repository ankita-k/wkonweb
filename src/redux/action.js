import { config } from '../../src/config';
import { push } from 'react-router-redux';
import { developerList } from './reducers/developerList';

let conf = config.headers;


/**API CALL FOR LOGIN  AND STORING USERID IN SESSION STORAGE IF REMEMBER ME IS FALSE OTHERWISE STORE IN LOCALSTORAG IF TRUE */
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
                            localStorage.setItem('id', responseJSON.result._id);
                            location.push('/dashboard');
                        }
                        else {
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
/**********************LOGIN API CALL ENDS **************************/

/**************PASSWORD CHANGE API CALL*************************** */
export function password(data, location) {
    return (dispatch) => {
        dispatch(loaders(true));
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
                if (!responseJSON.error) {
                    dispatch(loaders(false));
                    dispatch(toast('success', 'Password Changed Successfully!'));
                    location.push('/dashboard');
                }
                else {
                    dispatch(loaders(false));
                    dispatch(toast('error', 'Wrong Password !'));
                }
            })
            .catch((error) => {
                dispatch(loaders(false));
                dispatch(toast('error', 'Wrong Password !'));
            });
    }
}
/**************PASSWORD CHANGE API CALL ENDS************** */


/**************GET COUNTRY LIST************** */
export function countrylist() {
    return (dispatch) => {
        dispatch(loaders(true))
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

function countryList(list) {   // ACTION DISPATCHED
    return {
        type: "COUNTRY_LIST",
        list

    }
}

/**************GET COUNTRY LIST ENDS************** ******************************/

/******************************* OPEN TOAST MESSAGES************** **************/

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
/************* OPEN TOAST MESSAGES ENDS************** ***********/

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
                    dispatch(loaders(false));
                    dispatch(menuKeys('client_list'));
                    dispatch(toast('success', 'Client Created Sucessfully!'));
                    location.push("../dashboard/clientlist");
                }
            })
            .catch((error) => {
                dispatch(toast('Warning', 'Client Creation failed!'));
                dispatch(loaders(false))
            });
    }
}

//FUNCTION FOR API CALL FOR GETTING CLIENT LIST AND DISPATCHING ACTION
export function clientlist(userId) {
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
                    dispatch(loaders(false));
                    dispatch(menuKeys('project_list'));
                    dispatch(toast('success', 'Project Created Sucessfully!'));
                    location.push("../dashboard/projectlist");
                }
            })
            .catch((error) => {
                dispatch(toast('Warning', 'Project Creation failed!'));
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
                    let url = config.apiUrl + 'project/projectlist?userId=' + userId;

                    fetch(url,
                        { headers: { 'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk=' }, method: 'GET' })
                        .then((response) => response.json())
                        .then((responseJSON) => {
                            dispatch(Projectlist(responseJSON.result))
                            dispatch(toast('success', 'Project Updated Successfully!'));
                            dispatch(loaders(false));
                            dispatch(menuKeys('project_list'));
                            location.push("../dashboard/projectlist")
                        })
                        .catch((error) => {
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
                            dispatch(toast('success', 'Member Added Sucessfully!'));

                        })
                        .catch((error) => {
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
    console.log('member Removed', data, projectId)
    return (dispatch) => {
        fetch(config.apiUrl + 'project/deletemember?id=' + projectId,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
                },
                method: 'PUT',
                body: JSON.stringify({ userId: data })
            })
            .then((response) => response.json())
            .then((responseJSON) => {
                console.log(responseJSON.members)
                console.log('Member Deleted', responseJSON)
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
                    dispatch(toast('warning', responseJSON.message));
                    dispatch(loaders(false))
                } else {
                    dispatch(loaders(false));
                    dispatch(menuKeys('user_list'));
                    dispatch(toast('success', 'User Created Sucessfully!'));
                    location.push("../dashboard/userlist");
                }
            })
            .catch((error) => {
                dispatch(toast('Warning', 'User Creation failed!'));
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
                } else {
                    dispatch(loaders(false));
                    dispatch(menuKeys('bill_list'));
                    dispatch(toast('success', 'Bill Created Sucessfully!'));
                    location.push("../dashboard/billlist");
                }
            })
            .catch((error) => {
                dispatch(toast('Warning', 'Bill Creation failed!'));
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
    return {
        type: "BILL_LIST",
        list

    }
}
/*BILL UPDATION BY API CALL AND GET NEW BILL LIST IMMEDIATELY*/
export function BillEdit(data, id, location) {
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


/** API CALL FOR FETCHING LOGGED USER DETAILS AND DISPATCHING ACTION**/
export function userdetails(id) {
    return (dispatch) => {
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
/** API CALL FOR FETCHING LOGGED USER DETAILS AND DISPATCHING ACTION ENDS**/

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

/** APICALL FOR SENDING EMAIL TO USER */
export function emailService(data) {
    console.log(data)
    return (dispatch) => {
        fetch(config.apiUrl + 'email',
            {
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
                console.log(responseJSON)
                if (!responseJSON.error) {
                    dispatch(toast('success', 'Mail Sent Successfully'))
                }
                else {
                    dispatch(toast('error', 'Mail Sending Failed'))
                }
            })
            .catch((error) => {
                dispatch(toast('error', 'Mail Sending Failed'))
            });
    }
}
/** APICALL FOR SENDING EMAIL TO USER ENDS */

/* ***************PROJECT MODULES  CRUD ***************/

/* Add Module*/
export function addModule(data) {
    console.log(data)
    return (dispatch) => {
        fetch(config.apiUrl + 'module',
            {
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
                console.log(responseJSON)
                if (!responseJSON.error) {
                    dispatch(toast('success', 'Module Created Successfully'))
                }
                else {
                    dispatch(toast('error', 'Module Creation Failed'))
                }
            })
            .catch((error) => {
                dispatch(toast('error', ' Module Creation Failed'))
            });
    }
}

//API FOR EDIT MODULE 
export function editmodule(data,id) {
    return (dispatch) => {
        fetch(config.apiUrl + 'module/' + id,
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
                console.log(responseJSON)
                if (!responseJSON.error) {
                    dispatch(toast('success', 'Module Updated Successfully'))
                }
                else {
                    dispatch(toast('error', 'Module Updation Failed'))
                }
            })
            .catch((error) => {
                dispatch(toast('error', ' Module Updation Failed'))
            });
    }
}
/*DELETE MODULE*/
export function deleteModule(id) {
    return (dispatch) => {
        fetch(config.apiUrl + 'module/' + id,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
                },
                method: 'DELETE',
            })
            .then((response) => response.json())
            .then((responseJSON) => {
                console.log(responseJSON)
                if (!responseJSON.error) {
                    dispatch(toast('success', 'Module Deleted Successfully'))
                }
                else {
                    dispatch(toast('error', 'Module Deletion Failed'))
                }
            })
            .catch((error) => {
                dispatch(toast('error', ' Module Deletion Failed'))
            });
    }
}
// FOR DISPATCHING ACTION TO REDUCER
function modulelist(list) {
    return {
        type: "MODULE_LIST",
        list

    }
}
/***********GET PROJECT MODULES LIST*********/
export function getProjectModule(projectId) {
    console.log(projectId)
    return (dispatch) => {
    return new Promise((resolve, reject) => {
        fetch(config.apiUrl + 'module/getbyprojectid?id=' + projectId,
            {
                headers: {
                    'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
                },
                method: 'GET',
            })
            .then((response) => response.json())
            .then((responseJSON) => {
                resolve(responseJSON);
                console.log('get module list', responseJSON)
            })
            .catch((error) => {
                reject(error);
            });
    })
    }
}


/***********GET PARTICULAR MODULES DATA*********/
export function getModuleInfo(id) {
    console.log(id)
    return (dispatch) => {
        return new Promise((resolve, reject) => {
        fetch(config.apiUrl + 'module/' + id,
            {
                headers: {
                    'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
                },
                method: 'GET',
            })
            .then((response) => response.json())
            .then((responseJSON) => {
                console.log(responseJSON)
                resolve(responseJSON)
                //code to dispatch action for storing module list 
            })
            .catch((error) => {
                reject(error)
                // code to handle error
            });
    })
}
}
/* ***************PROJECT MODULES  CRUD  ENDS***************/




/* ***************PROJECT SUB MODULES  CRUD ***************/
/* Add Sub Module*/
export function addSubModule(data) {
    console.log(data)
    return (dispatch) => {
        fetch(config.apiUrl + 'submodule',
            {
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
                console.log(responseJSON)
                if (!responseJSON.error) {
                    dispatch(toast('success', 'SubModule Added Successfully'))
                }
                else {
                    dispatch(toast('error', 'SubModule Addition Failed'))
                }
            })
            .catch((error) => {
                dispatch(toast('error', ' SubModule Addition Failed'))
            });
    }
}

/*DELETE  SUB MODULE*/

export function deleteSubModule(id) {
    return (dispatch) => {
        fetch(config.apiUrl + 'submodule/' + id,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
                },
                method: 'DELETE',
            })
            .then((response) => response.json())
            .then((responseJSON) => {
                console.log(responseJSON)
                if (!responseJSON.error) {
                    dispatch(toast('success', 'SubModule Deleted Successfully'))
                }
                else {
                    dispatch(toast('error', 'SubModule Deletion Failed'))
                }
            })
            .catch((error) => {
                dispatch(toast('error', 'Sub Module Deletion Failed'))
            });
    }
}

/***********GET SUB MODULES OF MODULE OF PARTICULAR LIST*********/
export function getSubModuleList(id) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
        fetch(config.apiUrl + 'submodule/getbymoduleid?id=' + id,
            {
                headers: {
                    'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
                },
                method: 'GET',
            })
            .then((response) => response.json())
            .then((responseJSON) => {
                console.log(responseJSON);
                resolve(responseJSON);
                //code to dispatch action for storing module list 
            })
            .catch((error) => {
                // code to handle error
                reject(error);
            });
        });
    }
}
/***********GET SUB MODULESD ATA********/
export function getSubModuleInfo(id) {
    console.log(id)
    return (dispatch) => {
        return new Promise((resolve, reject) => {
        fetch(config.apiUrl + 'submodule/' + id,
            {
                headers: {
                    'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
                },
                method: 'GET',
            })
            .then((response) => response.json())
            .then((responseJSON) => {
                console.log(responseJSON)
                resolve(responseJSON);
                //code to dispatch action for storing module list 
            })
            .catch((error) => {
                reject(error);
                // code to handle error
            });
        })
    }
}

//API FOR EDIT SUBMODULE 
export function editSubModule(data,id) {
    return (dispatch) => {
        fetch(config.apiUrl + 'submodule/' + id,
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
                console.log(responseJSON)
                if (!responseJSON.error) {
                    dispatch(toast('success', 'Submodule Updated Successfully'))
                }
                else {
                    dispatch(toast('error', 'Submodule Updation Failed'))
                }
            })
            .catch((error) => {
                dispatch(toast('error', ' Submdule Updation Failed'))
            });
    }
}

/* ***************PROJECT SUB MODULES  CRUD  ENDS***************/



/* ***************PROJECT TASK  CRUD ***************/
/* ADD TASK*/
export function addTask(data) {
    console.log(data)
    return (dispatch) => {
        fetch(config.apiUrl + 'task',
            {
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
                console.log(responseJSON)
                if (!responseJSON.error) {
                    dispatch(toast('success', 'Task Added Successfully'))
                }
                else {
                    dispatch(toast('error', 'Task Addition Failed'))
                }
            })
            .catch((error) => {
                dispatch(toast('error', ' Task Addition Failed'))
            });
    }
}

/*DELETE  TASK MODULE*/

export function deleteTask(id) {
    return (dispatch) => {
        fetch(config.apiUrl + 'task/' + id,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
                },
                method: 'DELETE',
            })
            .then((response) => response.json())
            .then((responseJSON) => {
                console.log(responseJSON)
                if (!responseJSON.error) {
                    dispatch(toast('success', 'Task Deleted Successfully'))
                }
                else {
                    dispatch(toast('error', 'Task Deletion Failed'))
                }
            })
            .catch((error) => {
                dispatch(toast('error', 'Task Deletion Failed'))
            });
    }
}
/*ASSIGN TASK TO DEVELOPERS FOR SUBMODULE OF MODULE*/
export function assignDevelopers(data) {
    console.log(data)
    return (dispatch) => {
        fetch(config.apiUrl + 'email',
            {
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
                console.log(responseJSON)
                if (!responseJSON.error) {
                    dispatch(toast('success', 'Task Assigned Successfully'))
                }
                else {
                    dispatch(toast('error', 'Task Assignment Failed'))
                }
            })
            .catch((error) => {
                dispatch(toast('error', ' Task Assignment Failed'))
            });
    }
}
/*FETCHING STARTED DATE OF TASK*/
export function taskStarted(data, id) {
    console.log(data)
    return (dispatch) => {
        fetch(config.apiUrl + 'task/' + id,
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
                console.log(responseJSON)
                if (!responseJSON.error) {
                    dispatch(toast('success', 'Task  Started'))
                }
                else {
                    dispatch(toast('error', 'Task not started '))
                }
            })
            .catch((error) => {
                dispatch(toast('error', ' Task not started'))
            });
    }
}


/*FETCHING END DATE OF TASK*/
export function taskEnded(data, id) {
    console.log(data)
    return (dispatch) => {
        fetch(config.apiUrl + 'task/' + id,
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
                console.log(responseJSON)
                if (!responseJSON.error) {
                    dispatch(toast('success', 'Task Ended'))
                }
                else {
                    dispatch(toast('error', 'Task not Ended '))
                }
            })
            .catch((error) => {
                dispatch(toast('error', ' Task not Ended'))
            });
    }
}

/***********GET TASK DATA*********/
export function getTaskInfo(id) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
        fetch(config.apiUrl + 'task/' + id,
            {
                headers: {
                    'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
                },
                method: 'GET',
            })
            .then((response) => response.json())
            .then((responseJSON) => {
                console.log(responseJSON)
                resolve(responseJSON)
                //code to dispatch action for storing module list 
            })
            .catch((error) => {
                reject(error)
                // code to handle error
            });
        });
    }
}


/***********GET TASK LIST OF SUBMODULE  *********/
export function getTaskList(id) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
        fetch(config.apiUrl + 'task/getbysubmoduleid?id=' + id,
            {
                headers: {
                    'X-API-Key': 'GF8SEmj3T/3YrtHqnjPEjZS11fyk2fLrp10T8bdmpbk='
                },
                method: 'GET',
            })
            .then((response) => response.json())
            .then((responseJSON) => {
                console.log(responseJSON);
                resolve(responseJSON);
                //code to dispatch action for storing module list 
            })
            .catch((error) => {
                // code to handle error
                reject(error);
            });
        });
    }
}
/* ***************PROJECT SUB TASK CRUD  ENDS***************/

