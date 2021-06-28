export async function handleApi(res) {
    let error = false;
    let msg = "";

    // //no response from server
    if (!res) {
        error = true;
        msg = "Something went wrong with request."
    }
    else if (!res.data) {
        error = true;
        msg = "No response from server";
    }

    let data = res.data.data || {};
    msg = res.data.msg || "";
    error = res.data.error || false;

    //override set values depending on http codes
    if (res.status === 204) {
        error = true;
        msg = "No Content Request";
    }
    //forbidden 
    else if (res.status === 401) {
        error = true;
        msg = "Unauthorized Access";
    }
    //forbidden 
    else if(res.status === 403) {
        error = true;
        msg = "Forbidden Access";
    }
    else if (res.status === 500) {
        error = true;
        msg = "An internal error has occured. Please try again later.";
    }
    else if (res.status === 400) {
        error = true;
        msg = "Bad request.";
    }

    let result = {
        error: error,
        data: data,
        msg: msg
    }
    return result;
}